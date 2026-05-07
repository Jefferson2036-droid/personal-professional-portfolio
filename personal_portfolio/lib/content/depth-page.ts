export interface DepthPageSection {
  id: string;
  title: string;
  content: string;
}

export interface DepthPageStructure {
  intro: string;
  sections: DepthPageSection[];
}

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

export function splitDepthPageContent(content: string): DepthPageStructure {
  const source = content.trim();
  if (!source) {
    return { intro: "", sections: [] };
  }

  const lines = source.split("\n");
  const introLines: string[] = [];
  const sections: DepthPageSection[] = [];

  let currentTitle: string | null = null;
  let currentLines: string[] = [];

  const flushSection = () => {
    if (!currentTitle) {
      return;
    }

    sections.push({
      id: slugifyHeading(currentTitle),
      title: currentTitle,
      content: currentLines.join("\n").trim(),
    });
  };

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.+)$/);

    if (headingMatch) {
      flushSection();
      currentTitle = headingMatch[1].trim();
      currentLines = [];
      continue;
    }

    if (currentTitle) {
      currentLines.push(line);
    } else {
      introLines.push(line);
    }
  }

  flushSection();

  return {
    intro: introLines.join("\n").trim(),
    sections: sections.filter((section) => section.content.length > 0),
  };
}

export function extractKeyPoints(sections: DepthPageSection[], maxItems = 3): string[] {
  const bulletPattern = /^-\s+(.+)$/gm;
  const keyPoints: string[] = [];

  for (const section of sections) {
    let match: RegExpExecArray | null;
    while ((match = bulletPattern.exec(section.content)) !== null) {
      keyPoints.push(match[1].trim());
      if (keyPoints.length >= maxItems) {
        return keyPoints;
      }
    }
  }

  return keyPoints;
}