import React from 'react';

/**
 * 2×N stat grid for data-heavy slides. Each cell promotes the number to
 * display weight and demotes the citation to small-caps chrome. Fence
 * syntax, one stat per line, pipe-separated:
 *
 *   ```stat-grid
 *   1.3M+ | new AI jobs, 2023–2025 | LinkedIn Labor Market Report, Jan 2026
 *   70%   | YoY growth in AI-literacy jobs | LinkedIn, same report
 *   ```
 */

interface Stat {
  value: string;
  label: string;
  source?: string;
}

export function StatGrid({ rows }: { rows: Stat[] }) {
  return (
    <ul className="stat-grid" aria-label="Key statistics">
      {rows.map((r, i) => (
        <li key={i} className="stat-grid__item">
          <span className="stat-grid__value">{r.value}</span>
          <span className="stat-grid__label">{r.label}</span>
          {r.source && <span className="stat-grid__source">{r.source}</span>}
        </li>
      ))}
    </ul>
  );
}

/** Parse the raw fenced content into Stat[]. */
export function parseStatGrid(raw: string): Stat[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const parts = line.split('|').map((s) => s.trim());
      return {
        value: parts[0] ?? '',
        label: parts[1] ?? '',
        source: parts[2],
      };
    });
}
