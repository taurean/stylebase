#!/usr/bin/env node
/*
 * Verifies .claude/skills/suede/references/tokens.md stays in sync
 * with the tokens actually declared in suede/module/*.css.
 * Presence is machine-checked; prose stays human. Run: pnpm check:skill
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const moduleDir = "suede/module";
const docPath = ".claude/skills/suede/references/tokens.md";

// Consumer-settable hooks documented in tokens.md but (deliberately)
// never declared in source — they only appear as var() fallbacks.
const consumerHooks = new Set([
    "--fw-heading",
    "--waterfall-gap",
    "--river-gap",
    "--repel-gap",
    "--hr-width",
]);

const hueStep = /^--hue-([a-z-]+)-(50|[1-9]00|950)$/;

const declared = new Set();
// hook name -> files reading it, one entry per read
const hookReads = new Map();
for (const file of readdirSync(moduleDir).filter((f) => f.endsWith(".css"))) {
    const css = readFileSync(join(moduleDir, file), "utf8").replace(
        /\/\*[\s\S]*?\*\//g,
        "",
    );
    for (const m of css.matchAll(/(--[a-z0-9-]+)\s*:/g)) declared.add(m[1]);
    // A var() with a fallback is a hook read: its default lives there.
    for (const m of css.matchAll(/var\(\s*(--[a-z0-9-]+)\s*,/g)) {
        hookReads.set(m[1], [...(hookReads.get(m[1]) ?? []), file]);
    }
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

// Hooks: every fallback read is a listed hook, read in exactly one
// rule (so its default can't drift), and every listed hook is read.
for (const [hook, files] of hookReads) {
    if (!consumerHooks.has(hook)) {
        problems.push(`var() fallback on unlisted hook: ${hook} (${files})`);
    }
    if (files.length > 1) {
        problems.push(`hook read more than once: ${hook} (${files})`);
    }
}
for (const hook of consumerHooks) {
    if (!hookReads.has(hook)) problems.push(`listed hook never read: ${hook}`);
}

if (problems.length > 0) {
    console.error(`tokens.md out of sync with suede/module/*.css:\n`);
    for (const p of [...new Set(problems)].sort()) console.error(`  ✖ ${p}`);
    process.exit(1);
}

console.log(
    `check:skill ok — ${declared.size} declared tokens accounted for in tokens.md`,
);
