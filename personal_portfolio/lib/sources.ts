/**
 * Authoritative citation registry.
 *
 * Every source ID used anywhere on the site MUST appear here.
 * The canonical spec is docs/_specs/site/03-sources-registry.md —
 * if you are adding a new source, edit that file first, then mirror here.
 *
 * URLs marked "TBD" must be resolved before the source is cited in
 * shipped copy. `scripts/audit-sources.ts` fails the build if any
 * shipped <SourceLine> references a TBD source unless the ID is in
 * `scripts/audit-sources.allowlist.ts`.
 */

export type SourceKind =
  | "primary-institutional"
  | "primary-archival"
  | "industry-report"
  | "peer-reviewed"
  | "preprint-or-report"
  | "news"
  | "primary-vendor"
  | "benchmark-local"
  | "internal-doctrine"
  | "internal-author";

export interface Source {
  id: string;
  kind: SourceKind;
  label: string;
  url: string;
  publishedAt?: string; // ISO date when known
}

export const sources = {
  // ---------- primary-institutional ----------
  njitBSEAIProgramPage: {
    id: "njitBSEAIProgramPage",
    kind: "primary-institutional",
    label: "NJIT — B.S. in Enterprise AI program page",
    url: "https://informatics.njit.edu/bs-enterprise-ai",
  },
  stevensAIProgram: {
    id: "stevensAIProgram",
    kind: "primary-institutional",
    label: "Stevens Institute — B.S. in Artificial Intelligence",
    url: "TBD",
  },
  paceAIProgram: {
    id: "paceAIProgram",
    kind: "primary-institutional",
    label: "Pace University — B.S. in Artificial Intelligence",
    url: "TBD",
  },
  keanAIProgram: {
    id: "keanAIProgram",
    kind: "primary-institutional",
    label: "Kean University — B.S. in Artificial Intelligence",
    url: "TBD",
  },
  pennStateAIMAProgram: {
    id: "pennStateAIMAProgram",
    kind: "primary-institutional",
    label: "Penn State — B.S. in AI Methods and Applications",
    url: "TBD",
  },
  pennStateAIEngineeringProgram: {
    id: "pennStateAIEngineeringProgram",
    kind: "primary-institutional",
    label: "Penn State — B.S. in AI Engineering",
    url: "TBD",
  },
  upennAIProgram: {
    id: "upennAIProgram",
    kind: "primary-institutional",
    label: "UPenn — B.S.E. in Artificial Intelligence",
    url: "TBD",
  },

  // ---------- primary-archival ----------
  locEaster1900: {
    id: "locEaster1900",
    kind: "primary-archival",
    label: "Library of Congress — Fifth Ave Easter 1900 (item 2016803108)",
    url: "https://www.loc.gov/item/2016803108/",
    publishedAt: "1900-04-15",
  },
  locEaster1913: {
    id: "locEaster1913",
    kind: "primary-archival",
    label: "Library of Congress — Fifth Ave Easter 1913 (item 2014691099)",
    url: "https://www.loc.gov/item/2014691099/",
    publishedAt: "1913-03-23",
  },

  // ---------- industry-report ----------
  aiIndex2025: {
    id: "aiIndex2025",
    kind: "industry-report",
    label: "Stanford HAI — AI Index Report 2025",
    url: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
    publishedAt: "2025-04-07",
  },
  mckinseyStateOfAI2025: {
    id: "mckinseyStateOfAI2025",
    kind: "industry-report",
    label: "McKinsey — State of AI 2025",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
  },
  mckinseyEconomicPotentialGenAI: {
    id: "mckinseyEconomicPotentialGenAI",
    kind: "industry-report",
    label: "McKinsey — Economic Potential of Generative AI",
    url: "https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier",
  },
  deloitteStateOfGenAI2024: {
    id: "deloitteStateOfGenAI2024",
    kind: "industry-report",
    label: "Deloitte — State of Generative AI in the Enterprise 2024",
    url: "https://www.deloitte.com/az/en/issues/generative-ai/state-of-generative-ai-in-enterprise.html",
  },
  bcgAIAtWork2025: {
    id: "bcgAIAtWork2025",
    kind: "industry-report",
    label: "BCG — AI at Work 2025",
    url: "TBD",
  },
  spGlobalVotE2025: {
    id: "spGlobalVotE2025",
    kind: "industry-report",
    label: "S&P Global — 2025 Voice of the Enterprise (AI)",
    url: "TBD",
  },
  mitSloanLastMile: {
    id: "mitSloanLastMile",
    kind: "industry-report",
    label: "MIT Sloan — AI \"Last Mile\" synthesis",
    url: "TBD",
  },
  wefFutureOfJobs2025: {
    id: "wefFutureOfJobs2025",
    kind: "industry-report",
    label: "WEF — Future of Jobs Report 2025",
    url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/",
  },
  linkedinLabor2026: {
    id: "linkedinLabor2026",
    kind: "industry-report",
    label: "LinkedIn Economic Graph — Work Change Report (Jan 2026)",
    url: "https://economicgraph.linkedin.com/research/work-change-report",
  },
  pwcAIJobsBarometer2025: {
    id: "pwcAIJobsBarometer2025",
    kind: "industry-report",
    label: "PwC — AI Jobs Barometer 2025",
    url: "https://www.pwc.com/gx/en/services/ai/ai-jobs-barometer.html",
  },
  goldmanSachsGenAIGDP: {
    id: "goldmanSachsGenAIGDP",
    kind: "industry-report",
    label: "Goldman Sachs — Generative AI GDP forecast",
    url: "TBD",
  },
  naceJobOutlook2026: {
    id: "naceJobOutlook2026",
    kind: "industry-report",
    label: "NACE — Job Outlook 2026",
    url: "TBD",
  },
  naceJobOutlook2025: {
    id: "naceJobOutlook2025",
    kind: "industry-report",
    label: "NACE — Job Outlook 2025 (employer values)",
    url: "TBD",
  },
  gallupAIWorkplace: {
    id: "gallupAIWorkplace",
    kind: "industry-report",
    label: "Gallup — AI at work data",
    url: "TBD",
  },
  nyFedAIUse2026: {
    id: "nyFedAIUse2026",
    kind: "industry-report",
    label: "NY Fed — AI at work survey (2026)",
    url: "TBD",
  },
  indeedAITracker: {
    id: "indeedAITracker",
    kind: "industry-report",
    label: "Indeed Hiring Lab — AI mentions tracker",
    url: "https://www.hiringlab.org/",
  },
  lightcastRegionalAI2025: {
    id: "lightcastRegionalAI2025",
    kind: "industry-report",
    label: "Lightcast — Regional AI job postings (NY/NJ/PA rollup, 2025)",
    url: "TBD",
  },
  njLwdProjections: {
    id: "njLwdProjections",
    kind: "primary-institutional",
    label: "NJ Dept. of Labor and Workforce Development — Occupational projections",
    url: "https://www.nj.gov/labor/labormarketinformation/employment-wages/occupational-projections/",
  },
  nysdolProjections: {
    id: "nysdolProjections",
    kind: "primary-institutional",
    label: "NY State Dept. of Labor — Occupational projections",
    url: "https://dol.ny.gov/occupational-projections",
  },
  paLiProjections: {
    id: "paLiProjections",
    kind: "primary-institutional",
    label: "PA Dept. of Labor and Industry — Occupational projections",
    url: "https://www.workstats.dli.pa.gov/Products/Projections/",
  },
  blsOesMetro: {
    id: "blsOesMetro",
    kind: "primary-institutional",
    label: "BLS — Occupational Employment and Wage Statistics (metro)",
    url: "https://www.bls.gov/oes/tables.htm",
  },
  linkedinEconomicGraphRegional: {
    id: "linkedinEconomicGraphRegional",
    kind: "industry-report",
    label: "LinkedIn Economic Graph — Regional cuts (public reports)",
    url: "https://economicgraph.linkedin.com/",
  },

  // ---------- peer-reviewed ----------
  brynjolfssonLiRaymond: {
    id: "brynjolfssonLiRaymond",
    kind: "peer-reviewed",
    label: "Brynjolfsson, Li, Raymond — Generative AI at Work (QJE 2025)",
    url: "TBD",
  },
  noyZhang2023: {
    id: "noyZhang2023",
    kind: "peer-reviewed",
    label: "Noy & Zhang — Science 2023 professional-writing study",
    url: "TBD",
  },
  brynjolfssonRockSyverson: {
    id: "brynjolfssonRockSyverson",
    kind: "peer-reviewed",
    label: "Brynjolfsson, Rock, Syverson — Productivity J-Curve",
    url: "TBD",
  },
  graceHLMI2023: {
    id: "graceHLMI2023",
    kind: "peer-reviewed",
    label: "Grace et al. — 2023 Expert Survey on AI Progress",
    url: "TBD",
  },

  // ---------- preprint-or-report ----------
  ncesSchoolPulse: {
    id: "ncesSchoolPulse",
    kind: "preprint-or-report",
    label: "NCES — School Pulse Panel (2024–25 grade-level data)",
    url: "TBD",
  },
  edChronicAbsenteeism: {
    id: "edChronicAbsenteeism",
    kind: "preprint-or-report",
    label: "U.S. Dept. of Education — Chronic absenteeism data",
    url: "TBD",
  },
  naepGrade12Reading2024: {
    id: "naepGrade12Reading2024",
    kind: "preprint-or-report",
    label: "NAEP — Grade 12 Reading 2024",
    url: "TBD",
  },
  actGraduatingClass2024: {
    id: "actGraduatingClass2024",
    kind: "preprint-or-report",
    label: "ACT — 2024 Graduating Class National Report",
    url: "TBD",
  },
  randK12AITraining: {
    id: "randK12AITraining",
    kind: "preprint-or-report",
    label: "RAND RRA4180-1 — K–12 AI Instruction",
    url: "TBD",
  },
  randK12AIPolicy: {
    id: "randK12AIPolicy",
    kind: "preprint-or-report",
    label: "RAND RRA956-31 — K–12 AI Policy",
    url: "TBD",
  },
  acmAISIS2020: {
    id: "acmAISIS2020",
    kind: "preprint-or-report",
    label: "ACM/AIS — IS2020 Curriculum Guidelines",
    url: "TBD",
  },
  acmCC2020: {
    id: "acmCC2020",
    kind: "preprint-or-report",
    label: "ACM/IEEE — Computing Curricula 2020 (CC2020)",
    url: "TBD",
  },
  acmCS2023: {
    id: "acmCS2023",
    kind: "preprint-or-report",
    label: "ACM — CS2023 Curriculum",
    url: "TBD",
  },
  abetComputingCriteria: {
    id: "abetComputingCriteria",
    kind: "preprint-or-report",
    label: "ABET — 2025–26 Computing Accreditation Criteria",
    url: "TBD",
  },
  nistAIRMF: {
    id: "nistAIRMF",
    kind: "preprint-or-report",
    label: "NIST — AI Risk Management Framework 1.0",
    url: "https://www.nist.gov/itl/ai-risk-management-framework",
  },
  nistGenAIProfile: {
    id: "nistGenAIProfile",
    kind: "preprint-or-report",
    label: "NIST — Generative AI Profile (AI 600-1)",
    url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
  },
  oecdAIPrinciples: {
    id: "oecdAIPrinciples",
    kind: "preprint-or-report",
    label: "OECD — AI Principles",
    url: "https://oecd.ai/en/ai-principles",
  },
  unescoAIEthics: {
    id: "unescoAIEthics",
    kind: "preprint-or-report",
    label: "UNESCO — Recommendation on the Ethics of AI",
    url: "https://www.unesco.org/en/articles/recommendation-ethics-artificial-intelligence",
  },
  unescoAIEducation: {
    id: "unescoAIEducation",
    kind: "preprint-or-report",
    label: "UNESCO — Guidance on GenAI in Education (2023)",
    url: "TBD",
  },
  euAIAct: {
    id: "euAIAct",
    kind: "preprint-or-report",
    label: "EU — Artificial Intelligence Act",
    url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
  },
  intlAISafetyReport2025: {
    id: "intlAISafetyReport2025",
    kind: "preprint-or-report",
    label: "International AI Safety Report 2025",
    url: "TBD",
  },
  imfAIBlogJan2024: {
    id: "imfAIBlogJan2024",
    kind: "preprint-or-report",
    label: "IMF — AI and the global economy (Jan 2024 blog)",
    url: "https://www.imf.org/en/blogs/articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity",
  },

  // ---------- primary-vendor ----------
  mythosCard: {
    id: "mythosCard",
    kind: "primary-vendor",
    label: "Anthropic — Claude Mythos Preview System Card (Apr 7 2026)",
    url: "TBD",
    publishedAt: "2026-04-07",
  },
  sweBenchVerified: {
    id: "sweBenchVerified",
    kind: "primary-vendor",
    label: "SWE-bench Verified leaderboard",
    url: "https://www.swebench.com/verified.html",
  },
  sweBenchSite: {
    id: "sweBenchSite",
    kind: "primary-vendor",
    label: "SWE-bench — site & leaderboard",
    url: "https://www.swebench.com/",
  },
  gpqaPaper: {
    id: "gpqaPaper",
    kind: "peer-reviewed",
    label: "Rein et al. — GPQA: A Graduate-Level Google-Proof Q&A Benchmark",
    url: "https://arxiv.org/abs/2311.12022",
  },
  openAIGpt4Report: {
    id: "openAIGpt4Report",
    kind: "primary-vendor",
    label: "OpenAI — GPT-4 Technical Report",
    url: "https://arxiv.org/abs/2303.08774",
  },
  openAIApplied: {
    id: "openAIApplied",
    kind: "primary-vendor",
    label: "OpenAI — Applied AI Engineer, Codex Core Agent (posting)",
    url: "TBD",
  },
  openAIFDEPosting: {
    id: "openAIFDEPosting",
    kind: "primary-vendor",
    label: "OpenAI — AI Deployment Engineer, Codex (posting)",
    url: "TBD",
  },
  scaleFDEPosting: {
    id: "scaleFDEPosting",
    kind: "primary-vendor",
    label: "Scale AI — Forward Deployed Engineer, GenAI (posting)",
    url: "TBD",
  },
  salesforceAIEngineerPosting: {
    id: "salesforceAIEngineerPosting",
    kind: "primary-vendor",
    label: "Salesforce — AI Engineer (posting)",
    url: "TBD",
  },
  googleFieldArchitect: {
    id: "googleFieldArchitect",
    kind: "primary-vendor",
    label: "Google — AI Field Solutions Architect (posting)",
    url: "TBD",
  },
  deloitteFDE: {
    id: "deloitteFDE",
    kind: "primary-vendor",
    label: "Deloitte — Forward Deployed Engineer (posting)",
    url: "TBD",
  },

  // ---------- news ----------
  reutersChatGPT100M: {
    id: "reutersChatGPT100M",
    kind: "news",
    label: "Reuters — ChatGPT reaches 100M MAUs in two months",
    url: "TBD",
  },
  timeGPT4BarExam: {
    id: "timeGPT4BarExam",
    kind: "news",
    label: "TIME — GPT-4 bar exam performance",
    url: "TBD",
  },

  // ---------- benchmark-local ----------
  benchmarksLocal: {
    id: "benchmarksLocal",
    kind: "benchmark-local",
    label: "Repo — docs/_references/benchmarks.md",
    url: "/model-progress-research",
  },

  // ---------- internal-doctrine ----------
  convoSummaryExtract: {
    id: "convoSummaryExtract",
    kind: "internal-doctrine",
    label: "Internal — Convo Summary Extract (positioning doctrine)",
    url: "/docs/_references/convo-summary-extract.md",
  },
  deepResearch3: {
    id: "deepResearch3",
    kind: "internal-doctrine",
    label: "Internal — Deep Research Report 3 (education pipeline + employer skills)",
    url: "/docs/_references/deep-research-report-3.md",
  },
  assistantInterpretation: {
    id: "assistantInterpretation",
    kind: "internal-author",
    label: "Author analysis — normalized rate calculations over primary-source milestones",
    url: "/docs/_references/benchmarks.md",
  },

  // ---------- internal-author ----------
  aboutmeBio: {
    id: "aboutmeBio",
    kind: "internal-author",
    label: "Author bio — NJIT, 2002–2026",
    url: "/docs/_references/aboutme.md",
  },
  secondRenaissanceEssay: {
    id: "secondRenaissanceEssay",
    kind: "internal-author",
    label: "Author essay — \"From the First Renaissance to a Second Renaissance\"",
    url: "/docs/_references/2ndren.md",
  },
} as const satisfies Record<string, Source>;

export type SourceId = keyof typeof sources;

export function getSource(id: string): Source | undefined {
  return (sources as Record<string, Source>)[id];
}

export function hasSource(id: string): id is SourceId {
  return id in sources;
}
