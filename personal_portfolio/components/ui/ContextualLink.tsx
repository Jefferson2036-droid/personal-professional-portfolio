"use client";

import Link from "next/link";
import React from "react";

type ContextualLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
};

function withReturnContext(href: string, returnTo: string | null) {
  if (!returnTo || !returnTo.startsWith("/")) {
    return href;
  }

  if (href === "/") {
    return returnTo;
  }

  const separator = href.includes("?") ? "&" : "?";

  return `${href}${separator}returnTo=${encodeURIComponent(returnTo)}`;
}

export function ContextualLink({ href, className, children, external = false }: ContextualLinkProps) {
  const [returnTo, setReturnTo] = React.useState<string | null>(null);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentReturnTo = params.get("returnTo");
    setReturnTo(currentReturnTo);
  }, []);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={withReturnContext(href, returnTo)} className={className}>
      {children}
    </Link>
  );
}