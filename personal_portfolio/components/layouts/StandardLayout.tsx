import React from "react";
import { PageData } from "../../lib/content/schema";
import { getPageExperienceProfile, PageRouteLink } from "../../lib/stakeholder-paths";
import { MarkdownRenderer } from "../markdown/MarkdownRenderer";
import { DriftMedia } from "../motion/DriftMedia";
import { LayeredRevealGroup } from "../motion/LayeredRevealGroup";
import { Reveal } from "../motion/Reveal";
import { SceneCard } from "../motion/SceneCard";
import { SiteFooter } from "../site-footer";
import { ContextualLink } from "../ui/ContextualLink";
import { extractKeyPoints, splitDepthPageContent } from "../../lib/content/depth-page";

import styles from "./StandardLayout.module.css";

interface LayoutProps {
  page: PageData;
}

function renderRouteLink(link: PageRouteLink, className: string) {
  return (
    <ContextualLink key={link.href} href={link.href} className={className} external={link.external}>
      {link.label}
    </ContextualLink>
  );
}

export function StandardLayout({ page }: LayoutProps) {
  const strategy = getPageExperienceProfile(page.slug);
  const pageStructure = splitDepthPageContent(page.content);
  const sections = pageStructure.sections.length > 0
    ? pageStructure.sections
    : [{ id: `${page.slug}-content`, title: page.frontmatter.title, content: page.content.trim() }];
  const keyPoints = extractKeyPoints(sections);
  const thesisSource = pageStructure.intro.trim();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <nav className={styles.returnNav}>
          <ContextualLink href="/" className={styles.returnLink}>
            &larr; Return to Presentation
          </ContextualLink>
          <span className={styles.returnMeta}>{strategy.useCase}</span>
        </nav>

        <section className={styles.heroScene}>
          {page.frontmatter.heroImage ? (
            <DriftMedia intensity="medium" className="h-full" sequence="standard">
              <div className={styles.heroMedia}>
                <img
                  src={page.frontmatter.heroImage}
                  alt={page.frontmatter.title}
                  className={styles.heroImage}
                />
              </div>
            </DriftMedia>
          ) : null}

          <LayeredRevealGroup className={styles.heroCopy} direction="up" sequence="standard" stagger={0.08}>
            <p className={styles.eyebrow}>{strategy.eyebrow}</p>
            <h1 className={styles.title}>{page.frontmatter.title}</h1>
            {page.frontmatter.seo?.description ? (
              <p className={styles.dek}>{page.frontmatter.seo.description}</p>
            ) : null}
            <div className={styles.metaRow}>
              <span className={styles.metaPill}>{strategy.audience}</span>
              <span className={styles.metaPill}>{strategy.useCase}</span>
            </div>
          </LayeredRevealGroup>
        </section>

        <SceneCard variant="emphasis" sequence="standard">
          <section className={styles.thesisFrame}>
            <p className={styles.thesisLabel}>Core claim</p>
            <div className={styles.thesisBody}>
              <p className={styles.thesisLead}>{page.frontmatter.seo?.description || page.frontmatter.title}</p>
              {thesisSource ? <MarkdownRenderer source={thesisSource} layout="standard" /> : null}
            </div>
          </section>
        </SceneCard>

        <section className={styles.emphasisBand}>
          <SceneCard variant="emphasis" sequence="standard">
            <div className={styles.emphasisCard}>
              <p className={styles.emphasisLabel}>Audience fit</p>
              <p className={styles.emphasisValue}>{strategy.audience}</p>
            </div>
          </SceneCard>
          <SceneCard variant="emphasis" sequence="standard" delay={0.06}>
            <div className={styles.emphasisCard}>
              <p className={styles.emphasisLabel}>Best use</p>
              <p className={styles.emphasisValue}>{strategy.useCase}</p>
            </div>
          </SceneCard>
          <SceneCard variant="emphasis" sequence="standard" delay={0.12}>
            <div className={styles.emphasisCard}>
              <p className={styles.emphasisLabel}>Key proof</p>
              <p className={styles.emphasisValue}>{keyPoints[0] ?? "This page deepens one branch of the presentation without leaving the central argument."}</p>
            </div>
          </SceneCard>
        </section>

        <section className={styles.sectionStack}>
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} className={styles.section}>
              <Reveal direction="up" sequence="standard">
                <div className={styles.sectionRail}>
                  <span className={styles.sectionNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.sectionAnchor}>Scene</span>
                </div>
              </Reveal>

              <SceneCard variant="section" sequence="standard" delay={0.06}>
                <article className={styles.sectionCard}>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  <div className={styles.sectionBody}>
                    <MarkdownRenderer source={section.content} layout="standard" />
                  </div>
                </article>
              </SceneCard>
            </section>
          ))}
        </section>

        <SceneCard variant="cta" sequence="standard">
          <section className={styles.closingZone}>
            <p className={styles.closingLabel}>Next move</p>
            <h2 className={styles.closingTitle}>{strategy.closingTitle}</h2>
            <p className={styles.closingBody}>{strategy.closingBody}</p>
            <div className={styles.closingLinks}>
              {strategy.links.map((link, index) =>
                renderRouteLink(link, index === 0 ? styles.closingLink : styles.closingLinkSecondary),
              )}
            </div>
          </section>
        </SceneCard>
      </main>

      <SiteFooter mode="standard" />
    </div>
  );
}
