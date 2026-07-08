# Changelog

All notable changes to this project are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.12.0] — Unreleased

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
