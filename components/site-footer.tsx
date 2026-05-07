import Link from "next/link";

type SiteFooterProps = {
  mode?: "standard" | "presentation";
};

export function SiteFooter({ mode = "standard" }: SiteFooterProps) {
  return (
    <footer className={`site-footer site-footer--${mode}`}>
      <div className={`site-footer__inner site-footer__inner--${mode}`}>
        <div className="site-footer__brand">
          <div className="site-footer__brand-copy">
            <p className="site-footer__label">JEFFERSON RODAS</p>
            <p className="site-footer__title">Business Information Systems</p>
          </div>
        </div>

        <div className="site-footer__handouts">
          <p className="site-footer__eyebrow">Connect</p>
          <div className="site-footer__links">
            <Link
              href="https://linkedin.com/in/jefferson-rodas"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__link site-footer__link--external"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/Jefferson2036-droid"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__link site-footer__link--external"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
