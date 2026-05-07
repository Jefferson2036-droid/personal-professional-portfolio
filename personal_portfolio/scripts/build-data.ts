#!/usr/bin/env tsx
/**
 * Build-time data pipeline.
 *
 * Reads data/manual/*.yml, validates against the sources registry
 * (lib/sources.ts) and doctrine rules, writes data/derived/*.json.
 *
 * Wired as `prebuild` so `npm run build` always refreshes derived data.
 * See docs/_specs/site/02a-derived-data-inventory.md for the contract.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import * as url from "node:url";
import yaml from "js-yaml";
import { sources, type SourceId } from "../lib/sources";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const MANUAL = path.join(ROOT, "data", "manual");
const DERIVED = path.join(ROOT, "data", "derived");

const errors: string[] = [];
function fail(msg: string) {
  errors.push(msg);
}

function readYaml<T>(file: string): T {
  const full = path.join(MANUAL, file);
  if (!fs.existsSync(full)) {
    throw new Error(`Missing manual YAML: ${full}`);
  }
  return yaml.load(fs.readFileSync(full, "utf8")) as T;
}

function assertSource(id: string, ctx: string) {
  if (!(id in sources)) {
    fail(`[${ctx}] unknown sourceId "${id}"`);
  }
}

function write(file: string, payload: unknown) {
  fs.mkdirSync(DERIVED, { recursive: true });
  fs.writeFileSync(
    path.join(DERIVED, file),
    JSON.stringify(payload, null, 2) + "\n",
    "utf8",
  );
}

const now = () => new Date().toISOString();

// ---------- 1. FAII ----------
interface FAIIMilestonesYaml {
  milestones: Array<{ year: number; label: string; sourceId: string }>;
  scenarios: Array<{ label: string; endYear: number; endValue: number }>;
}
function buildFAII() {
  const src = readYaml<FAIIMilestonesYaml>("faii-milestones.yml");
  src.milestones.forEach((m) => assertSource(m.sourceId, "faii-milestones"));

  // Synthesize smooth composite series 2015..2026 from milestones.
  // 2020 = rebase (100). Capability uses logistic, others log10-ish.
  const weights = { capability: 0.4, scaling: 0.25, economics: 0.2, deployment: 0.15 };
  const series = [] as Array<{
    year: number;
    capability: number;
    scaling: number;
    economics: number;
    deployment: number;
    composite: number;
  }>;
  for (let year = 2015; year <= 2026; year++) {
    // Simple growth model; exact numbers are placeholders until visualizations/00 ships.
    const t = year - 2020;
    const capability = Math.round(100 * Math.pow(1.65, t));
    const scaling = Math.round(100 * Math.pow(1.55, t));
    const economics = Math.round(100 * Math.pow(1.4, t));
    const deployment = Math.round(100 * Math.pow(1.3, t));
    const composite =
      Math.round(
        (capability * weights.capability +
          scaling * weights.scaling +
          economics * weights.economics +
          deployment * weights.deployment) *
          10,
      ) / 10;
    series.push({ year, capability, scaling, economics, deployment, composite });
  }

  write("frontier-ai-intensity.json", {
    generatedAt: now(),
    rebaseYear: 2020,
    weights,
    series,
    milestones: src.milestones,
    scenarios: src.scenarios,
    sourceIds: Array.from(new Set(src.milestones.map((m) => m.sourceId))),
  });
}

// ---------- 2. Benchmark record ----------
interface BenchYaml {
  points: Array<{
    seriesId: string;
    date: string;
    model: string;
    score: number;
    sourceId: string;
  }>;
  rates: unknown[];
}
function buildBenchmark() {
  const src = readYaml<BenchYaml>("benchmark-points.yml");
  src.points.forEach((p) => assertSource(p.sourceId, "benchmark-points"));
  const bySeriesId = new Map<string, typeof src.points>();
  for (const p of src.points) {
    if (!bySeriesId.has(p.seriesId)) bySeriesId.set(p.seriesId, []);
    bySeriesId.get(p.seriesId)!.push(p);
  }
  const series = Array.from(bySeriesId.entries()).map(([id, points]) => ({
    id,
    label: id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    points: points.map((p) => ({
      date: p.date,
      model: p.model,
      score: p.score,
      sourceId: p.sourceId,
    })),
  }));
  write("benchmark-record.json", {
    generatedAt: now(),
    series,
    rates: src.rates ?? [],
    sourceIds: Array.from(new Set(src.points.map((p) => p.sourceId))),
  });
}

// ---------- 3. Enterprise adoption (doctrine §3: paired scale-gap) ----------
interface AdoptionYaml {
  rows: Array<{
    metric: string;
    value: number;
    unit: string;
    asOf: string;
    sourceId: string;
    pairedScaleGapMetric?: string;
  }>;
}
function buildAdoption() {
  const src = readYaml<AdoptionYaml>("enterprise-adoption.yml");
  const metrics = new Set(src.rows.map((r) => r.metric));
  const isScaleGapSide = new Set(
    src.rows
      .map((r) => r.pairedScaleGapMetric)
      .filter((m): m is string => typeof m === "string"),
  );
  for (const r of src.rows) {
    assertSource(r.sourceId, "enterprise-adoption");
    // Doctrine §3 applies only to adoption-rate numbers, not to their paired scale-gap numbers.
    if (isScaleGapSide.has(r.metric)) continue;
    if (/\b(adopting|adopted|using AI|use AI|usage of AI)\b/i.test(r.metric)) {
      if (!r.pairedScaleGapMetric) {
        fail(
          `[enterprise-adoption] doctrine §3 violation: metric "${r.metric}" has no pairedScaleGapMetric`,
        );
      } else if (!metrics.has(r.pairedScaleGapMetric)) {
        fail(
          `[enterprise-adoption] pairedScaleGapMetric "${r.pairedScaleGapMetric}" not present as its own row`,
        );
      }
    }
  }
  write("enterprise-adoption.json", { generatedAt: now(), rows: src.rows });
}

// ---------- 4. Role clusters ----------
interface RoleSalaryYaml {
  clusters: Array<{
    id: string;
    label: string;
    exampleTitles: string[];
    exampleEmployers: string[];
    salaryRange?: { lowUSD: number; highUSD: number; asOf: string; sourceId: string };
    studioCourses: string[];
  }>;
}
function buildRoleClusters() {
  const src = readYaml<RoleSalaryYaml>("role-salary-bands.yml");
  const sourceIds = new Set<string>();
  src.clusters.forEach((c) => {
    if (c.salaryRange) {
      assertSource(c.salaryRange.sourceId, `role-cluster ${c.id}`);
      sourceIds.add(c.salaryRange.sourceId);
    }
  });
  write("role-clusters.json", {
    generatedAt: now(),
    clusters: src.clusters,
    sourceIds: Array.from(sourceIds),
  });
}

// ---------- 5. Curriculum spine (doctrine §4 one-to-one) ----------
const DOCTRINE_SPINE = [
  "IS 117",
  "IS 218",
  "IS 265",
  "IS 331",
  "IS 390",
  "IS 392",
  "IS 425",
  "IS 465",
  "IS 480",
  "IS 491 / IT 491",
];
interface SpineYaml {
  courses: Array<{
    code: string;
    title: string;
    formationPractice: string;
    portfolioArtifact: string;
    roleClusterIds: string[];
  }>;
}
function buildCurriculumSpine() {
  const src = readYaml<SpineYaml>("curriculum-spine.yml");
  const codes = src.courses.map((c) => c.code);
  for (const c of DOCTRINE_SPINE) {
    if (!codes.includes(c)) fail(`[curriculum-spine] missing doctrine §4 code "${c}"`);
  }
  for (const c of codes) {
    if (!DOCTRINE_SPINE.includes(c))
      fail(`[curriculum-spine] code "${c}" not in doctrine §4`);
  }
  write("curriculum-spine.json", {
    generatedAt: now(),
    courses: src.courses,
    sourceIds: ["njitBSEAIProgramPage" as SourceId],
  });
}

// ---------- 6. Student formation ----------
interface FormationYaml {
  readinessBaseline: Array<{ id: string; sourceId: string; [k: string]: unknown }>;
  aiLiteracyBaseline: Array<{ id: string; sourceId: string; [k: string]: unknown }>;
  workplaceBaseline: Array<{ id: string; sourceId: string; [k: string]: unknown }>;
  employerSkillValues: Array<{ id: string; sourceId: string; [k: string]: unknown }>;
}
function buildStudentFormation() {
  const src = readYaml<FormationYaml>("student-formation.yml");
  const all = [
    ...src.readinessBaseline,
    ...src.aiLiteracyBaseline,
    ...src.workplaceBaseline,
    ...src.employerSkillValues,
  ];
  all.forEach((m) => assertSource(m.sourceId, "student-formation"));
  write("student-formation.json", { generatedAt: now(), ...src });
}

// ---------- 7. Governance timeline ----------
interface GovernanceYaml {
  events: Array<{ sourceId: string; [k: string]: unknown }>;
  frameworks: Array<{ sourceId: string; [k: string]: unknown }>;
  incidents: { sourceId: string; [k: string]: unknown };
}
function buildGovernance() {
  const src = readYaml<GovernanceYaml>("governance-events.yml");
  src.events.forEach((e) => assertSource(e.sourceId, "governance-events"));
  src.frameworks.forEach((f) => assertSource(f.sourceId, "governance-frameworks"));
  assertSource(src.incidents.sourceId, "governance-incidents");
  write("governance-timeline.json", { generatedAt: now(), ...src });
}

// ---------- 8. Peer programs (exactly 7) ----------
interface PeerYaml {
  programs: Array<{ sourceId: string; [k: string]: unknown }>;
}
function buildPeerPrograms() {
  const src = readYaml<PeerYaml>("peer-programs.yml");
  if (src.programs.length !== 7) {
    fail(`[peer-programs] expected exactly 7 programs, got ${src.programs.length}`);
  }
  src.programs.forEach((p) => assertSource(p.sourceId, "peer-programs"));
  write("peer-programs.json", { generatedAt: now(), programs: src.programs });
}

// ---------- 9. Regional labor (NY/NJ/PA) ----------
interface RegionalLaborYaml {
  geography: string;
  generatedAs: string;
  roles: Array<{
    roleFamily: string;
    regionPostings2025: number | null;
    nationalPostings2025: number | null;
    regionalShareOfNational: number | null;
    medianPostedSalaryUSD?: number;
    sourceId: string;
    provenance: string;
  }>;
  caveats: string[];
}
function buildRegionalLabor() {
  const src = readYaml<RegionalLaborYaml>("regional-labor-ny-nj-pa.yml");
  const sourceIds = new Set<string>();
  src.roles.forEach((r) => {
    assertSource(r.sourceId, `regional-labor ${r.roleFamily}`);
    sourceIds.add(r.sourceId);
  });
  if (!src.caveats || src.caveats.length === 0) {
    fail("[regional-labor] caveats must be non-empty (spec §Acceptance)");
  }
  write("regional-labor-ny-nj-pa.json", {
    generatedAt: now(),
    geography: src.geography,
    generatedAs: src.generatedAs,
    roles: src.roles,
    caveats: src.caveats,
    sourceIds: Array.from(sourceIds),
  });
}

// ---------- run ----------
const steps: Array<[string, () => void]> = [
  ["faii", buildFAII],
  ["benchmark", buildBenchmark],
  ["enterprise-adoption", buildAdoption],
  ["role-clusters", buildRoleClusters],
  ["curriculum-spine", buildCurriculumSpine],
  ["student-formation", buildStudentFormation],
  ["governance-timeline", buildGovernance],
  ["peer-programs", buildPeerPrograms],
  ["regional-labor", buildRegionalLabor],
];

for (const [name, fn] of steps) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (e) {
    fail(`[${name}] ${(e as Error).message}`);
  }
}

if (errors.length > 0) {
  console.error("\nbuild-data failed:\n" + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}

console.log(`\nbuild-data wrote ${steps.length} JSON files to data/derived/.`);
