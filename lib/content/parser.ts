export interface SlideNode {
  rawContent: string;
  cleanContent: string;
  backgroundSrc: string | null;
  /** Optional `object-position` for the background image, e.g. `50% 65%`. */
  backgroundFocal: string | null;
  splitSrc: string | null;
  splitReverseSrc: string | null;
}

/**
 * Splits a raw markdown string into individual slide chunks based on the horizontal rule separator (---).
 * It parses Marp-style image directives out of the content to return clean, ready-to-render AST nodes.
 *
 * @param content The raw markdown body string.
 * @returns An array of SlideNode objects containing the parsed directives and clean markdown string.
 */
export function splitMarkdownIntoSlides(content: string): SlideNode[] {
  if (!content || content.trim() === "") {
    return [];
  }

  // Split by horizontal rules that are on their own lines.
  const chunks = content.split(/\n\s*---\s*(?:\n|$)/);

  return chunks
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((slide) => {
      // Parse Marp-style image directives.
      // Accepts either `![bg](url)` or `![bg 50% 65%](url)` where the trailing
      // token is used as CSS `object-position` to frame the image.
      const bgMatch = slide.match(/!\[bg(?:\s+([^\]]+))?\]\((.*?)\)/);
      const backgroundSrc = bgMatch ? bgMatch[2] : null;
      const backgroundFocal = bgMatch && bgMatch[1] ? bgMatch[1].trim() : null;

      const splitMatch = slide.match(/!\[split\]\((.*?)\)/);
      const splitSrc = splitMatch ? splitMatch[1] : null;

      const splitReverseMatch = slide.match(/!\[split-reverse\]\((.*?)\)/);
      const splitReverseSrc = splitReverseMatch ? splitReverseMatch[1] : null;

      // Remove the directives from the text content so they don't render inline
      let cleanContent = slide;
      if (backgroundSrc) cleanContent = cleanContent.replace(/!\[bg(?:\s+[^\]]+)?\]\(.*?\)/, '');
      if (splitSrc) cleanContent = cleanContent.replace(/!\[split\]\(.*?\)/, '');
      if (splitReverseSrc) cleanContent = cleanContent.replace(/!\[split-reverse\]\(.*?\)/, '');

      return {
        rawContent: slide,
        cleanContent: cleanContent.trim(),
        backgroundSrc,
        backgroundFocal,
        splitSrc,
        splitReverseSrc
      };
    });
}
