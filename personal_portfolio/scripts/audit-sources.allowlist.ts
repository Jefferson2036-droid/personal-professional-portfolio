/**
 * Source IDs whose url is still "TBD" but are cited in draft/spec
 * content. Expand sparingly; the goal is to resolve every URL before
 * launch. Spec: docs/_specs/site/04-verification-and-prereqs.md §C2.
 */
export const allowlist = new Set<string>([
  // Draft-stage peer programs — URLs resolved in phase 3.
  "stevensAIProgram",
  "paceAIProgram",
  "keanAIProgram",
  "pennStateAIMAProgram",
  "pennStateAIEngineeringProgram",
  "upennAIProgram",
  // Research sources with known-good canonical URLs not yet transcribed.
  "bcgAIAtWork2025",
  "spGlobalVotE2025",
  "mitSloanLastMile",
  "goldmanSachsGenAIGDP",
  "naceJobOutlook2026",
  "naceJobOutlook2025",
  "gallupAIWorkplace",
  "nyFedAIUse2026",
  "brynjolfssonLiRaymond",
  "noyZhang2023",
  "brynjolfssonRockSyverson",
  "graceHLMI2023",
  "ncesSchoolPulse",
  "edChronicAbsenteeism",
  "naepGrade12Reading2024",
  "actGraduatingClass2024",
  "randK12AITraining",
  "randK12AIPolicy",
  "acmAISIS2020",
  "acmCC2020",
  "acmCS2023",
  "abetComputingCriteria",
  "unescoAIEducation",
  "intlAISafetyReport2025",
  "mythosCard",
  "reutersChatGPT100M",
  "timeGPT4BarExam",
  // Live job postings — URLs to be pinned before launch.
  "openAIApplied",
  "openAIFDEPosting",
  "scaleFDEPosting",
  "salesforceAIEngineerPosting",
  "googleFieldArchitect",
  "deloitteFDE",
  // Regional labor extract (Phase 5) — URLs to be pinned before launch.
  "lightcastRegionalAI2025",
]);
