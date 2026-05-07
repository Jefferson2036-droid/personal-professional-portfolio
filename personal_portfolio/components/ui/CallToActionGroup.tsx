"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface CallToActionGroupProps {
  children?: React.ReactNode;
}

interface ParsedLink {
  text: string;
  url: string;
  isExternal: boolean;
  isPrimary: boolean;
}

export function CallToActionGroup({ children }: CallToActionGroupProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [returnTarget, setReturnTarget] = React.useState<string | null>(null);

  React.useEffect(() => {
    const slideElement = containerRef.current?.closest<HTMLElement>("[data-presentation-slide='true']");
    const slideIndex = slideElement?.dataset.slideIndex;
    const preservedReturnTo = new URLSearchParams(window.location.search).get("returnTo");

    if (preservedReturnTo?.startsWith("/")) {
      setReturnTarget(preservedReturnTo);
      return;
    }

    if (!slideElement || slideIndex === undefined) {
      setReturnTarget(null);
      return;
    }

    const numericIndex = Number(slideIndex);

    if (Number.isNaN(numericIndex)) {
      setReturnTarget(null);
      return;
    }

    setReturnTarget(`${pathname}#slide-${numericIndex + 1}`);
  }, [pathname]);

  // Extract raw text from children safely
  const rawText = typeof children === "string" 
    ? children 
    : Array.isArray(children) ? children.join("") : "";

  // Parse [Text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links: ParsedLink[] = [];
  let match;

  while ((match = linkRegex.exec(rawText)) !== null) {
    const text = match[1];
    const url = match[2];
    const isExternal = url.startsWith("http");
    const isPrimary = links.length === 0; // First link is primary
    links.push({ text, url, isExternal, isPrimary });
  }

  if (links.length === 0) return null;

  const decorateInternalUrl = (url: string) => {
    if (!returnTarget || /^https?:/i.test(url) || url.startsWith("#")) {
      return url;
    }

    if (url === "/") {
      return returnTarget;
    }

    const [pathWithQuery, hash = ""] = url.split("#");
    const separator = pathWithQuery.includes("?") ? "&" : "?";

    return `${pathWithQuery}${separator}returnTo=${encodeURIComponent(returnTarget)}${hash ? `#${hash}` : ""}`;
  };

  return (
    <motion.div 
      ref={containerRef}
      className="cta-group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "calc(var(--space-1x) * 1.5)",
        marginTop: "var(--space-2x)",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%"
      }}
    >
      {links.map((link, index) => {
        const buttonClassName = link.isPrimary ? "cta-link cta-link--primary" : "cta-link cta-link--secondary";

        const content = (
          <motion.div
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            style={{ display: "inline-flex" }}
          >
            {link.isExternal ? (
              <a href={link.url} target="_blank" rel="noopener noreferrer" className={buttonClassName}>
                <span className="cta-link__label">{link.text}</span>
                <span className="cta-link__arrow" aria-hidden="true">&rarr;</span>
              </a>
            ) : (
              <Link href={decorateInternalUrl(link.url)} className={buttonClassName}>
                <span className="cta-link__label">{link.text}</span>
                <span className="cta-link__arrow" aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </motion.div>
        );

        return (
          <React.Fragment key={index}>
            {content}
          </React.Fragment>
        );
      })}
    </motion.div>
  );
}
