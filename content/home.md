---
title: "BSEAI Pitch Presentation"
layout: "presentation"
---

![bg 55% 62%](/NJIT-Eberhardt-Hall.jpg)

## B.S. Enterprise AI — NJIT

# Launching Fall 2026

*A first draft of an engineering degree for the age of judgment.*

The B.S. in Enterprise AI is a studio-based, enterprise-facing degree for
the people who will design, operate, integrate, and govern AI-enabled
systems in real organizations.

*By Keith Williams, Senior University Lecturer at NJIT. Twenty-three
years in the classroom. Uses AI to build every day.*

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

Three public benchmarks, three unrelated kinds of work. Each point
below is the **best publicly reported score** from a frontier lab
(OpenAI, Anthropic, Google, DeepSeek) at the end of that year.

- **SWE-bench Verified** — the model is handed a real GitHub issue
  from a real open-source repo and must write a patch that passes the
  project's own hidden unit tests.
- **GPQA Diamond** — hard-science graduate-level multiple-choice
  questions in physics, biology, and chemistry, designed to be
  Google-resistant.
- **MMLU** — broad knowledge across 57 academic and professional
  subjects, the longstanding "general intelligence" yardstick.

The horizontal band at 90% is where further gains stop separating
models. All three are inside it.

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

## The Real Shift Isn't Skills. It's the Ratio.

# 40% skill · 60% judgment

AI collapses the price of skill. It raises the price of judgment, taste,
and the habit of learning.

A degree for this decade has to change the ratio — deliberately,
visibly, in every studio.

> Skill is the carrier wave. Human formation is the signal.
> BSEAI is engineered around that inversion.

---

## You Don't Race a Bugatti on Foot

# Frontier models are fast at implementation over short horizons. That is their Bugatti.

Trying to out-code, out-type, or out-implement a frontier model on the
things it is good at is a career mistake. That race is already lost,
for everyone, and it was never the race that mattered.

The work is not racing the machine. The work is **driving** it:

- **Specifying** where it goes — scope, intent, acceptance.
- **Evaluating** whether it got there — evidence, tests, judgment.
- **Governing** what it's allowed to do — guardrails, oversight, accountability.
- **Steering** when it drifts — recovery, revision, stop conditions.

> BSEAI does not train students to race the Bugatti.
> It trains them to drive it, know when it's lying about fuel, and
> know when to get out and walk.

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

![split-reverse](/images/media/modules/generated/openai-public-ai.webp)

## The Enterprise Bottleneck

# Adoption is broad. Production is still scarce.

- **88%** of organizations report AI use in at least one function.
- **42%** abandoned most AI initiatives before production in 2025 — up from 17% the year before.
- **13%** of employees see AI agents deeply integrated in daily workflows.

> The gap is not between who has heard of AI and who hasn't. It is
> between demo capability and production use. That is where this
> degree produces graduates.

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

From the April 7, 2026 Claude Mythos Preview System Card — Anthropic's
most capable model, held back from the public API:

1. **Sandbox escape.** Asked to exfiltrate, posted exploit details publicly.
2. **Concealment.** Hid disallowed actions; *strategic manipulation* features fired during the act.
3. **Reward hacking.** Moved timed computation outside the grader; trained on its test set.

> We find it alarming that the world looks on track to develop
> superhuman systems without stronger mechanisms for adequate safety.
>
> — Anthropic, *Claude Mythos Preview System Card*, April 2026

Governance, evaluation, and recovery are the curriculum — not the appendix.

```source-line
mythosCard
```

```cta
[Read the alignment evidence handout](/frontier-alignment-evidence)
[Open the drift and runtime integrity handout](/managing-drift-and-runtime-integrity)
```

---

![split](/images/media/modules/generated/representation-learning-bridge.webp)

## Serious AI Work Requires Control Loops

# Language is no longer just expression. When it carries scope, tests, and evals, it becomes engineering.

1. Define the task with bounded scope.
2. Break the work into chunks small enough to reason about.
3. Execute one step at a time instead of one giant burst.
4. Test whether the result actually meets the contract.
5. Recover, revise, or reroute when the system fails.

This is how teams manage context limits, optimistic completion, and
drift — and it is why engineering English is not a joke. Scope,
invariants, acceptance criteria, tests, workflows, and evals are now
written in language that a machine will execute exactly as specified.

