import React from "react";
import { PageData } from "../../lib/content/schema";
import { StandardLayout } from "./StandardLayout";
import { PresentationLayout } from "./PresentationLayout";

interface FactoryProps {
  page: PageData;
}

/**
 * Resolves the correct page layout based on the frontmatter configuration.
 * Adheres to the Open/Closed principle by isolating routing logic from layout updates.
 */
export function PageLayoutFactory({ page }: FactoryProps) {
  switch (page.frontmatter.layout) {
    case "presentation":
      return <PresentationLayout page={page} />;
    case "standard":
    default:
      return <StandardLayout page={page} />;
  }
}
