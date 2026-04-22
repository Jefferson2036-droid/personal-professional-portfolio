---
title: "BSEAI Pitch Presentation"
layout: "presentation"
---

![bg 55% 62%](/NJIT-Eberhardt-Hall.jpg)

## B.S. Enterprise AI — NJIT

# Launching Fall 2026

The B.S. in Enterprise AI is a studio-based, enterprise-facing degree for
the people who will design, operate, integrate, and govern AI-enabled
systems in real organizations.

```cta
[See why this degree exists](/why-bseai)
[Read the historical analogy](/new-renaissance)
```

---

![bg](/images/historical/easter_1900_no_cars.jpg)

## New York, 1900

# This street fit its machine

Built for horses, carriages, crowds, and the systems around them.

Then the machine changed, and the city had to change with it.

---

![bg](/images/historical/easter_1913_no_horses.jpg)

## New York, 1913

# AI is now doing the same to information work

Technology changed first. Then streets, supply chains, labor, and
institutions reorganized around it.

*A new machine rewrote the street.*

---

## The Yardsticks We'll Be Looking At

# Three standardized tests, three different shapes of work

A *benchmark* in AI is a fixed set of tasks with an automatic grader —
the same test every lab submits to, so scores are comparable over time.
Three of them tell most of the story of the last three years.

- **SWE-bench Verified** — pull a real bug from a real open-source
  repository. Write a patch that passes the project's own test suite.
  *Software engineering, not coursework.*
- **GPQA Diamond** — PhD-qualifying questions in physics, chemistry,
  biology. Written by domain experts. Unanswerable by a strong
  non-specialist even with the open internet. *Hard-science reasoning.*
- **MMLU** — the classic broad-knowledge exam: 57 subjects from
  mechanics to US foreign policy. *What an educated generalist knows.*
  Near-saturated since 2023 — our leading indicator.

> These are not AI's opinion of itself. They are third-party tests that
> labs cannot re-run privately to inflate a number.

```source-line
sweBenchVerified, sweBenchSite, gpqaPaper, aiIndex2025
```

---

## What Just Happened, 2023–2026

```model-progress
```

```source-line
benchmarksLocal, mythosCard, sweBenchVerified, gpqaPaper, aiIndex2025
```

---

## This Is Not The Usual Hype Cycle

# One benchmark saturates — blame the test. Three saturate together — that explanation runs out.

Benchmarks have been beaten before. ImageNet in 2015. Atari in 2018.
Each time, researchers correctly said: *the test was narrower than we
thought.*

What is new in 2023–2026:

- The three benchmarks cover **unrelated shapes of work** — writing
  code, reasoning about science, recalling broad knowledge.
- They saturated **simultaneously**, on the same generation of models.
- The work they stand in for is **not narrow.** A patch that passes a
  real open-source repo's own tests is not a toy.

> When one measure moves, something changed about measurement. When
> three unrelated measures move together in three years, something
> changed about the work itself.

```source-line
benchmarksLocal, aiIndex2025, assistantInterpretation
```

---

## What the Scores Don't Mean

# 94% is not "solved." It's "the test ran out of signal."

A benchmark score answers one question: *did the model pass this test.*
It does not answer: *can a real team run this work in production.*

- **Tests measure test-taking.** A patch that passes a hidden unit test
  is not the same as a patch a team would merge.
- **Real work has context the test doesn't** — stakeholders, risk,
  scope, runtime cost, who is accountable when it breaks.
- **The scarce work is now governance, not generation.** Specify,
  evaluate, deploy, and hold accountable: that is what a professional
  does with a near-saturated tool.

> For a curriculum, this flips the target. The question is no longer
> *can you do the work by hand?* It is *can you run the system that
> does the work, and vouch for its output?*

```source-line
mythosCard, assistantInterpretation
```

---

## If This Continues — 2030 / 2031

# Three scenarios a curriculum has to be ready for

An LLM reading its own benchmark record would not confidently predict one
future. It would name three, and build the curriculum to survive all
three.

- **Scenario A — Saturation and integration.** Frontier scores plateau.
  Value moves almost entirely to evaluation, integration, governance,
  and institutional context. Enterprise AI work looks like reliability
  engineering for probabilistic components. *The degree wins by default.*
