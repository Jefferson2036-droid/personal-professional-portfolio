#!/usr/bin/env tsx
/**
 * Doctrine audit: greps content/ and app/ for phrases that violate
 * docs/_specs/doctrine/00-positioning-invariants.md §3 and
 * docs/_specs/doctrine/01-realistic-optimism.md §2.
 *
 * Non-zero exit on any match.
 * Spec: docs/_specs/site/04-verification-and-prereqs.md §C1.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import * as url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(md|mdx|tsx|ts)$/.test(entry.name)) out.push(full);
  }
  return out;
}

interface Rule {
  id: string;
  pattern: RegExp;
  mustHaveHedge?: RegExp;
  message: string;
}

const rules: Rule[] = [
  {
    id: "no-frontier-waste",
    pattern: /frontier model building is a waste/i,
    message: 'doctrine §3: forbidden phrasing "frontier model building is a waste"',
  },
  {
    id: "no-is-rebrand",
    pattern: /IS rebrand/i,
    message: 'doctrine §3: forbidden phrasing "IS rebrand"',
  },
  {
    id: "no-gen-z-unprepared",
    pattern: /Gen ?Z is unprepared/i,
    message: "doctrine §3: forbidden generational stereotyping",
  },
  {
    id: "agi-year-as-fact",
    pattern: /AGI.{0,20}by 20(3[0-9]|4[0-9])/i,
    mustHaveHedge: /scenario|estimate|median|survey|forecast|projection/i,
    message:
      "doctrine §3 / doctrine/01: AGI-year claim must appear with a hedge (scenario|estimate|median|survey|forecast|projection)",
  },
];

const errors: string[] = [];

for (const file of [
  ...walk(path.join(ROOT, "content")),
  ...walk(path.join(ROOT, "app")),
]) {
  const body = fs.readFileSync(file, "utf8");
  const lines = body.split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const r of rules) {
      if (r.pattern.test(line)) {
        if (r.mustHaveHedge) {
          const context = [lines[i - 1] ?? "", line, lines[i + 1] ?? ""].join(" ");
          if (r.mustHaveHedge.test(context)) continue;
        }
        errors.push(`${path.relative(ROOT, file)}:${i + 1}: ${r.message}`);
      }
    }
  });
}

if (errors.length > 0) {
  console.error("audit:doctrine failed:\n" + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}

console.log(`audit:doctrine ok — ${rules.length} rules checked.`);
