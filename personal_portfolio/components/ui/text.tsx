import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

export function Text({ children, className = "", ...props }: TextProps) {
  return (
    <p className={`text-body ${className}`} {...props}>
      {children}
    </p>
  );
}
