"use client";

import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useSlideContext } from "../motion/SlideContext";
import { SourceLine } from "../ui/SourceLine";
import faiiData from "../../data/derived/frontier-ai-intensity.json";

/**
 * Frontier AI Intensity Index — rebuilt per
 * docs/_specs/visualizations/00-frontier-ai-intensity.md.
 *
 * Reads data/derived/frontier-ai-intensity.json (built from
 * data/manual/faii-milestones.yml by scripts/build-data.ts). No hard-coded
 * numbers live in this component; every value traces to the pipeline.
 *
 * Framing rules (doctrine):
 *   - Visible title: "Frontier AI Intensity Index" (never "Intelligence Explosion")
 *   - Legend states this measures acceleration, not a scalar of intelligence
 *   - Future-year bands are scenario envelopes, not predictions
 */

type SeriesKey = "composite" | "capability" | "scaling" | "deployment" | "economics";

interface SeriesStyle {
  key: SeriesKey;
  label: string;
  stroke: string;
  width: number;
  dash?: string;
}

const series: SeriesStyle[] = [
  { key: "composite", label: "Composite (weighted)", stroke: "#fffdf9", width: 3.5 },
  { key: "capability", label: "Capability (40%)", stroke: "#d77a38", width: 2.25, dash: "2 6" },
  { key: "scaling", label: "Scaling inputs (25%)", stroke: "#8ed1d2", width: 2.25, dash: "10 8" },
  { key: "economics", label: "Economics (20%)", stroke: "#d7c7ac", width: 2.25, dash: "3 10" },
  { key: "deployment", label: "Deployment (15%)", stroke: "#b7a4d1", width: 2.25, dash: "16 8 4 8" },
];

