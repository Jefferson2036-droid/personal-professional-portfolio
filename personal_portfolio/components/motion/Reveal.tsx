"use client";

import React, { useRef } from "react";
import {
  MotionValue,
  motion,
  useInView,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useSlideContext } from "./SlideContext";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  sequence?: "standard" | "delayed";
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
  sequence = "standard",
}: RevealProps) {
  const slideContext = useSlideContext();

  if (slideContext?.scrollYProgress) {
    return (
      <SlideReveal
        scrollYProgress={slideContext.scrollYProgress}
        delay={delay}
        className={className}
        direction={direction}
        sequence={sequence}
      >
        {children}
      </SlideReveal>
    );
  }

  return (
    <ViewportReveal delay={delay} className={className} direction={direction}>
      {children}
    </ViewportReveal>
  );
}

function SlideReveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
  sequence = "standard",
  scrollYProgress,
}: RevealProps & { scrollYProgress: MotionValue<number> }) {
  const prefersReducedMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const startThreshold = sequence === "delayed"
    ? 0.5 + (delay * 0.1)
    : Math.min(delay * 0.5, 0.5);
  const endThreshold = sequence === "delayed" ? 0.9 : 0.8;

  const opacity = useTransform(smoothProgress, [startThreshold, endThreshold], [0, 1], { clamp: true });
  const xDist = direction === "left" ? -40 : direction === "right" ? 40 : 0;
  const yDist = direction === "up" ? 30 : direction === "down" ? -30 : 0;
  const x = useTransform(smoothProgress, [startThreshold, endThreshold], [xDist, 0], { clamp: true });
  const y = useTransform(smoothProgress, [startThreshold, endThreshold], [yDist, 0], { clamp: true });
  const style = prefersReducedMotion || direction === "none" ? undefined : { opacity, x, y };

  return (
    <div className={`relative w-full ${className}`}>
      <motion.div style={style} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}

function ViewportReveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: Omit<RevealProps, "sequence">) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(containerRef, { margin: "0px 0px -12% 0px", amount: 0.2 });

  const xDist = direction === "left" ? -40 : direction === "right" ? 40 : 0;
  const yDist = direction === "up" ? 30 : direction === "down" ? -30 : 0;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <motion.div
        initial={prefersReducedMotion || direction === "none" ? false : { opacity: 0, x: xDist, y: yDist }}
        animate={prefersReducedMotion || direction === "none"
          ? { opacity: 1, x: 0, y: 0 }
          : inView
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, x: xDist, y: yDist }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
