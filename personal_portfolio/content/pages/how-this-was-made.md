---
title: "Spec, Sprint, And Verification"
layout: "standard"
heroImage: "/images/media/modules/generated/math-guide-hero.webp"
seo:
  title: "Spec, Sprint, And Verification"
  description: "How serious AI-assisted work is kept bounded, testable, and reviewable through specs, sprint documents, evals, and verification."
---

## Serious AI Work Needs More Than A Prompt

The most useful lesson behind this project is not the site itself. It is the
method used to keep AI-assisted work bounded, testable, and reviewable instead
of vague, overconfident, and hard to audit. This deck itself was built with
that control loop — the specs in `docs/_specs/`, the sprint-sized execution
plan in `docs/_specs/README.md`, and the verification command sequence in
`docs/_specs/site/04-verification-and-prereqs.md`.

## The Core Sequence

- define the problem clearly
- turn that problem into a specification
- break the work into sprint-sized chunks
- set invariants and acceptance criteria before implementation
- implement one bounded unit at a time
- run tests, evals, and verification before claiming completion
- revise based on failures, not optimism

That sequence is more important than the specific framework used here.

## Why Specs Matter

A specification preserves intent. It defines the problem, the scope, the
architectural direction, the constraints, and the conditions for saying the
work is done. Without a spec, AI assistance expands toward whatever seems
adjacent or plausible.

## Why Sprint Documents Matter

A sprint document narrows execution. It turns a larger contract into one
chunk that can actually be reasoned about, implemented, and checked.
Breaking the work down is not bureaucracy — it is how teams preserve
judgment.

## Why Verification Matters

Verification exists because AI systems often look finished before they are
finished. That is why serious work uses checks like:

- type checking
- linting
- unit tests
- browser tests
- scenario evals
- release evidence

These tools do not replace judgment. They prevent confidence from pretending
to be proof.

## Why Evals Matter

Testing checks whether code passes. Evals check whether behavior is actually
useful, safe, truthful, recoverable, and aligned with the intended workflow.
Enterprise AI fails through bad routing, sycophancy, weak recovery, and false
confidence as often as it fails through syntax errors.

## What Students Need To Practice

- defining bounded scope before implementation
- preserving context in durable artifacts
- chunking work into units they can test
- setting acceptance criteria before saying "done"
- running verification before claiming success
- using evals to judge live behavior instead of trusting narrative confidence

## How This Deck Was Built With Exactly That Loop

This site was built spec-first. Every slide, page, and visualization on this
deck has a corresponding spec in `docs/_specs/`. A build script
(`scripts/build-data.ts`) generates every derived number from checked-in YAML;
a sources audit (`scripts/audit-sources.ts`) fails the build if any cited ID
is unknown; a doctrine audit (`scripts/audit-doctrine.ts`) fails the build if
any forbidden phrasing returns.

The whole control loop is:

```text
1. Read the spec.
2. Write code / copy against the spec.
3. Run: npm run typecheck && npm run build && npm run test
4. Run: npm run audit:sources && npm run audit:doctrine
5. If any step fails, fix and repeat — do not declare "done".
```

That is a small version of the workflow BSEAI graduates should recognize
immediately when they land in their first enterprise AI role.

## Links

- [Engineering English](/engineering-english) — language as a control surface
- [Managing Drift and Runtime Integrity](/managing-drift-and-runtime-integrity)
- [Sources registry (internal)](/about)

```cta
[Return to the presentation](/)
[Read the drift and runtime integrity handout](/managing-drift-and-runtime-integrity)
```

```source-line
convoSummaryExtract, secondRenaissanceEssay
```
