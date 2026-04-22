'use client';

import React from 'react';
import { SourceLine } from '../ui/SourceLine';

/**
 * Time-rise benchmark chart.
 *
 * The slide argues: three very different kinds of work all climbed into the
 * same saturation ceiling within a three-year window. That is a *time*
 * story, so time is the x-axis. Score is y. The saturation band at >=90%
 * is the ceiling they are rising into.
 *
 * Design choices:
 *  - Real milestone data, no imputation. If a benchmark has no report in a
 *    given year, the line skips it (SWE-bench Verified only reports from
 *    2024; MMLU is not reported in 2026 — it stopped being measured because
 *    it is considered saturated).
 *  - Each series is labeled at its terminal dot on the right, so the chart
 *    needs no separate legend.
 *  - Saturation band is a single horizontal strip across the top, not three
 *    per-row bands, so "they all land in the same ceiling" is visible.
 *  - Headline annotation on the steepest climbs (GPQA, SWE-bench Verified)
 *    is placed in empty space between the lines.
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
    note: 'broad knowledge QA — leading indicator',
    color: '#2d5f4a',
    points: [
      { year: 2023, score: 86.4 },
      { year: 2024, score: 90.4 },
      { year: 2025, score: 93.4 },
    ],
  },
];

// Geometry
const width = 960;
const height = 520;
const padTop = 72;
const padBottom = 72;
const padLeft = 72;
const padRight = 260; // room for terminal labels

const xMin = 2023;
const xMax = 2026;
const yMin = 0;
const yMax = 100;
const saturationY = 90;

function xFor(year: number) {
  return padLeft + ((year - xMin) / (xMax - xMin)) * (width - padLeft - padRight);
}
function yFor(score: number) {
  return padTop + (1 - (score - yMin) / (yMax - yMin)) * (height - padTop - padBottom);
}

const yTicks = [0, 25, 50, 75, 100];
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
          width: 'min(100%, 80rem)',
          display: 'grid',
          gap: '0.75rem',
          padding: '1.25rem 1.5rem 1rem',
        }}
      >
        <svg
          width="100%"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Three benchmarks rising into the 90% saturation ceiling between 2023 and 2026. MMLU starts at 86.4 in 2023 and crosses the ceiling in 2024. GPQA Diamond climbs from 39.0 in 2023 to 94.5 in 2026. SWE-bench Verified climbs from 33.2 in 2024 to 93.9 in 2026."
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
            stroke="rgba(45, 95, 74, 0.45)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text
            x={width - padRight - 8}
            y={yFor(100) + 18}
            textAnchor="end"
            fontSize="12"
            fontWeight="700"
            letterSpacing="0.12em"
            fill="rgba(45, 95, 74, 0.9)"
          >
            SATURATION CEILING
          </text>
          <text
            x={width - padRight - 8}
            y={yFor(100) + 34}
            textAnchor="end"
            fontSize="11"
            fontWeight="600"
            letterSpacing="0.04em"
            fill="rgba(45, 95, 74, 0.72)"
          >
            ≥ 90% SCORE
          </text>

          {/* Y axis title */}
          <text
            x={padLeft - 48}
            y={padTop - 28}
            fontSize="12"
            fontWeight="700"
            letterSpacing="0.14em"
            fill="rgba(31, 26, 22, 0.55)"
          >
            BENCHMARK SCORE
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
                fill="rgba(31, 26, 22, 0.7)"
              >
                {t}%
              </text>
            </g>
          ))}

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
                y={height - padBottom + 24}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="rgba(31, 26, 22, 0.72)"
              >
                {y}
              </text>
            </g>
          ))}

          {/* Series lines + points + terminal labels */}
          {series.map((s) => {
            const pts = s.points;
            const last = pts[pts.length - 1];
            const first = pts[0];
            const pathD = pts
              .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xFor(p.year)} ${yFor(p.score)}`)
              .join(' ');
            const deltaPts = last.score - first.score;
            const deltaYrs = last.year - first.year;

            return (
              <g key={s.key}>
                {/* Glow under the line for separation against gridlines */}
                <path d={pathD} fill="none" stroke={s.color} strokeOpacity="0.18" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <path d={pathD} fill="none" stroke={s.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Milestone dots with small score labels */}
                {pts.map((p, i) => {
                  const isTerminal = i === pts.length - 1;
                  const isStart = i === 0;
                  // Place per-point score label above the dot by default,
                  // below when the dot is already high in the chart (>= 85).
                  const above = p.score < 85;
                  const labelY = yFor(p.score) + (above ? -14 : 22);
                  return (
                    <g key={`${s.key}-${p.year}`}>
                      <circle
                        cx={xFor(p.year)}
                        cy={yFor(p.score)}
                        r={isTerminal ? 8 : 5.5}
                        fill={isTerminal ? s.color : 'rgba(255,253,249,1)'}
                        stroke={s.color}
                        strokeWidth={isTerminal ? 0 : 2.5}
                      />
                      {(isStart || isTerminal) && (
                        <text
                          x={xFor(p.year)}
                          y={labelY}
                          textAnchor="middle"
                          fontSize="13"
                          fontWeight="700"
                          fill={s.color}
                        >
                          {p.score.toFixed(p.score % 1 === 0 ? 0 : 1)}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Terminal series label, right of last dot */}
                <text
                  x={xFor(last.year) + 16}
                  y={yFor(last.score) - 4}
                  fontSize="18"
                  fontWeight="700"
                  fill={s.color}
                >
                  {s.label}
                </text>
                <text
                  x={xFor(last.year) + 16}
                  y={yFor(last.score) + 14}
                  fontSize="12"
                  fontStyle="italic"
                  fill="rgba(31, 26, 22, 0.62)"
                >
                  {s.note}
                </text>
                <text
                  x={xFor(last.year) + 16}
                  y={yFor(last.score) + 32}
                  fontSize="12"
                  fontWeight="600"
                  letterSpacing="0.04em"
                  fill={s.color}
                  opacity="0.78"
                >
                  {deltaPts >= 0 ? '+' : ''}
                  {deltaPts.toFixed(1)} pts in {deltaYrs}y
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

