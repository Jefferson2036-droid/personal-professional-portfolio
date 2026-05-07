import { describe, it, expect } from "vitest";
import { splitMarkdownIntoSlides } from "../../lib/content/parser";

describe("splitMarkdownIntoSlides", () => {
  it("should return an empty array for empty strings", () => {
    expect(splitMarkdownIntoSlides("")).toEqual([]);
    expect(splitMarkdownIntoSlides("   ")).toEqual([]);
  });

  it("should return a single chunk if there are no horizontal rules", () => {
    const markdown = "# Slide 1\nThis is just one long slide.";
    expect(splitMarkdownIntoSlides(markdown)).toEqual([
      {
        rawContent: markdown,
        cleanContent: markdown,
        backgroundSrc: null,
        backgroundFocal: null,
        splitSrc: null,
        splitReverseSrc: null,
      },
    ]);
  });

  it("should split markdown by standard horizontal rules", () => {
    const markdown = `
# Slide 1
Content 1
---
# Slide 2
Content 2
    `.trim();

    const result = splitMarkdownIntoSlides(markdown);
    expect(result).toHaveLength(2);
    expect(result[0].rawContent).toContain("Slide 1");
    expect(result[1].rawContent).toContain("Slide 2");
  });

  it("should handle varying whitespace around the horizontal rules", () => {
    const markdown = `
# Slide 1

---

# Slide 2
---
# Slide 3
    `.trim();

    const result = splitMarkdownIntoSlides(markdown);
    expect(result).toHaveLength(3);
    expect(result[0].rawContent).toContain("Slide 1");
    expect(result[1].rawContent).toContain("Slide 2");
    expect(result[2].rawContent).toContain("Slide 3");
  });
});
