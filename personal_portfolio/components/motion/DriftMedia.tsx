"use client";

import React, { useRef } from "react";
import { MotionValue, motion, useInView, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useSlideContext } from "./SlideContext";

interface DriftMediaProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "soft" | "medium";
  sequence?: "standard" | "delayed";
}

export function DriftMedia({
  children,
  className = "",
  intensity = "soft",
  sequence = "standard",
}: DriftMediaProps) {
  const slideContext = useSlideContext();

  if (slideContext?.scrollYProgress) {
    return (
      <SlideDriftMedia
        className={className}
        intensity={intensity}
        sequence={sequence}
        scrollYProgress={slideContext.scrollYProgress}
      >
        {children}
      </SlideDriftMedia>
    );
  }

  return (
    <ViewportDriftMedia className={className} intensity={intensity}>
      {children}
    </ViewportDriftMedia>
  );
}

function SlideDriftMedia({
  children,
  className = "",
  intensity = "soft",
  sequence = "standard",
  scrollYProgress,
}: DriftMediaProps & { scrollYProgress: MotionValue<number> }) {
  const prefersReducedMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const startThreshold = sequence === "delayed" ? 0.54 : 0.08;
  const endThreshold = sequence === "delayed" ? 0.92 : 0.82;
  const range = intensity === "medium" ? 28 : 18;
  const scaleStart = intensity === "medium" ? 1.08 : 1.04;

  const opacity = useTransform(smoothProgress, [startThreshold, endThreshold], [0.72, 1], { clamp: true });
  const y = useTransform(smoothProgress, [startThreshold, endThreshold], [range, 0], { clamp: true });
  const scale = useTransform(smoothProgress, [startThreshold, endThreshold], [scaleStart, 1], { clamp: true });

  return (
    <div className={`relative w-full h-full ${className}`}>
      <motion.div
        style={prefersReducedMotion ? undefined : { opacity, y, scale }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

function ViewportDriftMedia({
  children,
  className = "",
  intensity = "soft",
}: Omit<DriftMediaProps, 'sequence'>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(containerRef, { margin: "0px 0px -10% 0px", amount: 0.25 });
  const yStart = intensity === "medium" ? 28 : 18;
  const scaleStart = intensity === "medium" ? 1.08 : 1.04;

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0.72, y: yStart, scale: scaleStart }}
        animate={prefersReducedMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : inView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0.72, y: yStart, scale: scaleStart }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}