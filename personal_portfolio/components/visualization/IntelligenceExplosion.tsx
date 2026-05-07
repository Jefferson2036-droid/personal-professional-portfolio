'use client';

import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useSlideContext } from '../motion/SlideContext';

const chartData = [
  { year: 2020, capability: 100, compute: 100, cost: 100, deployment: 100 },
  { year: 2021, capability: 122, compute: 146, cost: 128, deployment: 112 },
  { year: 2022, capability: 165, compute: 230, cost: 210, deployment: 138 },
  { year: 2023, capability: 248, compute: 390, cost: 520, deployment: 196 },
  { year: 2024, capability: 405, compute: 640, cost: 1550, deployment: 290 },
  { year: 2025, capability: 690, compute: 980, cost: 5100, deployment: 420 },
  { year: 2026, capability: 1020, compute: 1460, cost: 11000, deployment: 610 },
  { year: 2027, capability: 1360, compute: 1900, cost: 18000, deployment: 810 },
  { year: 2028, capability: 1760, compute: 2450, cost: 28000, deployment: 1040 },
  { year: 2029, capability: 2200, compute: 3100, cost: 39500, deployment: 1300 },
  { year: 2030, capability: 2750, compute: 3920, cost: 54000, deployment: 1620 },
];

const series = [
  { key: 'capability', label: 'Capability', stroke: '#fffdf9', width: 3.5, dash: undefined },
  { key: 'compute', label: 'Training intensity', stroke: '#d7c7ac', width: 2.5, dash: '10 8' },
  { key: 'cost', label: 'Cost efficiency', stroke: '#d77a38', width: 2.5, dash: '3 10' },
  { key: 'deployment', label: 'Deployment', stroke: '#8ed1d2', width: 2.5, dash: '16 8 4 8' },
] as const;

type Datum = (typeof chartData)[number];
type SeriesKey = keyof Pick<Datum, 'capability' | 'compute' | 'cost' | 'deployment'>;

function buildPath(data: Datum[], key: SeriesKey, width: number, height: number, padding: { top: number; right: number; bottom: number; left: number }) {
  const maxValue = Math.max(...chartData.map((point) => point.cost));
  const minYear = chartData[0].year;
  const maxYear = chartData[chartData.length - 1].year;

  return data
    .map((point, index) => {
      const x = padding.left + ((point.year - minYear) / (maxYear - minYear)) * (width - padding.left - padding.right);
      const y = height - padding.bottom - (Math.log10(point[key]) / Math.log10(maxValue)) * (height - padding.top - padding.bottom);
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

export function IntelligenceExplosion() {
  const slideContext = useSlideContext();
  const fallbackProgress = useMotionValue(1);
  const width = 860;
  const height = 460;
  const padding = { top: 40, right: 28, bottom: 56, left: 72 };

  const scrollYProgress = slideContext?.scrollYProgress ?? fallbackProgress;

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const maxValue = Math.max(...chartData.map((point) => point.cost));
  const yTicks = [100, 1000, 10000, 50000];

  return (
    <div 
      className="gpu-accelerated" 
      style={{
        width: '100%',
        minHeight: '480px',
        margin: '3rem 0 2rem',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem 0 2rem'
      }}
    >
      <div
        className="glass-panel glass-panel--dark"
        style={{
          width: 'min(100%, 72rem)',
          display: 'grid',
          gap: '1.25rem',
          padding: '2rem 2rem 1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <p className="eyebrow" style={{ color: '#d7c7ac', marginBottom: '0.5rem' }}>The Implementation Era, Rebased To 2020</p>
            <p style={{ margin: 0, color: '#e4dccc', maxWidth: '42rem', lineHeight: 1.6 }}>
              Composite index, rebased so 2020 = 100. It tracks capability,
              training intensity, cost efficiency, and deployment as one
              accelerating operational picture.
            </p>
          </div>
          <p style={{ margin: 0, color: '#b7ae9e', fontSize: '0.9rem' }}>Directional view only. Not an AGI claim.</p>
        </div>

        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" style={{ position: 'relative', zIndex: 10, overflow: 'visible' }}>
          {yTicks.map((tick) => {
            const y = height - padding.bottom - (Math.log10(tick) / Math.log10(maxValue)) * (height - padding.top - padding.bottom);
            return (
              <g key={tick}>
                <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="rgba(255,253,249,0.12)" strokeWidth="1" />
                <text x={padding.left - 16} y={y + 4} textAnchor="end" fill="rgba(255,253,249,0.72)" fontSize="12">
                  {tick.toLocaleString()}
                </text>
              </g>
            );
          })}

          {chartData.map((point, index) => {
            const x = padding.left + (index / (chartData.length - 1)) * (width - padding.left - padding.right);
            return (
              <g key={point.year}>
                <line x1={x} y1={padding.top} x2={x} y2={height - padding.bottom} stroke="rgba(255,253,249,0.06)" strokeWidth="1" />
                <text x={x} y={height - 20} textAnchor="middle" fill="rgba(255,253,249,0.72)" fontSize="12">
                  {point.year}
                </text>
              </g>
            );
          })}

          <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="rgba(255,253,249,0.34)" strokeWidth="1.5" />
          <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="rgba(255,253,249,0.34)" strokeWidth="1.5" />

          {series.map((item) => {
            const path = buildPath(chartData, item.key as SeriesKey, width, height, padding);
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

          <text x={16} y={height / 2} fill="rgba(255,253,249,0.72)" fontSize="12" transform={`rotate(-90 16 ${height / 2})`}>
            Normalized change, 2020 = 100
          </text>
          <text x={width / 2} y={height - 6} fill="rgba(255,253,249,0.72)" fontSize="12" textAnchor="middle">
            Year
          </text>
        </svg>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem 1.5rem' }}>
          {series.map((item) => (
            <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fffdf9', fontSize: '0.95rem' }}>
              <span style={{ width: '2.5rem', height: '0', borderTop: `${item.width}px ${item.dash ? 'dashed' : 'solid'} ${item.stroke}` }} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