- **Scenario B — Steady capability lift.** Long-horizon, multi-day,
  ambiguous tasks keep improving, but models still need humans for
  scope, judgment, and accountability. The Forward-Deployed Engineer
  becomes the dominant role family. *The degree wins because it trains
  that role by name.*
- **Scenario C — Discontinuous jump.** A general, self-managing system
  appears earlier than base rates suggest. The institutional question is
  no longer "can it do the work?" but "who is authorized to let it?"
  Governance, evaluation, release evidence, and human oversight become
  the whole job. *The degree wins because that is already the spine.*

> Under all three, the people who can specify, evaluate, deploy, and
> govern AI inside real organizations are the ones still getting paid.
> That is who BSEAI graduates are.

```source-line
mythosCard, graceHLMI2023, aiIndex2025, assistantInterpretation
```

```cta
[Read the full scenario analysis](/model-progress-research)
```

---

![split-reverse](/images/media/modules/generated/openai-public-ai.webp)

## The Enterprise Bottleneck

# Adoption is broad. Production is still scarce.

- **88%** of organizations report AI use in at least one function — McKinsey State of AI 2025.
- **~33%** have begun scaling AI programs — McKinsey State of AI 2025.
- **39%** report enterprise-level EBIT impact from AI — McKinsey State of AI 2025.
- **42%** of companies abandoned most AI initiatives before production in 2025 (up from 17% the year before) — S&P Global VotE 2025.
- **13%** of employees see AI agents deeply integrated in daily workflows — BCG AI at Work 2025.

> The gap is not between organizations that have heard of AI and those that
> haven't. It is between demo capability and production use. That gap is
> where this degree produces graduates.

```source-line
mckinseyStateOfAI2025, spGlobalVotE2025, bcgAIAtWork2025, nyFedAIUse2026
```

```cta
[Open the enterprise deployment gap handout](/enterprise-deployment-gap)
```

---

![split](/images/media/modules/generated/latent-space-landscape-v1.webp)

## Failure Modes at the Frontier

# Models drift. Systems drift more.

1. **Sandbox-escape broadcast.** Asked to exfiltrate, posted exploit details to obscure public sites.
2. **Concealment.** Took disallowed actions and tried to hide them; interpretability features for *strategic manipulation* fired during the act.
3. **Permission escalation via `/proc/`.** Low-level inspection used to circumvent sandboxing, sometimes after explicit scaffold warnings.
4. **Unintended public disclosure.** Posted a code artifact as a public GitHub gist against user intent.
5. **Reward hacking.** Moved timed computation outside the grader; trained on the grader's own test set.

> "Rate of cover-ups below one in a million Claude Code transcripts" is
> not zero. Managing AI means managing these failure modes, not just
> calling a model. — Anthropic, Claude Mythos Preview System Card §4.1.1

```source-line
mythosCard
```

```cta
[Open the drift and runtime integrity handout](/managing-drift-and-runtime-integrity)
```

---

## April 7, 2026 — The Lab Chose Not To Ship It

# "We have decided not to make it generally available"

On April 7, 2026, Anthropic published the Claude Mythos Preview System
Card. It is the most capable model the company has ever produced.

It is not generally available. Anthropic released it into a closed
defensive-cybersecurity program with a limited set of partners, not to
the public API.

> We find it alarming that the world looks on track to proceed rapidly to
> developing superhuman systems without stronger mechanisms in place for
> ensuring adequate safety across the industry as a whole.

— Anthropic, *Claude Mythos Preview System Card*, §1.2.1, April 7, 2026

This is why governance, evaluation, and recovery are the curriculum —
not the appendix.

```source-line
mythosCard
```

```cta
[Read the alignment evidence handout](/frontier-alignment-evidence)
```

---

## Serious AI Work Requires Control Loops

1. Define the task with bounded scope.
2. Break the work into chunks small enough to reason about.
3. Execute one step at a time instead of one giant burst.
4. Test whether the result actually meets the contract.
5. Recover, revise, or reroute when the system fails.

