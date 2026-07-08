#!/usr/bin/env node
/*
 * Verifies .claude/skills/stylebase/references/tokens.md stays in sync
 * with the tokens actually declared in stylebase/module/*.css.
 * Presence is machine-checked; prose stays human. Run: npm run check:skill
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const moduleDir = "stylebase/module";
const docPath = ".claude/skills/stylebase/references/tokens.md";

// Consumer-settable hooks documented in tokens.md but (deliberately)
// never declared in source — they only appear as var() fallbacks.
const consumerHooks = new Set([
    "--fw-heading",
    "--waterfall-gap",
    "--river-gap",
    "--repel-gap",
]);

const hueStep = /^--hue-([a-z-]+)-(50|[1-9]00|950)$/;

const declared = new Set();
for (const file of readdirSync(moduleDir).filter((f) => f.endsWith(".css"))) {
    const css = readFileSync(join(moduleDir, file), "utf8");
    for (const m of css.matchAll(/(--[a-z0-9-]+)\s*:/g)) declared.add(m[1]);
}

const doc = readFileSync(docPath, "utf8");
const documented = new Set(
    [...doc.matchAll(/--[a-z0-9-]+[a-z0-9]/g)].map((m) => m[0]),
);

const problems = [];

for (const token of declared) {
    const hue = token.match(hueStep);
    if (hue) {
        // Primitives are documented as a hue list, not 253 rows:
        // require the hue name itself to appear in the doc.
        if (!doc.includes(`\`${hue[1]}\``)) {
            problems.push(`undocumented hue family: ${hue[1]} (${token})`);
        }
    } else if (!documented.has(token) && !doc.includes(`${token}`)) {
        problems.push(`undocumented token: ${token}`);
    }
}

for (const token of documented) {
    if (declared.has(token) || consumerHooks.has(token)) continue;
    // Family wildcards written like --fs-0..10 / --radius-* resolve
    // if any declared token starts with the mentioned prefix.
    const prefix = token.replace(/-(\d+|z\d|xs|sm|md|lg|xl)$/, "-");
    const matchesFamily = [...declared].some((d) => d.startsWith(prefix));
    if (!matchesFamily) problems.push(`documented but not declared: ${token}`);
}

if (problems.length > 0) {
    console.error(`tokens.md out of sync with stylebase/module/*.css:\n`);
    for (const p of [...new Set(problems)].sort()) console.error(`  ✖ ${p}`);
    process.exit(1);
}

console.log(
    `check:skill ok — ${declared.size} declared tokens accounted for in tokens.md`,
);
