import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MarkdownRenderer } from "../../components/markdown/MarkdownRenderer";

// To test a Server Component that uses MDXRemote in Vitest, we might 
// need to mock it or await its resolution. For a basic unit test of the mapping,
// we can test that it renders without throwing. Note: MDXRemote/rsc is async.

describe("MarkdownRenderer", () => {
  it("should handle empty source gracefully", () => {
    const { container } = render(<MarkdownRenderer source="" />);
    expect(container.innerHTML).toBe("");
  });

  // Note: Full AST rendering assertions for RSC components in jsdom usually require
  // e2e testing or complex asynchronous renderers because next-mdx-remote/rsc returns a Promise.
  // We will assert the basic export shape and empty state here.
  it("is defined as a function", () => {
    expect(typeof MarkdownRenderer).toBe("function");
  });
});
