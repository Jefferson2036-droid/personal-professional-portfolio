'use client';

import React from 'react';
import { SourceLine } from '../ui/SourceLine';

/**
 * Time-rise benchmark chart.
 *
 * Argument: three benchmarks of very different kinds of work all climb into
 * the same >=90% saturation band within a three-year window. Time is on x,
 * score on y.
 *
 * Design discipline:
 *  - External legend above the plot. Chart has no inline series text.
 *  - Only two numeric callouts per line: start score (bold, at the first
 *    dot) and end score (bold, at the last dot). No deltas, no descriptors,
 *    no series names inside the chart.
 *  - Y axis is broken at 30–100% so the plot spends its canvas on the
 *    region where the story lives. A small axis-break glyph signals the
 *    truncation.
 *  - Real milestone data, no imputation. Missing years produce gaps, not
 *    interpolation.
 */

type Point = { year: number; score: number };

interface Series {
  key: string;
  label: string;
  note: string;
  color: string;
  points: Point[];
}

// Milestone scores from docs/_specs/slides/slide-04-benchmark-record.md
const series: Series[] = [
  {
    key: 'swe-verified',
    label: 'SWE-bench Verified',
    note: 'software engineering — fixing real GitHub issues',
    color: '#8a3a1f',
    points: [
      { year: 2024, score: 33.2 },
      { year: 2025, score: 80.9 },
      { year: 2026, score: 93.9 },
    ],
  },
  {
    key: 'gpqa',
    label: 'GPQA Diamond',
    note: 'hard-science reasoning — PhD physics, chem, bio',
    color: '#6f4a8f',
    points: [
      { year: 2023, score: 39.0 },
      { year: 2024, score: 59.4 },
      { year: 2025, score: 86.95 },
      { year: 2026, score: 94.5 },
    ],
  },
  {
    key: 'mmlu',
    label: 'MMLU',
    note: 'broad knowledge QA — already a leading indicator',
    color: '#2d5f4a',
    points: [
      { year: 2023, score: 86.4 },
      { year: 2024, score: 90.4 },
      { year: 2025, score: 93.4 },
    ],
  },
];

// Geometry — shorter canvas, tighter right gutter (no terminal labels).
const width = 960;
const height = 380;
const padTop = 48;
const padBottom = 56;
const padLeft = 68;
const padRight = 40;

const xMin = 2023;
const xMax = 2026;
const yMin = 30;       // broken axis — plot region starts at 30
const yMax = 100;
const saturationY = 90;

function xFor(year: number) {
  return padLeft + ((year - xMin) / (xMax - xMin)) * (width - padLeft - padRight);
}
function yFor(score: number) {
  const clamped = Math.max(yMin, Math.min(yMax, score));
  return padTop + (1 - (clamped - yMin) / (yMax - yMin)) * (height - padTop - padBottom);
}

const yTicks = [30, 50, 70, 90, 100];
const xYears = [2023, 2024, 2025, 2026];