```cta
[Open the spec, sprint, and verification handout](/how-this-was-made)
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

## Inquiry Is the Method

# The 60% is built one good question at a time

The degree is organized around **asking** — of AI, of stakeholders, of
data, of self. A student who asks good questions does the 60% every
time they open their mouth or their keyboard.

That is why **IS 117 — Web Development and Inquiry** is now the first
course. The habit is set where habits get set: at the beginning.

- **Inquiry of AI** — prompt, probe, challenge, verify. Treat model
  output as a draft, not a verdict.
- **Inquiry of stakeholders** — what does the person actually need, and
  what are they not saying?
- **Inquiry of data** — what is this measurement really measuring, and
  what is it missing?
- **Inquiry of self** — what am I assuming, and what would change my
  mind?

> Eight studios. One portfolio. A visible record of a student's
> questions getting sharper over four years.
>
> That portfolio — not the tool of the moment — is what graduates
> carry into the workforce.

---

## The Studio Spine Builds toward That Work

# The studios are where the 60% gets built

```studio-spine
```

> Each course produces a portfolio artifact — an interface, a connector, an
> eval harness, a requirements package, a data model, or a deployment
> blueprint. Across eight studios, those artifacts become a record of a
> student's inquiry maturing. The portfolio is the claim, made visible.

```source-line
deepResearch3, njitBSEAIProgramPage, linkedinLabor2026
```

```cta
[See the four-year progression](/from-freshman-to-professional)
```

---

## Governance Is Architecture Plus Evidence

# The frameworks graduates will actually read

Governance is not paperwork. It is the *architecture* that decides
what an AI system is allowed to do, plus the *evidence* that it did
what it was supposed to.

- **EU AI Act** — the world's first comprehensive AI law. In force
  August 2024. Any U.S. company with European customers is already
  inside its scope.
- **NIST AI RMF 1.0 + GenAI Profile** — the U.S. federal blueprint
  enterprise buyers and insurers now demand as evidence of responsible
  practice.
- **OECD AI Principles · UNESCO AI Ethics** — the international norms
  multinationals and universities align procurement and research to.

> In 2026, responsible AI practice is no longer a preference.
> It is a procurement requirement.

```source-line
euAIAct, nistAIRMF, nistGenAIProfile, oecdAIPrinciples, unescoAIEthics
```

---

## What That Becomes Day to Day

# Six practices. One job family.

- **Access control** — who (or what) is allowed to call this model, with what data, under what conditions.
- **Evaluation sets** — the tests a system must pass before release, and re-pass on every update.
- **Human oversight** — the points in the workflow where a person must review, approve, or override.
- **Monitoring and drift detection** — telemetry that catches behavior change before users do.
- **Release evidence** — the documented record that a system met its bar. What auditors, regulators, and enterprise buyers actually ask for.
- **Incident reporting** — the process when something goes wrong. **233 AI incidents were logged in 2024, up 56.4% year over year.** The curve is still climbing.

> Graduates who can stand up this layer — specify it, build it,
> instrument it, produce the evidence it requires — are the ones
> enterprises cannot hire fast enough.

```source-line
aiIndex2025, nistAIRMF, nistGenAIProfile
```

```cta
[Open the drift and runtime integrity handout](/managing-drift-and-runtime-integrity)
[Open the governance and responsible deployment handout](/governance-and-responsible-deployment)
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

## Who's Enrolling

# 100+ majors, first semester, Fall 2026

They chose an engineering degree that takes human formation seriously.

They are arriving with the readiness gaps every IT department is
seeing — and with an appetite for work that matters. The studio spine
is built for who they actually are, not who we wish they were.

> The first cohort is already enrolled. The question at the retreat is
> no longer *should we build this.* It is *what does our department
> become now that it exists.*

---

## Three Things I Learned Building This

# A field report from twenty-three years of teaching and a year of building with AI every day

1. **AI shifts economic value from skill to human quality.** The
   curriculum has to shift the ratio — 40/60 — or it is obsolete on
   delivery. Every syllabus is now a wager about which side of that
   ratio you are training for.
2. **Autodidacts are not told into existence. They are formed.** By
   studios where the only way through is to learn something no one
   assigned. You cannot lecture someone into independent learning. You
   can only design the room they learn it in.
3. **The next draft of this degree will be written with humanities and
   business colleagues — not around them.** The lunchroom conversations
   are where the second draft is already starting. Judgment, taste,
   ethics, and stakeholder translation are not electives to this work.
   They are the work.

---

## An Open Invitation

# Start a conversation

If any of this resonates — or if it gets something wrong — I'd like to
hear from you.

Whatever your field, whatever your role: what do you think a graduate
entering this decade actually needs to become? Not what we test for —
what you believe makes someone educated for the work ahead.

This is a first draft. It will be wrong in ways I cannot see from
where I'm standing. It gets better every time someone from outside
makes it better.

**Join the Discord.** That's the room where the second draft gets
written — async, low-stakes, open to anyone thinking about these
questions.

```cta
[Join the Discord](https://discord.gg/PuKVYQ86ms)
```

---

![bg](/images/media/modules/generated/era-2-field-formation.webp)

## Help Me Write the Second Draft

# The conversation continues

This first draft shipped with a 100+ student cohort. The second draft
gets written with colleagues across the university — and with anyone
reading this who wants to build the age of judgment with us.

![BSEAI Discord QR](/images/qr/bseai-discord.svg)

Join the faculty Discord. Visit Studio Ordo. Bring your discipline to
the studios.

```cta
[Join the BSEAI Discord](https://discord.gg/PuKVYQ86ms)
[Read about the author](/author)
[Visit studioordo.com](https://studioordo.com)
```
