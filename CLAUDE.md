# CLAUDE.md

Guidance for Claude Code when working **on** suede-css. For writing styles **with** suede-css in a consuming project, use the skill at `.claude/skills/suede/`.

## What suede-css is

A framework-agnostic CSS foundation: design tokens (OKLCH color, fluid Utopia type/space scales), opinionated HTML defaults, a small set of layout primitives, and a deliberately tiny utility set. Consumers import one file (`dist/suede.min.css` via `@taurean/suede-css`) and build component CSS on top of the tokens.

## Layer architecture (the core idea)

`suede/imports.css` declares, in order:

```css
@layer webfont, suede-token, token, suede-default, default, suede-utility, utility, suede-layout, layout;
```

Every suede-css layer (`suede-*`) is immediately followed by a bare sibling (`token`, `default`, `utility`, `layout`) that suede-css **never writes into**. Because later layers win, a consumer can override anything by declaring into the bare sibling — no specificity games, no `!important`. This pairing is the library's contract:

- **Library code goes only in `suede-*` layers.** Never import a module into a bare layer.
- `webfont`: webfont `@font-face` imports only (currently unused).
- `*-token`: custom properties only — no selectors other than `:root` (plus `[data-theme]`/media queries that swap token values).
- `*-default`: styles on HTML elements only, never classes.
- `*-utility` / `*-layout`: namespaced classes only (`u\:` / `l\:`).

## Module organization

- `suede/imports.css` is the **only** entry point. Every module lives in `suede/module/` and is imported with an explicit layer: `@import "module/file.css" layer(suede-token);`
- Group imports by layer (token block, then default, utility, layout) — not alphabetically.
- One concern per file (color tokens ≠ color defaults ≠ typography defaults).

## Authoring conventions

- 4-space indentation.
- Custom properties are kebab-case: `--fs-0`, `--space-s-xl`, `--waterfall-gap`.
- Token naming patterns: `--hue-<name>-<step>` (color primitives, steps 50–950), `--hue-z<N>-*` (semantic surfaces), `--ff-*` (font family), `--fs-*` (font size), `--fw-*` (font weight), `--lh-*` (line height), `--space-*`, `--radius-*`, `--border-w-*`, `--layer-*` (z-index), `--shadow-z*`, `--duration-*`, `--ease-*`.
- Class names are namespaced with escaped colons, layouts `l\:name`, utilities `u\:name` (written `class="l:name"` in HTML).
- Use logical properties (`max-inline-size`, `margin-block-start`, `padding-inline`). A physical property needs a comment justifying it.
- No `!important` — the layer pairing exists so it's never needed.
- Fluid values use `clamp()`; token files keep their generator URL (Utopia, Harmony) in a header comment and each fluid token carries a comment with its responsive range (e.g. `/* Step 0: 10px → 12px */`).
- Deliberate opinions (don't "fix" these): headings are normal-weight — hierarchy comes from size; consumers opt into weight via `--fw-heading`. Utilities are typography + accessibility helpers only — no spacing/color/display utilities; everything else is consumer component CSS built on tokens.

## Build, lint, release

- `npm run build` — minified CSS → `dist/suede.min.css` (committed; version banner added by `postcss.config.js`).
- `npm run build:preview` — readable CSS → `dist-preview/` (gitignored; use it for human-reviewable diffs).
- `npm run dev` — browser-sync server over `index.html` + `examples/`.
- `npm run lint` — stylelint over `suede/**/*.css`; catches invalid values and undefined `var()` references. Run after every CSS change.
- `npm run check:skill` — verifies every token declared in `suede/module/*.css` is documented in `.claude/skills/suede/references/tokens.md` and vice versa.
- `npm run release:patch|minor|major` — pushes to the `origin` remote (GitHub); versions, builds, commits `dist/`, pushes tags, publishes to npm. Only the user runs releases.

## Keeping docs in sync

When you add, rename, or remove a token or class: update `.claude/skills/suede/references/tokens.md` (enforced by `check:skill`), add a `CHANGELOG.md` entry (renames/removals get a migration line), and update `examples/` if the change is visible.
