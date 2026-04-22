'use client';

import React from 'react';
import { SourceLine } from '../ui/SourceLine';

/**
 * Error-collapse dumbbell.
 *
 * The slide argues two things at once:
 *   1. Three benchmarks of very different kinds of work all ended up inside
 *      the same <10% saturation band.
 *   2. Two of them had to fall a very long way to get there; a third was
 *      already close — the leading indicator.
 *
 * A line chart forces those into one crowded y-axis; endpoint labels collide
 * where the whole point of the slide is "they end up in the same place." A
 * dumbbell gives each benchmark its own row, makes the distance-fallen the
 * horizontal length of the bar, and renders convergence as three dark dots
 * stacked against the saturation floor on the left.
 *
 * Axis: % REMAINING ERROR (100 − score), 0% at the left, 70% at the right.
 * Row: start-dot (light, starting year) → connector → end-dot (dark, end year).
 * Shaded band 0–10% = "saturation floor".
 */

type Endpoint = { year: number; score: number };

interface Row {
  key: string;
  label: string;
  note: string;
  color: string;
  start: Endpoint;
  end: Endpoint;
}

// Starting score = first publicly reported frontier score in our window.
// Ending score = most recent reported score. Full table: /model-progress-research.
const rows: Row[] = [
  {
    key: 'swe-verified',
    label: 'SWE-bench Verified',
    note: 'software engineering — agents resolving real GitHub issues',
    color: '#8a3a1f',
    start: { year: 2024, score: 33.2 },
    end:   { year: 2026, score: 93.9 },
  },
  {
    key: 'gpqa',
    label: 'GPQA Diamond',
    note: 'hard-science reasoning — graduate-level physics, chem, bio',
    color: '#6f4a8f',
    start: { year: 2023, score: 39.0 },
    end:   { year: 2026, score: 94.5 },
  },
  {
    key: 'mmlu',
    label: 'MMLU',
    note: 'broad knowledge QA — the leading indicator, near saturation in 2023',
    color: '#2d5f4a',
    start: { year: 2023, score: 86.4 },
    end:   { year: 2025, score: 93.4 },
  },
];

// Geometry
const width = 940;
const rowHeight = 120;
const topPad = 84;
const bottomPad = 48;
const height = topPad + rows.length * rowHeight + bottomPad;

const axisLeft = 240;   // leaves room for labels in the left gutter
const axisRight = 60;
const scaleMin = 0;
const scaleMax = 70;

function xFor(error: number) {
  return axisLeft + ((error - scaleMin) / (scaleMax - scaleMin)) * (width - axisLeft - axisRight);
}

const xTicks = [0, 10, 25, 50, 70];
const saturationEdge = xFor(10);

