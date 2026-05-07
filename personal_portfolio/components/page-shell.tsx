import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="site-main">
        <div className="shell-band">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
