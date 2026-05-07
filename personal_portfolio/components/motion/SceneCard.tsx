"use client";

import React, { useRef } from "react";
import { MotionValue, motion, useInView, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useSlideContext } from "./SlideContext";

interface SceneCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "section" | "emphasis" | "cta";
  sequence?: "standard" | "delayed";
  delay?: number;
}

const variantSettings = {
  section: { yStart: 34, scaleStart: 0.965 },
  emphasis: { yStart: 22, scaleStart: 0.98 },
  cta: { yStart: 28, scaleStart: 0.975 },
} as const;

export function SceneCard({
  children,
  className = "",
  variant = "section",
  sequence = "standard",
  delay = 0,
}: SceneCardProps) {
  const slideContext = useSlideContext();

  if (slideContext?.scrollYProgress) {
    return (
      <SlideSceneCard
        className={className}
        variant={variant}
        sequence={sequence}
        delay={delay}
        scrollYProgress={slideContext.scrollYProgress}
      >
        {children}
      </SlideSceneCard>
    );
  }

  return (
    <ViewportSceneCard className={className} variant={variant} delay={delay}>
      {children}
    </ViewportSceneCard>
  );
}

function SlideSceneCard({
  children,
  className = "",
  variant = "section",
  sequence = "standard",
  delay = 0,
  scrollYProgress,
}: SceneCardProps & { scrollYProgress: MotionValue<number> }) {
  const prefersReducedMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  const startThreshold = sequence === "delayed"
    ? 0.52 + (delay * 0.08)
    : Math.min(0.08 + (delay * 0.32), 0.46);
  const endThreshold = sequence === "delayed" ? 0.9 : 0.8;
  const settings = variantSettings[variant];

  const opacity = useTransform(smoothProgress, [startThreshold, endThreshold], [0, 1], { clamp: true });
  const y = useTransform(smoothProgress, [startThreshold, endThreshold], [settings.yStart, 0], { clamp: true });
  const scale = useTransform(smoothProgress, [startThreshold, endThreshold], [settings.scaleStart, 1], { clamp: true });

  return (
    <div className={`relative w-full ${className}`}>
      <motion.div
        style={prefersReducedMotion ? undefined : { opacity, y, scale }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

function ViewportSceneCard({
  children,
  className = "",
  variant = "section",
  delay = 0,
}: Omit<SceneCardProps, 'sequence'>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(containerRef, { margin: "0px 0px -10% 0px", amount: 0.24 });
  const settings = variantSettings[variant];

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: settings.yStart, scale: settings.scaleStart }}
        animate={prefersReducedMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : inView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: settings.yStart, scale: settings.scaleStart }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}