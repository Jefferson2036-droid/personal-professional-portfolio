import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HomePage from "../../app/page";
import React from "react";

// Mock the ContentRepository
vi.mock("@/lib/content/repository", () => {
  return {
    ContentRepository: class {
      getPageBySlug = vi.fn().mockResolvedValue({
        slug: "home",
        frontmatter: {
          title: "Mocked Home Title",
          layout: "standard",
        },
        content: "# Mocked Content Header\nThis is a mocked paragraph.",
      });
    },
  };
});

// Mock the MDXRemote to avoid complex async RSC resolution in JSDOM
vi.mock("next-mdx-remote/rsc", () => ({
  MDXRemote: ({ source }: { source: string }) => <div data-testid="mdx-mock">{source}</div>,
}));

describe("HomePage", () => {
  it("renders the page fetched from the repository via the Factory", async () => {
    const Component = await HomePage();
    
    // We expect the catch block to not trigger and return the factory
    expect(Component).toBeDefined();

    const { getAllByText, getAllByTestId } = render(Component as React.ReactElement);

    // Title appears in both the header and the hero; assert at least one render.
    expect(getAllByText("Mocked Home Title").length).toBeGreaterThan(0);

    // Check that the markdown source was passed to the renderer
    const mdxMocks = getAllByTestId("mdx-mock");
    expect(mdxMocks.length).toBeGreaterThan(0);
    expect(mdxMocks[0].textContent).toContain("# Mocked Content Header");
  });
});