function buildPath(
  rows: typeof faiiData.series,
  key: SeriesKey,
  width: number,
  height: number,
  padding: { top: number; right: number; bottom: number; left: number },
  maxValue: number,
) {
  const minYear = rows[0].year;
  const maxYear = rows[rows.length - 1].year;
  return rows
    .map((point, index) => {
      const x =
        padding.left +
        ((point.year - minYear) / (maxYear - minYear)) *
          (width - padding.left - padding.right);
      const value = Math.max(1, point[key]);
      const y =
        height -
        padding.bottom -
        (Math.log10(value) / Math.log10(maxValue)) *
          (height - padding.top - padding.bottom);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export function FrontierAIIntensityIndex() {
  const slideContext = useSlideContext();
  const fallbackProgress = useMotionValue(1);
  const scrollYProgress = slideContext?.scrollYProgress ?? fallbackProgress;
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const rows = faiiData.series;
  const width = 880;
  const height = 480;
  const padding = { top: 48, right: 36, bottom: 64, left: 76 };

  const maxValue = Math.max(
    ...rows.flatMap((r) => [r.composite, r.capability, r.scaling, r.economics, r.deployment]),
  );
  const yTicks = [100, 1000, 10000];
  const milestones = faiiData.milestones.filter(
    (m) => m.year >= rows[0].year && m.year <= rows[rows.length - 1].year,
  );

  return (
    <div
      className="gpu-accelerated"
      style={{
        width: "100%",
        minHeight: "500px",
        margin: "3rem 0 2rem",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem 0 2rem",
      }}
    >
      <div
        className="glass-panel glass-panel--dark"
        style={{
          width: "min(100%, 76rem)",
          display: "grid",
          gap: "1.25rem",
          padding: "2rem 2rem 1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p className="eyebrow" style={{ color: "#d7c7ac", marginBottom: "0.5rem" }}>
              Frontier AI Intensity Index · rebased to 2020 = 100
            </p>
            <p
              style={{
                margin: 0,
                color: "#e4dccc",
                maxWidth: "46rem",
                lineHeight: 1.6,
              }}
            >
              Composite of four signal families — capability (40%), scaling
              inputs (25%), economics (20%), and deployment (15%) — normalized
              so 2020 = 100. Tracks <strong>frontier AI acceleration</strong>;
              not a metaphysical scalar of intelligence.
            </p>
          </div>
          <p style={{ margin: 0, color: "#b7ae9e", fontSize: "0.9rem", maxWidth: "14rem" }}>
            Log-normalized inputs. Future-year points are scenario envelopes,
            not predictions.
          </p>
        </div>

        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Frontier AI Intensity Index composite chart"
          style={{ position: "relative", zIndex: 10, overflow: "visible" }}
        >
          {yTicks.map((tick) => {
            const y =
              height -
              padding.bottom -
              (Math.log10(tick) / Math.log10(maxValue)) *
                (height - padding.top - padding.bottom);
            return (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="rgba(255,253,249,0.12)"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 16}
                  y={y + 4}
                  textAnchor="end"
                  fill="rgba(255,253,249,0.72)"
                  fontSize="12"
                >
                  {tick.toLocaleString()}
                </text>
              </g>
            );
          })}

          {rows.map((point, index) => {
            const x =
              padding.left +
              (index / (rows.length - 1)) * (width - padding.left - padding.right);
            if (point.year % 2 !== 0 && point.year !== rows[rows.length - 1].year) {
              return null;
            }
            return (
              <g key={point.year}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={height - padding.bottom}
                  stroke="rgba(255,253,249,0.06)"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={height - 24}
                  textAnchor="middle"
                  fill="rgba(255,253,249,0.72)"
                  fontSize="12"
                >
                  {point.year}
                </text>
              </g>
            );
          })}

          {/* Milestone markers */}
          {milestones.map((m) => {
            const minYear = rows[0].year;
            const maxYear = rows[rows.length - 1].year;
            const x =
              padding.left +
              ((m.year - minYear) / (maxYear - minYear)) *
                (width - padding.left - padding.right);
            return (
              <g key={`milestone-${m.year}-${m.label}`}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={height - padding.bottom}
                  stroke="rgba(215,122,56,0.45)"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
                <text
                  x={x + 4}
                  y={padding.top + 12}
                  fill="#d7c7ac"
                  fontSize="10"
                  style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
                >
                  {m.year}
                </text>
              </g>
            );
          })}

          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={height - padding.bottom}
            stroke="rgba(255,253,249,0.34)"
            strokeWidth="1.5"
          />
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="rgba(255,253,249,0.34)"
            strokeWidth="1.5"
          />

          {series.map((item) => {
            const path = buildPath(rows, item.key, width, height, padding, maxValue);
            return (
              <motion.path
                key={item.key}
                d={path}
                fill="transparent"
                stroke={item.stroke}
                strokeWidth={item.width}
                strokeDasharray={item.dash}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength: smoothProgress }}
              />
            );
          })}

          <text
            x={16}
            y={height / 2}
            fill="rgba(255,253,249,0.72)"
            fontSize="12"
            transform={`rotate(-90 16 ${height / 2})`}
          >
            Index value (log scale, 2020 = 100)
          </text>
          <text
            x={width / 2}
            y={height - 6}
            fill="rgba(255,253,249,0.72)"
            fontSize="12"
            textAnchor="middle"
          >
            Year
          </text>
        </svg>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem 1.5rem" }}>
          {series.map((item) => (
            <div
              key={item.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                color: "#fffdf9",
                fontSize: "0.95rem",
              }}
            >
              <span
                style={{
                  width: "2.5rem",
                  height: 0,
                  borderTop: `${item.width}px ${item.dash ? "dashed" : "solid"} ${item.stroke}`,
                }}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <details
          style={{
            color: "#b7ae9e",
            fontSize: "0.85rem",
            marginTop: "0.25rem",
          }}
        >
          <summary style={{ cursor: "pointer", color: "#d7c7ac" }}>
            Methodology and data table
          </summary>
          <p style={{ margin: "0.6rem 0" }}>
            Capability inputs use a logit transform on benchmark scores; scaling,
            economics, and deployment use log<sub>10</sub>. Each family is rebased
            so 2020 = 100, then combined with the published weights. Values above
            are synthesized from{" "}
            <code>data/manual/faii-milestones.yml</code> via{" "}
            <code>scripts/build-data.ts</code>.
          </p>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "#e4dccc",
              fontSize: "0.8rem",
            }}
          >
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(255,253,249,0.2)" }}>
                <th style={{ padding: "0.4rem 0.6rem" }}>Year</th>
                <th style={{ padding: "0.4rem 0.6rem" }}>Composite</th>
                <th style={{ padding: "0.4rem 0.6rem" }}>Capability</th>
                <th style={{ padding: "0.4rem 0.6rem" }}>Scaling</th>
                <th style={{ padding: "0.4rem 0.6rem" }}>Economics</th>
                <th style={{ padding: "0.4rem 0.6rem" }}>Deployment</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.year} style={{ borderBottom: "1px solid rgba(255,253,249,0.08)" }}>
                  <td style={{ padding: "0.3rem 0.6rem" }}>{r.year}</td>
                  <td style={{ padding: "0.3rem 0.6rem" }}>{r.composite.toLocaleString()}</td>
                  <td style={{ padding: "0.3rem 0.6rem" }}>{r.capability.toLocaleString()}</td>
                  <td style={{ padding: "0.3rem 0.6rem" }}>{r.scaling.toLocaleString()}</td>
                  <td style={{ padding: "0.3rem 0.6rem" }}>{r.economics.toLocaleString()}</td>
                  <td style={{ padding: "0.3rem 0.6rem" }}>{r.deployment.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>

        <div style={{ marginTop: "0.5rem" }}>
          <SourceLine ids={faiiData.sourceIds} />
        </div>
      </div>
    </div>
  );
}

export default FrontierAIIntensityIndex;