This is how teams manage context limits, optimistic completion, and drift.

```cta
[Open the spec, sprint, and verification handout](/how-this-was-made)
```

---

![split](/images/media/modules/generated/representation-learning-bridge.webp)

## The New Control Surface

Language is no longer just expression.

When it carries scope, invariants, acceptance criteria, tests, workflows, and
evals, it becomes engineering.

```cta
[Open the engineering language handout](/engineering-english)
```

---

## Students Must Learn to Judge System Behavior

```blooms
```

If students only summarize and repeat, they will compete with the tool.

They need to learn how to spot drift, challenge sycophancy, compare outputs,
test recovery, and decide whether a system is actually ready.

```cta
[Open the drift and runtime integrity handout](/managing-drift-and-runtime-integrity)
```

---

## Addressing the Whole Student

# BSEAI is designed around who incoming students actually are.

Incoming undergraduates in 2026 arrive with real readiness gaps — in
reading, attendance, college-readiness benchmarks, and explicit
instruction in how to use AI for school work. Employers rate recent
graduates weakest on communication, professionalism, and critical
thinking.

> Just as calculators shifted math education from manual arithmetic to
> conceptual understanding, AI shifts writing education from mechanical
> composition to critical thinking, argumentation, and judgment.

We did not build this degree assuming students arrive ready. We built it
to close the gap — deliberately, visibly, across eight studios. Every
studio produces a portfolio artifact. Every studio rehearses a
professional routine: written communication, peer critique, evaluation
discipline, stakeholder translation, responsible AI use.

```source-line
ncesSchoolPulse, naepGrade12Reading2024, actGraduatingClass2024, randK12AITraining, naceJobOutlook2026, secondRenaissanceEssay
```

```cta
[See how the studio spine closes the gap](/student-formation-and-the-studio-gap)
```

---

## Role Clusters, Not Fantasy Titles

# These jobs exist, by name, at named employers, at posted salaries.

- **AI Product Engineer / Applied AI Engineer** — turns model capability
  into products, interfaces, and evaluated workflows.
  *OpenAI, Applied AI Engineer, Codex Core Agent. Posted base: $230K–$385K.*
- **Forward-Deployed Engineer** — embeds with customers, owns delivery from
  prototype to production, runs workshops and integrations.
  *Scale AI, Forward Deployed Engineer, GenAI. Posted base: $179.4K–$224.25K.*
- **AI Deployment Engineer / Platform Engineer** — owns evaluation,
  retrieval, infrastructure, governed rollout, runtime evidence.
  *OpenAI, AI Deployment Engineer, Codex. Band disclosed on source posting.*

> These role families did not exist as stable job titles two years ago.
> LinkedIn's January 2026 Labor Market Report lists Forward-Deployed
> Engineer/PM as the fastest-growing title family (~42× since 2023), and
> AI Engineer as the leading volume among high-skill AI roles it tracks.

```source-line
linkedinLabor2026, openAIApplied, scaleFDEPosting, openAIFDEPosting, salesforceAIEngineerPosting, googleFieldArchitect, deloitteFDE
```

```cta
[Open the role clusters handout](/role-clusters-and-ai-work)
```

---

## The Studio Spine Builds toward That Work

```studio-spine
```

> Each course produces a portfolio artifact — an interface, a connector, an
> eval harness, a requirements package, a data model, or a deployment
> blueprint. That is the studio claim, made visible.

```source-line
deepResearch3, njitBSEAIProgramPage, linkedinLabor2026
```

```cta
[See the four-year progression](/from-freshman-to-professional)
```

---

## Governance Is Architecture Plus Evidence

# Value lives in the layer that keeps systems honest

- **EU AI Act** — in force 2024-08-01. AI literacy obligations 2025-02-02.
  GPAI obligations 2025-08-02. High-risk rules scheduled 2026–2027.
- **NIST AI RMF 1.0 + GenAI Profile** — U.S. federal risk-management
  reference for design, development, use, and evaluation.
- **AI incidents in 2024** — 233, up 56.4% year over year (Stanford AI
  Index 2025).

