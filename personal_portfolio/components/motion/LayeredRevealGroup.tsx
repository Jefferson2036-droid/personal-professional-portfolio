"use client";

import React from "react";
import { Reveal } from "./Reveal";

interface LayeredRevealGroupProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  sequence?: "standard" | "delayed";
  stagger?: number;
}

export function LayeredRevealGroup({
  children,
  className = "",
  direction = "up",
  sequence = "standard",
  stagger = 0.08,
}: LayeredRevealGroupProps) {
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <div className={className}>
      {items.map((child, index) => (
        <Reveal
          key={index}
          delay={index * stagger}
          direction={direction}
          sequence={sequence}
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
}