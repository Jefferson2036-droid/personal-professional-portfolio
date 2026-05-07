import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

import React from "react";

import { BloomsTaxonomy } from "../visualization/BloomsTaxonomy";
import { FrontierAIIntensityIndex } from "../visualization/FrontierAIIntensityIndex";
import { ModelProgressResearch } from "../visualization/ModelProgressResearch";
import { StudioSpineMap } from "../visualization/StudioSpineMap";
import { RegionalLaborTable } from "../visualization/RegionalLaborTable";
import { StatGrid, parseStatGrid } from "../visualization/StatGrid";
import { CallToActionGroup } from "../ui/CallToActionGroup";
import { SourceLine } from "../ui/SourceLine";

// This map intercepts standard markdown HTML elements and routes them 
// to our DRY design system primitives.
const baseComponents = {
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => <Heading level={1} {...props} />,
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => <Heading level={2} {...props} />,
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => <Heading level={3} {...props} />,
  h4: (props: React.ComponentPropsWithoutRef<"h4">) => <Heading level={4} {...props} />,
  h5: (props: React.ComponentPropsWithoutRef<"h5">) => <Heading level={5} {...props} />,
  h6: (props: React.ComponentPropsWithoutRef<"h6">) => <Heading level={6} {...props} />,
  p: (props: React.ComponentPropsWithoutRef<"p">) => <Text {...props} />,
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => <ul className="markdown-ul" {...props} />,
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => <ol className="markdown-ol" {...props} />,
  li: (props: React.ComponentPropsWithoutRef<"li">) => <li className="markdown-li" {...props} />,
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => <blockquote className="markdown-blockquote" {...props} />,
  a: ({ href, ...rest }: React.ComponentPropsWithoutRef<"a">) => {
    const hrefStr = typeof href === "string" ? href : "";
    // Internal root-relative links must flow through next/link so the
    // configured basePath is prepended on deploys (e.g. /bseai_degree/*).
    const isInternal = hrefStr.startsWith("/") && !hrefStr.startsWith("//");
    if (isInternal) {
      return <Link href={hrefStr} className="markdown-a" {...rest} />;
    }
    return <a className="markdown-a" href={hrefStr} {...rest} />;
  },
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => <strong className="markdown-strong" {...props} />,
  img: (props: React.ComponentPropsWithoutRef<"img">) => {
    const src = typeof props.src === "string" ? props.src : "";
    let kind: "qr" | "logo" | "default" = "default";
    if (src.includes("/images/qr/")) kind = "qr";
    else if (/logo|_icon\./i.test(src)) kind = "logo";
    return <img className={`markdown-image markdown-image--${kind}`} {...props} />;
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement> & { children?: React.ReactNode }) => {
    // Intercept standard code blocks and check if they are visualization directives
    const child = props.children;
    if (React.isValidElement(child) && child.type === 'code') {
      const childElement = child as React.ReactElement<{ className?: string, children?: React.ReactNode }>;
      const className = childElement.props.className || '';
      
      if (className.includes('language-blooms')) {
        return <BloomsTaxonomy />;
      }
      if (className.includes('language-exponential') || className.includes('language-faii')) {
        return <FrontierAIIntensityIndex />;
      }
      if (className.includes('language-model-progress')) {
        return <ModelProgressResearch />;
      }
      if (className.includes('language-studio-spine')) {
        return <StudioSpineMap />;
      }
      if (className.includes('language-regional-labor')) {
        return <RegionalLaborTable />;
      }
      if (className.includes('language-stat-grid')) {
        const raw = React.Children.toArray(childElement.props.children)
          .map((c) => (typeof c === 'string' ? c : ''))
          .join('');
        return <StatGrid rows={parseStatGrid(raw)} />;
      }
      if (className.includes('language-cta')) {
        return <CallToActionGroup>{childElement.props.children}</CallToActionGroup>;
      }
      if (className.includes('language-source-line')) {
        const raw = React.Children.toArray(childElement.props.children)
          .map((c) => (typeof c === 'string' ? c : ''))
          .join('');
        const ids = raw
          .split(/[\s,]+/)
          .map((s) => s.trim())
          .filter(Boolean);
        return <SourceLine ids={ids} />;
      }
    }
    // Fallback to standard pre block (you would typically map this to a custom CodeBlock component)
    return <pre {...props} />;
  }
};

interface MarkdownRendererProps {
  source: string;
  layout?: "standard" | "presentation";
}

/**
 * Server Component that securely parses a raw markdown string and transforms
 * the AST into our custom React Design System components.
 */
export function MarkdownRenderer({ source, layout = "standard" }: MarkdownRendererProps) {
  if (!source) return null;
  
  // If we are in a presentation layout, we intercept <p> tags
  // to avoid hydration errors if other elements need to be block-level.
  // Add table, thead, tbody, tr, th, td handlers with styling
  const tableComponents = {
    table: (props: React.ComponentPropsWithoutRef<"table">) => <table className="markdown-table" {...props} />,
    thead: (props: React.ComponentPropsWithoutRef<"thead">) => <thead className="markdown-thead" {...props} />,
    tbody: (props: React.ComponentPropsWithoutRef<"tbody">) => <tbody className="markdown-tbody" {...props} />,
    tr: (props: React.ComponentPropsWithoutRef<"tr">) => <tr className="markdown-tr" {...props} />,
    th: (props: React.ComponentPropsWithoutRef<"th">) => <th className="markdown-th" {...props} />,
    td: (props: React.ComponentPropsWithoutRef<"td">) => <td className="markdown-td" {...props} />,
  };

  const components = {
    ...baseComponents,
    ...tableComponents,
    p: (props: React.ComponentPropsWithoutRef<"p">) => {
      // MDX wraps standalone elements in <p> tags. 
      // To fix hydration mismatches, we map <p> to <div> in presentation mode.
      if (layout === "presentation") {
        return <div className={`text-body ${props.className || ""}`} {...props} />;
      }
      return <Text {...props} />;
    }
  };

  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  );
}
