import React from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  children?: React.ReactNode;
}

export function Heading({ level, children, className = "", ...props }: HeadingProps) {
  const Tag = `h${level}` as React.ElementType;
  
  return (
    <Tag className={`heading heading--${level} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
