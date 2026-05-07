import path from "node:path";
import { describe, it, expect, beforeEach } from "vitest";
import { ContentRepository, ContentNotFoundError, ContentValidationError } from "../../lib/content/repository";

describe("ContentRepository", () => {
  let repository: ContentRepository;

  beforeEach(() => {
    // Point the repository to the mock content directory
    const mockDir = path.join(process.cwd(), "tests", "__mocks__", "content");
    repository = new ContentRepository(mockDir);
  });

  it("should successfully load and parse a valid markdown file", async () => {
    const page = await repository.getPageBySlug("valid");
    
    expect(page.slug).toBe("valid");
    expect(page.frontmatter.title).toBe("Valid Presentation");
    expect(page.frontmatter.layout).toBe("presentation");
    expect(page.frontmatter.heroImage).toBe("/images/hero.jpg");
    expect(page.frontmatter.seo?.title).toBe("SEO Title");
    
    // Check that body content was parsed correctly
    expect(page.content).toContain("## Slide 1");
    expect(page.content).toContain("This is the second slide.");
  });

  it("should throw a ContentNotFoundError if the file does not exist", async () => {
    await expect(repository.getPageBySlug("does-not-exist")).rejects.toThrow(ContentNotFoundError);
  });

  it("should throw a ContentValidationError if the frontmatter schema is invalid", async () => {
    await expect(repository.getPageBySlug("invalid")).rejects.toThrow(ContentValidationError);
  });
});