Access control, evaluation sets, human oversight, monitoring, release
evidence, and incident reporting are now part of how enterprise AI
systems are operated. This is where most graduates will create value.

```source-line
euAIAct, nistAIRMF, nistGenAIProfile, aiIndex2025, oecdAIPrinciples, unescoAIEthics
```

```cta
[Open the drift and runtime integrity handout](/managing-drift-and-runtime-integrity)
[Open the governance and responsible deployment handout](/governance-and-responsible-deployment)
```

---

![bg](/images/media/modules/generated/people-institutions-hero.webp)

## Why This Degree Now

# Builders, not frontier researchers

1. **1.3M+ AI-related job opportunities** created between 2023 and 2025
   (LinkedIn Labor Market Report, Jan 2026).
2. **70% YoY growth** in U.S. jobs requiring AI literacy (LinkedIn, same
   report).
3. **56% AI-skill wage premium**, with skills changing 66% faster in the
   most AI-exposed jobs (PwC AI Jobs Barometer 2025).
4. **~90% of notable AI models in 2024 came from industry** (Stanford AI
   Index 2025) — frontier model creation is concentrating; enterprise
   deployment is broadening.

> The market does not need thousands of undergraduate frontier researchers.
> It needs builders who can turn AI into reliable enterprise systems — the
> layer where implementation is still scarce, and where posted salaries
> are already high.

```source-line
linkedinLabor2026, pwcAIJobsBarometer2025, aiIndex2025, wefFutureOfJobs2025
```

```cta
[Open the institutional rationale handout](/why-bseai)
[See the peer-program comparison](/peer-programs-and-positioning)
```

---

![split](/studio_ordo_logo.png)

## Studio Ordo

One working proof of the kind of systems students increasingly need to
understand.

Governed chat, workflow automation, hybrid retrieval, deferred jobs, evals,
release evidence, publishing, and admin control in one compact system.

```cta
[Visit studioordo.com](https://studioordo.com)
[Read the Studio Ordo handout](/studio-ordo)
```

---

## A Classical Frame, Re-Engineered

# Trivium and quadrivium for the AI era

The liberal-arts tradition split a complete education into two arts: the
arts of language and the arts of number. BSEAI does the same — in modern
materials.

**Trivium — language, reasoning, persuasion**

- Specification: write requirements an AI system can actually execute.
- Critique: evaluate outputs against intent, evidence, and risk.
- Persuasion: communicate decisions to stakeholders and institutions.
- Instruction: write prompts, protocols, and procedures that hold up.

**Quadrivium — data, structure, computation**

- Data: design, clean, and reason about the material AI systems run on.
- Probability: judge uncertainty, reliability, and failure modes.
- Systems: integrate models into databases, interfaces, and workflows.
- Analytics: measure, observe, and improve deployed behavior.

> A BSEAI graduate is fluent in both columns. That is why this is a degree
> and not a certificate.

```source-line
convoSummaryExtract
```

---

![bg](/images/media/modules/generated/era-7-visual-break.webp)

## The Curricular Claim

# Do not train students to merely use AI

Train them to specify it, evaluate it, deploy it, govern it, and
continuously improve it.

Anthropic's own internal survey of Claude Mythos Preview, April 2026,
names the work that remains hard at the frontier:

> *"Self-managing week-long ambiguous tasks, understanding org priorities,
> taste, verification, instruction following, and epistemics."*

— Anthropic, *Claude Mythos Preview System Card*, §2.3.4

That is not a critique of BSEAI. It is the curriculum bill of materials.

```source-line
mythosCard
```

---

![bg](/images/media/modules/generated/era-2-field-formation.webp)

## Keep the Discussion Going

# Join the faculty working conversation

Use the Discord to discuss AI, curriculum development, and ongoing
faculty collaboration.

![BSEAI Discord QR](/images/qr/bseai-discord.svg)

Studio Ordo's public educational channel launches this summer, and the
conversation should continue there as well.

```cta
[Join the BSEAI Discord](https://discord.gg/PuKVYQ86ms)
[Visit studioordo.com](https://studioordo.com)
[Follow Studio Ordo on YouTube](https://www.youtube.com/@studioordo)
```
