'use client';

import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { SlideContext } from './SlideContext';

interface PresentationSlideProps {
  children: React.ReactNode;
  index: number;
  backgroundColor: string;
  hasBackground?: boolean;
}

export function PresentationSlide({ children, index, backgroundColor, hasBackground = false }: PresentationSlideProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const slideHeight = hasBackground ? '200vh' : '170vh';
  
  // Track the entire section's progress as it enters the viewport.
  // "start end" = animation starts when section top hits viewport bottom.
  // "end end" = animation completes exactly when section bottom hits viewport bottom.
  // For 100vh slides, this is a 2-beat journey (0 to 1).
  // For 200vh slides, this is a 3-beat journey:
  // 0 -> 0.5: Slide enters and locks at top: 0
  // 0.5 -> 1.0: Slide is locked, scroll momentum drives delayed animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  // Slide 1 always loads with scrollY at or near 0, which would land
  // scroll-progress-driven reveals partway through their range. Skip
  // the slide-context for index 0 so Reveal/SceneCard fall back to the
  // viewport-on-mount path (clean fade-in on page load).
  const contextValue = index === 0 ? { scrollYProgress: null } : { scrollYProgress };

  return (
    <SlideContext.Provider value={contextValue}>
      <section 
        ref={sectionRef}
        id={`slide-${index + 1}`}
        data-presentation-slide="true"
        data-slide-index={index}
        style={{
          height: slideHeight,
          width: '100%',
          position: 'relative',
          zIndex: index, // Ascending z-index so incoming slides stack over stuck ones
          backgroundColor
        }}
      >
        <div style={{
          height: '100vh',
          width: '100%',
          position: 'sticky',
          top: 0,
        }} className="presentation-slide__stage">
          {children}
        </div>
      </section>
    </SlideContext.Provider>
  );
}
