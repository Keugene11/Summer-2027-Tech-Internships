/**
 * Writes a refreshed list into this repo from what Understudy's /api/lists returned.
 *
 *   node .github/scripts/apply.mjs <newgrad|intern> <payload.json>
 *
 * Everything here is a guard. The workflow runs unattended every few hours and commits whatever this leaves
 * behind, so a bad response — an empty build, a half-finished deploy, an error page with a 200 on it — must
 * fail loudly instead of quietly publishing an empty README over a good one. It exits non-zero and writes
 * nothing rather than shrinking the list.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";

const [kind, file] = process.argv.slice(2);
if (!["newgrad", "intern"].includes(kind) || !file) {
  console.error("usage: apply.mjs <newgrad|intern> <payload.json>");
  process.exit(2);
}

const die = (msg) => {
  console.error(`refusing to write: ${msg}`);
  process.exit(1);
};

let payload;
try {
  payload = JSON.parse(readFileSync(file, "utf8"));
} catch (e) {
  die(`payload is not JSON (${e.message})`);
}

const list = payload?.[kind];
if (!list) die(`payload has no "${kind}" section (keys: ${Object.keys(payload ?? {}).join(", ") || "none"})`);
if (typeof list.readme !== "string" || list.readme.length < 2000) die(`readme is ${list.readme?.length ?? "missing"} chars, expected >= 2000`);
if (!Array.isArray(list.listings)) die("listings is not an array");
if (list.listings.length < 25) die(`only ${list.listings.length} listings, expected >= 25`);
if (!list.readme.includes("TABLE_START")) die("readme has no TABLE_START marker — probably not a finished render");

// A collapse is upstream's problem, not something to publish. A real list moves by tens of roles a day, not
// by halves, so halving is the line: past it, keep yesterday's file and let the run go red.
const target = ".github/scripts/listings.json";
if (existsSync(target)) {
  try {
    const before = JSON.parse(readFileSync(target, "utf8"));
    if (Array.isArray(before) && before.length >= 25 && list.listings.length < before.length * 0.5) {
      die(`listings fell from ${before.length} to ${list.listings.length} (more than half) — looks like an upstream problem`);
    }
  } catch {
    // An unreadable existing file is no reason to block a good new one.
  }
}

mkdirSync(".github/scripts", { recursive: true });
writeFileSync("README.md", list.readme, "utf8");
writeFileSync(target, JSON.stringify(list.listings, null, 1), "utf8");
if (kind === "intern" && typeof payload.off_season?.readme === "string" && payload.off_season.readme.length > 200) {
  writeFileSync("README-Off-Season.md", payload.off_season.readme, "utf8");
}
console.log(`wrote ${list.listings.length} listings across ${list.companies} companies`);
