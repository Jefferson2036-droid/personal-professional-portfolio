import React from "react";
import { getSource, type Source } from "@/lib/sources";

interface SourceLineProps {
  ids: string[];
}

function renderEntry(src: Source, key: string): React.ReactNode {
  switch (src.kind) {
    case "internal-doctrine":
      return (
        <span key={key} className="source-line__entry source-line__entry--internal">
          <span className="source-line__prefix">Internal doctrine:</span> {src.label}
        </span>
      );
    case "internal-author":
      return (
        <span key={key} className="source-line__entry source-line__entry--internal">
          <span className="source-line__prefix">Author source:</span> {src.label}
        </span>
      );
    case "benchmark-local":
      return (
        <a
          key={key}
          href={src.url}
          className="source-line__entry source-line__entry--internal-link"
        >
          {src.label}
        </a>
      );
    default: {
      const isTbd = src.url === "TBD";
      const common = {
        className: `source-line__entry source-line__entry--external${
          isTbd ? " source-line__entry--tbd" : ""
        }`,
        title: src.publishedAt ? `Published ${src.publishedAt}` : undefined,
      };
      if (isTbd) {
        return (
          <span key={key} {...common}>
            {src.label}
          </span>
        );
      }
      return (
        <a
          key={key}
          href={src.url}
          target="_blank"
          rel="noopener noreferrer"
          {...common}
        >
          {src.label}
        </a>
      );
    }
  }
}

export function SourceLine({ ids }: SourceLineProps) {
  const resolved = ids
    .map((id) => id.trim())
    .filter(Boolean)
    .map((id) => ({ id, src: getSource(id) }));

  const missing = resolved.filter((r) => !r.src).map((r) => r.id);
  if (missing.length > 0 && process.env.NODE_ENV !== "production") {
    console.warn(`[SourceLine] Unknown source IDs: ${missing.join(", ")}`);
  }

  const entries = resolved.filter((r) => r.src);
  if (entries.length === 0) return null;

  return (
    <aside className="source-line" aria-label="Sources">
      <span className="source-line__label">Sources:</span>{" "}
      {entries.map((r, i) => (
        <React.Fragment key={r.id}>
          {renderEntry(r.src!, r.id)}
          {i < entries.length - 1 ? <span className="source-line__sep">; </span> : null}
        </React.Fragment>
      ))}
    </aside>
  );
}
