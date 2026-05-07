#!/usr/bin/env tsx
/**
 * Source audit: verify every source ID cited in a `source-line` fence
 * inside content/ resolves in lib/sources.ts, and no shipped surface
 * cites a source whose url is "TBD" (unless allow-listed).
 *
 * Spec: docs/_specs/site/04-verification-and-prereqs.md §C2.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import * as url from "node:url";
import { sources } from "../lib/sources";
import { allowlist } from "./audit-sources.allowlist";

const __filename = url.fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(md|mdx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const FENCE = /```\s*source-line\s*\n([\s\S]*?)```/g;
const errors: string[] = [];

for (const file of walk(path.join(ROOT, "content"))) {
  const body = fs.readFileSync(file, "utf8");
  let m: RegExpExecArray | null;
  while ((m = FENCE.exec(body)) !== null) {
    const ids = m[1]
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    for (const id of ids) {
      const rel = path.relative(ROOT, file);
      if (!(id in sources)) {
        errors.push(`${rel}: unknown source id "${id}"`);
        continue;
      }
      const src = (sources as Record<string, { url: string }>)[id];
      if (src.url === "TBD" && !allowlist.has(id)) {
        errors.push(`${rel}: cites "${id}" whose url is TBD`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error("audit:sources failed:\n" + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}

console.log(`audit:sources ok — ${Object.keys(sources).length} registered sources.`);