export function ModelProgressResearch() {
  return (
    <div
      className="gpu-accelerated"
      style={{ width: '100%', margin: '1rem 0 0', display: 'grid', justifyItems: 'center' }}
    >
      <div
        className="model-progress-panel"
        style={{
          width: 'min(100%, 78rem)',
          display: 'grid',
          gap: '1rem',
          padding: '1.25rem 1.5rem 1rem',
        }}
      >
        {/* External legend */}
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '0.75rem 1.25rem',
            fontSize: '0.95rem',
            lineHeight: 1.35,
          }}
          aria-label="Benchmark legend"
        >
          {series.map((s) => (
            <li
              key={s.key}
              style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}
            >
              <span
                aria-hidden="true"
                style={{
                  flex: '0 0 auto',
                  width: '0.9rem',
                  height: '0.9rem',
                  marginTop: '0.3rem',
                  borderRadius: '999px',
                  background: s.color,
                }}
              />
              <span>
                <strong style={{ color: s.color }}>{s.label}</strong>
                <br />
                <span style={{ color: 'rgba(31,26,22,0.62)', fontStyle: 'italic' }}>{s.note}</span>
              </span>
            </li>
          ))}
        </ul>

        <svg
          width="100%"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Three benchmarks rising into the 90% saturation band between 2023 and 2026. MMLU starts at 86.4 in 2023 and reaches 93.4 in 2025. GPQA Diamond climbs from 39.0 in 2023 to 94.5 in 2026. SWE-bench Verified climbs from 33.2 in 2024 to 93.9 in 2026."
          style={{ overflow: 'visible' }}
        >
          {/* Saturation ceiling band: score >= 90 */}
          <rect
            x={padLeft}
            y={yFor(100)}
            width={width - padLeft - padRight}
            height={yFor(saturationY) - yFor(100)}
            fill="rgba(45, 95, 74, 0.12)"
          />
          <line
            x1={padLeft}
            y1={yFor(saturationY)}
            x2={width - padRight}
            y2={yFor(saturationY)}
            stroke="rgba(45, 95, 74, 0.5)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text
            x={padLeft + 6}
            y={yFor(100) + 16}
            fontSize="12"
            fontWeight="700"
            letterSpacing="0.14em"
            fill="rgba(45, 95, 74, 0.9)"
          >
            ≥ 90% · SATURATION
          </text>

          {/* Y ticks + gridlines */}
          {yTicks.map((t) => (
            <g key={`y-${t}`}>
              <line
                x1={padLeft}
                y1={yFor(t)}
                x2={width - padRight}
                y2={yFor(t)}
                stroke="rgba(31, 26, 22, 0.06)"
                strokeWidth="1"
              />
              <text
                x={padLeft - 12}
                y={yFor(t) + 4}
                textAnchor="end"
                fontSize="13"
                fill="rgba(31, 26, 22, 0.62)"
              >
                {t}
              </text>
            </g>
          ))}

          {/* Broken-axis glyph at the bottom of the y-axis */}
          <g transform={`translate(${padLeft}, ${height - padBottom + 2})`}>
            <path
              d="M -6 0 L 0 -4 L 0 -8 L -6 -12"
              fill="none"
              stroke="rgba(31, 26, 22, 0.45)"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* X ticks */}
          {xYears.map((y) => (
            <g key={`x-${y}`}>
              <line
                x1={xFor(y)}
                y1={padTop}
                x2={xFor(y)}
                y2={height - padBottom}
                stroke="rgba(31, 26, 22, 0.05)"
                strokeWidth="1"
              />
              <text
                x={xFor(y)}
                y={height - padBottom + 22}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="rgba(31, 26, 22, 0.72)"
              >
                {y}
              </text>
            </g>
          ))}

          {/* Series lines + terminal/start value callouts only */}
          {series.map((s) => {
            const pts = s.points;
            const first = pts[0];
            const last = pts[pts.length - 1];
            const pathD = pts
              .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xFor(p.year)} ${yFor(p.score)}`)
              .join(' ');

            // Label placement: start score sits on the open side (below if
            // the start is already high like MMLU, above otherwise). End
            // score sits just above the last dot.
            const startAbove = first.score < 70;
            const startLabelY = yFor(first.score) + (startAbove ? -14 : 22);
            const startAnchor = first.year === xMin ? 'start' : 'middle';
            const startX = first.year === xMin ? xFor(first.year) + 12 : xFor(first.year);
            const endAnchor = last.year === xMax ? 'end' : 'middle';
            const endX = last.year === xMax ? xFor(last.year) - 10 : xFor(last.year);

            return (
              <g key={s.key}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={s.color}
                  strokeOpacity="0.18"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={pathD}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Intermediate dots — small, quiet */}
                {pts.slice(1, -1).map((p) => (
                  <circle
                    key={`${s.key}-mid-${p.year}`}
                    cx={xFor(p.year)}
                    cy={yFor(p.score)}
                    r={4}
                    fill="rgba(255,253,249,1)"
                    stroke={s.color}
                    strokeWidth="2"
                  />
                ))}

                {/* Start dot + label */}
                <circle
                  cx={xFor(first.year)}
                  cy={yFor(first.score)}
                  r={6}
                  fill="rgba(255,253,249,1)"
                  stroke={s.color}
                  strokeWidth="2.5"
                />
                <text
                  x={startX}
                  y={startLabelY}
                  textAnchor={startAnchor}
                  fontSize="13"
                  fontWeight="700"
                  fill={s.color}
                >
                  {first.score}
                </text>

                {/* End dot + label */}
                <circle cx={xFor(last.year)} cy={yFor(last.score)} r={8} fill={s.color} />
                <text
                  x={endX}
                  y={yFor(last.score) - 14}
                  textAnchor={endAnchor}
                  fontSize="14"
                  fontWeight="700"
                  fill={s.color}
                >
                  {last.score}
                </text>
              </g>
            );
          })}

          {/* X axis baseline */}
          <line
            x1={padLeft}
            y1={height - padBottom}
            x2={width - padRight}
            y2={height - padBottom}
            stroke="rgba(31, 26, 22, 0.35)"
            strokeWidth="1.25"
          />
          {/* Y axis baseline */}
          <line
            x1={padLeft}
            y1={padTop}
            x2={padLeft}
            y2={height - padBottom}
            stroke="rgba(31, 26, 22, 0.35)"
            strokeWidth="1.25"
          />

          {/* Y axis unit — tiny, top of y-axis */}
          <text
            x={padLeft - 12}
            y={padTop - 14}
            textAnchor="end"
            fontSize="11"
            fontWeight="600"
            letterSpacing="0.12em"
            fill="rgba(31, 26, 22, 0.5)"
          >
            SCORE %
          </text>
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
