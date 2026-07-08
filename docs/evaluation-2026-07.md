# Stylebase evaluation — July 2026

> Point-in-time snapshot of **v0.11.0** (last commit October 2025), taken at the start of the revival effort. Findings here are frozen; the fixes are tracked in the phase column of the last section. Do not update this file as the code changes — write a new evaluation instead.

## Summary verdict

The bones are good and genuinely modern: cascade-layer architecture with a paired library/consumer override scheme, an OKLCH palette modeled on Evil Martians' Harmony, Utopia-generated fluid type and space scales, CUBE-CSS-style layout primitives, and solid logical-property instincts in the newer files. The execution is early: the published dist contained invalid CSS, several tokens referenced variables that don't exist, the palette carried duplicate and copy-pasted hues, the layer convention was broken by its own only utility file, and CLAUDE.md documented a layer set that doesn't exist. There was no linting, so none of this could be caught mechanically.

Verdict: worth reviving on its current architecture. No rewrite needed — bug fixes, token completion, and documentation that matches reality.

## Bugs (shipped in the published 0.11.0)

1. **Invalid `font-family` declarations.** `article.css` had `font-family: (--ff-heading)` and `(--ff-sans)` — missing `var()`. Browsers drop the declaration silently; article headings rendered in the inherited font. Shipped verbatim in `dist/stylebase.min.css`.
2. **`--ff-serif` resolved to nothing.** `font-family.css` aliased it to `var(--fftransitional)` (missing hyphen; the real token is `--ff-transitional`).
3. **`--hue-sand-950` copy-paste error.** Same lightness as `sand-900` (30.27%) instead of the ~19% every other hue uses at step 950.
4. **`--grid-gutter` referenced undefined `--space-s-xl`.** The token didn't exist in `space.css`; the gutter only worked because of an inline fallback clamp.
5. **Dead placeholder tokens.** `--hue-z1-bg` / `--hue-z1-fg` declared with empty values — a half-started elevation scheme.

## Gaps

- **No `box-sizing: border-box` reset** — the one near-universal baseline.
- **No `:focus-visible` styling anywhere** — a real accessibility gap, and the single most important thing a foundation must provide for headless component libraries (bits-ui renders unstyled focusable elements).
- **No token families for** radius, shadow, border-width, z-index/layering, or motion (durations/easings) — all needed the moment a consumer styles a dialog, popover, or toast.
- **No manual theme hook.** Dark mode was `prefers-color-scheme` only; no `[data-theme]` override, no `light-dark()`. Only the `--hue-z0-*` pair responded to dark mode at all.
- **No form normalization** despite a `forms.html` example.
- **Utilities cover almost nothing**: 17 classes, all typographic (`u:fs-*`, `u:lh-*`). Tokens for color/space/family existed with no way to reach them — though by design most should be consumed from component CSS, not classes.
- **No linting/CI.** Bugs 1–4 are all mechanically catchable.

## Inconsistencies

- **CLAUDE.md documented the wrong layers** (`webfont, token, defaults, utility, layout`) vs. the real paired set (`webfont, stylebase-token, token, stylebase-default, default, …`). Anyone following it would author library code into the consumer override layers.
- **`text-util.css` imported into the bare `utility` layer**, breaking the library/consumer pairing its own architecture defines; `stylebase-utility` and `webfont` were declared but empty.
- **Duplicate hues**: `gray` byte-identical to `slate`; `sand` byte-identical to `stone`. Also "fuschia" (sic) and camelCase `--hue-lightBlue-*` amid kebab-case everything.
- **Spacing scale in px** while type is in rem (px spacing doesn't scale with user font-size preference); middle step named `--space-medium` amid `sm`/`lg`/`xl` abbreviations. *(Kept as-is by owner decision — noted, not fixed.)*
- **Mixed logical/physical properties**: `article.css`/`river.css`/`waterfall.css` use logical properties; `grid-layout.css`/`root-container.css` use `max-width`.
- **`!important` in `l:repel`** — unnecessary given the layer system.
- **Comment coverage lopsided**: excellent per-step range comments in `font-size.css`/`space.css`; near-zero in the 330-line `color.css` and all layout files; the paired-layer strategy documented nowhere.
- **README drift**: `build:preview` output path wrong; import-path examples inconsistent between README and `index.html`; docs links are placeholders.

## Deliberate opinions confirmed with the owner (not defects)

- Headings are normal-weight; hierarchy comes from size alone (`--fw-heading` added as the opt-in dial).
- Spacing scale keeps its current names, steps, and px values.
- Semantic color tokens stay in the `--hue-*` namespace (e.g. `--hue-z0-bg`).
- Utilities stay typography + a11y helpers only; stylebase is not a utility framework.

## Disposition

| Finding | Addressed in |
|---|---|
| Bugs 1–5 | Phase 0 → v0.11.1 (z1 placeholders in Phase 5) |
| Stale CLAUDE.md, no linting | Phase 1 (rewrite; stylelint + `value-no-unknown-custom-properties`) |
| Missing radius/border/z-index/shadow/motion tokens | Phase 2 → v0.12.0 |
| Duplicate hues, fuschia, lightBlue casing | Phase 3 |
| box-sizing, focus-visible, form normalization, link defaults, `--fw-*` | Phase 4 |
| Dark-mode hook (`light-dark()` + `[data-theme]`), elevation surfaces | Phase 5 |
| `!important`, physical properties, layout comments, utility additions | Phase 6 |
| Headless-primitive readiness check, `examples/primitives.html` | Phase 7 |
| README/CHANGELOG/examples refresh, authoring skill | Phase 8 |
