'use client';

import React from 'react';
import { Reveal } from '../motion/Reveal';

export function BloomsTaxonomy() {
  const layers = [
    { name: 'Create',     color: '#1f1a16', text: '#fffdf9', isApex: true },
    { name: 'Evaluate',   color: '#8d4e2f', text: '#fffdf9' },
    { name: 'Analyze',    color: '#c57b4a', text: '#1f1a16' },
    { name: 'Apply',      color: '#ddb07c', text: '#1f1a16' },
    { name: 'Understand', color: '#e7d3b1', text: '#1f1a16' },
    { name: 'Remember',   color: '#f0e4cd', text: '#1f1a16', isBase: true }
  ];

  return (
    <div
      className="blooms-taxonomy"
      data-blooms-taxonomy="true"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0', width: '100%' }}
    >
      {layers.map((layer, index) => {
        const delay = (layers.length - 1 - index) * 0.15;
        const width = `${30 + (index * 12)}%`;
        
        // Define border radius to create a monolithic shape
        const borderRadius = layer.isApex ? '16px 16px 0 0' : layer.isBase ? '0 0 16px 16px' : '0';
        // Only the top layer has a top border to avoid double borders
        const borderTop = layer.isApex ? '1px solid rgba(31, 26, 22, 0.2)' : 'none';
        
        return (
          <div key={layer.name} style={{ width, marginBottom: '0' }}>
            <Reveal delay={delay} direction="up">
              <div 
                className="gpu-accelerated"
                style={{
                  background: layer.color,
                  color: layer.text,
                  textAlign: 'center',
                  padding: '1.25rem',
                  borderRadius,
                  fontWeight: layer.isApex ? 600 : 500,
                  letterSpacing: '0.02em',
                  borderLeft: '1px solid rgba(31, 26, 22, 0.14)',
                  borderRight: '1px solid rgba(31, 26, 22, 0.14)',
                  borderBottom: '1px solid rgba(31, 26, 22, 0.14)',
                  borderTop,
                  boxShadow: layer.isBase ? '0 20px 40px rgba(31, 26, 22, 0.08)' : 'none',
                  position: 'relative',
                  zIndex: layers.length - index
                }}
              >
                {layer.name}
              </div>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}
