# Changelog

All notable changes to this project are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.13.0] — 2026-10-26

### Migration table

| Before | After |
|---|---|
| `--layer-base/raised/sticky/overlay/modal/popover/toast` | `--z-base/raised/sticky/overlay/modal/popover/toast` (same values) |

The layer order is unchanged, so overrides in the bare `token` / `default` / `utility` / `layout` layers keep working. Act only if you reference a `--layer-*` token.

### Added

- Default links (`a:not([class])`) get visited, hover, and active states: visited uses `--hue-link-visited`, pressed uses `--hue-link-active`, and hover fades the underline out over `--duration-fast`
- `<pre>` blocks containing `<code>` inside `<article>` get a `--hue-z1-bg` background, padding, and horizontal scroll

### Fixed

- `--duration-instant` now collapses to 1ms under `prefers-reduced-motion` like the other durations, so `transitionend` fires for exits timed with it (#5)
- `hr` uses `block-size` instead of `height` (#5)
- `article hr` margins use logical properties and gain block spacing (#5)
- `img`, `svg`, and `video` with `width`/`height` attributes keep their aspect ratio when `max-inline-size` shrinks them (#5)
- `l:ui-list` lays out only its own items inline; nested lists inside it keep normal block items (#5)
- Semantic color tokens (`--hue-z0/z1/z2-*`, `--hue-link`, `--hue-focus-ring`, `--hue-backdrop`) moved from `suede-default` to `suede-token`, so overriding them from `@layer token` now works as documented (#4)
- `data-theme="light|dark"` on `<html>` now overrides the OS preference; the `[data-theme]` rules previously lost to `:root { color-scheme: light dark }` on source order (#4)
- Docs: subtree `data-theme` was described as rendering its contents dark. It switches the tokens inside the subtree; the themed element paints its own background and text color with a surface token. suede-css deliberately doesn't, since it can't know which surface the element is (#4)
- Dark `--hue-z2-bg` now steps up to `neutral-800`; it matched z1 (`neutral-900`), contradicting the lighter-as-elevation-rises ramp (#4)
- Each git tag now holds a `dist/` built for its own version; previously a tag carried the previous release's build. The npm package was always correct (#6)

### Changed

- `p` no longer sets its own `font-size`, so it inherits from its container and `u:fs-*` on a parent now reaches paragraphs. Paragraphs inside an element with its own font size render at that size instead of `--fs-1` (#5)
- `--layer-*` z-index tokens renamed to `--z-*`, avoiding confusion with `@layer` (see migration table)
- Source reorganized into concern files (`color`, `text`, `space`, `border`, `elevation`, `motion`, `layout`, `document`, `media`, `form`, `article`, `accessibility`) that each declare their own `@layer` blocks; `imports.css` is now the layer order plus plain imports. No change to the built CSS beyond the entries above.
- Tooling: stylelint config moved to `stylelint.config.mjs` and reads every module as a token source; added `.editorconfig` (4-space indentation)
- Contributor tooling moved from npm to pnpm (`pnpm-lock.yaml` replaces `package-lock.json`). Consumers can still install with any package manager

## [0.12.1] — 2026-10-21

Renamed from stylebase to suede-css. Version numbering continues from 0.12.0. `@taurean/stylebase` will be deprecated on npm with a pointer to the new package.

### Migration table

| Before | After |
|---|---|
| `npm i @taurean/stylebase` / `@import "@taurean/stylebase"` | `npm i @taurean/suede-css` / `@import "@taurean/suede-css"` |
| `dist/stylebase.min.css` | `dist/suede.min.css` |
| layers `stylebase-token`, `stylebase-default`, `stylebase-utility`, `stylebase-layout` | `suede-token`, `suede-default`, `suede-utility`, `suede-layout` |

Overrides written into the bare `token` / `default` / `utility` / `layout` layers keep working unchanged. Act only if you re-declare the full `@layer` order in your own CSS or reference a `stylebase-*` layer by name.

### Changed

- Source directory `stylebase/` → `suede/`; Claude Code skill `.claude/skills/stylebase/` → `.claude/skills/suede/` (skill name `suede`)
- Build banner reads `suede-css v<version>`

## [0.12.0] — 2026-07-08

### Migration table

| Before | After |
|---|---|
| `--hue-gray-*` | `--hue-slate-*` (was byte-identical) |
| `--hue-sand-*` | `--hue-stone-*` (was byte-identical) |
| `--hue-fuschia-*` | `--hue-fuchsia-*` |
| `--hue-lightBlue-*` | `--hue-light-blue-*` |
| headings `font-weight: unset` | `font-weight: var(--fw-heading, var(--fw-regular))` — same rendered result; set `--fw-heading` to opt into weight |
| dark mode via `prefers-color-scheme` only | `light-dark()` + `color-scheme`; force with `data-theme="light\|dark"` |
| `[data-grid-columns="…"]` anywhere | must be a direct child of `.l:grid` |

### Added

- Token families: `--radius-*`, `--border-w-*`, `--layer-*` (semantic z-index), `--shadow-z1..z3` (+ `--shadow-color`), `--duration-*` / `--ease-*` with a `prefers-reduced-motion` guard that collapses durations to 1ms, `--fw-regular/medium/semibold/bold`, `--focus-ring-width/-offset`
- Semantic color roles: completed elevation surfaces `--hue-z0/z1/z2-{bg,fg,border}`, plus `--hue-focus-ring`, `--hue-link`, `--hue-backdrop`
- Defaults: `box-sizing: border-box` reset, global `:focus-visible` ring, form-control inheritance normalization, minimal `a:not([class])` styling
- Utilities: `u:visually-hidden`, `u:ff-content/heading/sans/serif/ui/mono`
- Layouts: `l:repel` gains `flex-wrap` and `gap` (`--repel-gap`)
- Tooling: stylelint (`npm run lint`), skill-sync check (`npm run check:skill`), both wired into release scripts
- Docs: rewritten README/CLAUDE.md, `docs/evaluation-2026-07.md`, Claude Code skill at `.claude/skills/stylebase/`, `examples/primitives.html`

### Changed

- Dark mode reworked around `light-dark()` and `color-scheme`; `[data-theme]` is the manual toggle hook (works per-subtree)
- `--hue-neutral-50` chroma normalized to 0
- `l:grid`, `l:root` use `max-inline-size`; `img/svg/video` use `max-inline-size`
- `l:repel` no longer uses `!important`

### Removed

- `--hue-gray-*`, `--hue-sand-*` (duplicates — see migration table)
- Empty placeholder declarations `--hue-z1-bg` / `--hue-z1-fg` (now real tokens)

## [0.11.1] — 2026-07-07 (not published separately; fixes shipped in 0.12.0)

### Fixed

- `article.css`: `font-family: (--ff-heading)` / `(--ff-sans)` missing `var()` — declarations were invalid and silently dropped (article headings rendered in the inherited font)
- `--ff-serif` referenced undefined `--fftransitional` (typo for `--ff-transitional`)
- `--hue-sand-950` had the same lightness as `sand-900` (copy-paste error)
- `--space-s-xl` now defined; `--grid-gutter` no longer depends on an inline fallback
- `text-util.css` imported into `stylebase-utility` (was the bare `utility` layer, breaking the library/consumer layer pairing)