export function ModelProgressResearch() {
  return (
    <div
      className="gpu-accelerated"
      style={{ width: '100%', margin: '1.25rem 0 0', display: 'grid', justifyItems: 'center' }}
    >
      <div
        className="model-progress-panel"
        style={{
          width: 'min(100%, 80rem)',
          display: 'grid',
          gap: '0.9rem',
          padding: '1.5rem 1.75rem 1.25rem',
        }}
      >
        <svg
          width="100%"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Three benchmarks of different kinds of work collapsed from 14, 61, and 67 percent remaining error to between 5.5 and 6.6 percent — all landing inside the under-10-percent saturation band."
          style={{ overflow: 'visible' }}
        >
          {/* Saturation band — 0 to 10% remaining error */}
          <rect
            x={xFor(0)}
            y={topPad - 20}
            width={saturationEdge - xFor(0)}
            height={rows.length * rowHeight + 20}
            fill="rgba(45, 95, 74, 0.10)"
          />
          <text
            x={xFor(0) + 8}
            y={topPad - 28}
            fontSize="13"
            fill="rgba(45, 95, 74, 0.85)"
            fontWeight="700"
            letterSpacing="0.08em"
          >
            SATURATION FLOOR · &lt; 10% ERROR
          </text>

          {/* Top axis labels */}
          {xTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={xFor(tick)}
                y1={topPad - 14}
                x2={xFor(tick)}
                y2={topPad + rows.length * rowHeight}
                stroke="rgba(31, 26, 22, 0.08)"
                strokeWidth="1"
              />
              <text
                x={xFor(tick)}
                y={topPad - 40}
                textAnchor="middle"
                fill="rgba(31, 26, 22, 0.7)"
                fontSize="14"
              >
                {tick}%
              </text>
            </g>
          ))}
          <text
            x={width / 2}
            y={topPad - 58}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            letterSpacing="0.14em"
            fill="rgba(31, 26, 22, 0.65)"
          >
            % REMAINING ERROR  (100 − score)
          </text>

          {/* One dumbbell per benchmark */}
          {rows.map((r, i) => {
            const y = topPad + i * rowHeight + rowHeight / 2;
            const startErr = 100 - r.start.score;
            const endErr = 100 - r.end.score;
            const xStart = xFor(startErr);
            const xEnd = xFor(endErr);
            const years = r.end.year - r.start.year;
            const deltaPts = (r.start.score - r.end.score) * -1; // negative = error fell
            const relativeCut = ((startErr - endErr) / startErr) * 100;

            return (
              <g key={r.key}>
                {/* Row background rule */}
                <line
                  x1={xFor(0)}
                  y1={y}
                  x2={xFor(scaleMax)}
                  y2={y}
                  stroke="rgba(31, 26, 22, 0.08)"
                  strokeWidth="1"
                />

                {/* Left-gutter label */}
                <text
                  x={axisLeft - 18}
                  y={y - 4}
                  textAnchor="end"
                  fontSize="19"
                  fontWeight="700"
                  fill="rgba(31, 26, 22, 0.9)"
                >
                  {r.label}
                </text>
                <text
                  x={axisLeft - 18}
                  y={y + 18}
                  textAnchor="end"
                  fontSize="12"
                  fontStyle="italic"
                  fill="rgba(31, 26, 22, 0.6)"
                >
                  {r.note}
                </text>

                {/* Connector (end → start, arrowhead toward start) */}
                <line
                  x1={xEnd}
                  y1={y}
                  x2={xStart}
                  y2={y}
                  stroke={r.color}
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity="0.35"
                />

                {/* End dot — DARK, the current state, drawn LAST/ON TOP */}
                <circle cx={xEnd} cy={y} r={11} fill={r.color} />
                <text
                  x={xEnd}
                  y={y - 20}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={r.color}
                >
                  {r.end.year} · {endErr.toFixed(1)}%
                </text>

                {/* Start dot — LIGHT (ring), where it began */}
                <circle
                  cx={xStart}
                  cy={y}
                  r={10}
                  fill="rgba(255, 253, 249, 1)"
                  stroke={r.color}
                  strokeWidth="3"
                />
                <text
                  x={xStart}
                  y={y - 20}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill={r.color}
                  opacity="0.75"
                >
                  {r.start.year} · {startErr.toFixed(0)}%
                </text>

                {/* Right-side summary */}
                <text
                  x={xFor(scaleMax) + 10}
                  y={y + 5}
                  fontSize="13"
                  fontWeight="700"
                  fill="rgba(31, 26, 22, 0.78)"
                >
                  −{relativeCut.toFixed(0)}% in {years}y
                </text>
              </g>
            );
          })}

          {/* Bottom axis ticks */}
          {xTicks.map((tick) => (
            <text
              key={`b-${tick}`}
              x={xFor(tick)}
              y={topPad + rows.length * rowHeight + 22}
              textAnchor="middle"
              fill="rgba(31, 26, 22, 0.7)"
              fontSize="14"
            >
              {tick}%
            </text>
          ))}

          {/* Legend strip */}
          <g transform={`translate(${axisLeft}, ${height - 18})`}>
            <circle cx={0} cy={0} r={7} fill="rgba(255, 253, 249, 1)" stroke="rgba(31,26,22,0.55)" strokeWidth="2" />
            <text x={14} y={4} fontSize="12" fill="rgba(31, 26, 22, 0.7)">
              starting year
            </text>
            <circle cx={150} cy={0} r={8} fill="rgba(31, 26, 22, 0.75)" />
            <text x={166} y={4} fontSize="12" fill="rgba(31, 26, 22, 0.7)">
              most recent score
            </text>
          </g>
        </svg>

        <SourceLine
          ids={[
            'benchmarksLocal',
            'mythosCard',
            'sweBenchSite',
            'sweBenchVerified',
            'gpqaPaper',
            'aiIndex2025',
          ]}
        />
      </div>
    </div>
  );
}
