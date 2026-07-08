---
name: stylebase
description: >-
  Writing or reviewing CSS in a project that consumes @taurean/stylebase
  (imports stylebase.min.css). Use when styling components, pages, or
  headless primitives (bits-ui, Melt, Radix-style) with stylebase tokens,
  layers, l: layout classes, or u: utilities; when choosing colors, spacing,
  type sizes, radii, shadows, z-index, or motion values; when overriding
  stylebase defaults; or when implementing dark mode / theming in a
  consuming app.
---

# Writing styles with stylebase

Stylebase is a CSS foundation, not a component library. It gives you design tokens, sane HTML defaults, six `l:` layout primitives, and a small set of `u:` typography/a11y utilities. Everything else — component styling included — is CSS you write, using the tokens.

## The mental model

1. **Tokens are the API.** Never hardcode a color, size, duration, shadow, or z-index; there is a token for it. Full catalog: [references/tokens.md](references/tokens.md).
2. **The bare layers are yours.** Stylebase declares `@layer webfont, stylebase-token, token, stylebase-default, default, stylebase-utility, utility, stylebase-layout, layout`. Library code lives only in `stylebase-*` layers; each bare sibling comes later in the order, so anything you put there beats the library with no specificity games. Unlayered CSS (e.g. Svelte `<style>` blocks) beats *all* layers — that's fine and normal. Never write into a `stylebase-*` layer, never use `!important` against stylebase.
3. **Defaults are opinions you can flip with one token.** Headings are normal-weight by design (`--fw-heading` opts into weight); links use `--hue-link`; every focusable element already has a correct `:focus-visible` ring — don't reinvent it.
4. **Dark mode is already wired.** Semantic tokens (`--hue-z*`, `--hue-link`, …) use `light-dark()`; the OS preference just works, and `data-theme="light|dark"` on `<html>` (or any subtree) forces a mode. Build with semantic tokens and your components are theme-correct for free.
5. **Utilities are typography + a11y only** (`u:fs-*`, `u:lh-*`, `u:ff-*`, `u:visually-hidden`). If you're reaching for a spacing or color class, write component CSS with tokens instead.

## Quick reference: which token family

| Need | Family |
|---|---|
| Surface/text/border colors | `--hue-z0/z1/z2-{bg,fg,border}` (page / card / overlay) |
| Accent, states, data viz | primitives `--hue-<name>-<step>` (500 = brand stop) |
| Focus, links, dialog backdrop | `--hue-focus-ring`, `--hue-link`, `--hue-backdrop` |
| Type size / line height / family / weight | `--fs-0..10`, `--lh-*`, `--ff-*`, `--fw-*` |
| Spacing | `--space-5xs..5xl` (+ `--space-medium`, `--space-s-xl`) |
| Rounding / borders | `--radius-*`, `--border-w-*` |
| Stacking / shadows | `--layer-*` (semantic z-index), `--shadow-z1..z3` |
| Animation | `--duration-*`, `--ease-*` (reduced-motion handled for you) |

## Read next, when relevant

- [references/tokens.md](references/tokens.md) — every token with values, ranges, and when to use it. Read before picking any value.
- [references/layers.md](references/layers.md) — recipes for overriding defaults, retheming tokens, `data-theme` toggles.
- [references/bits-ui.md](references/bits-ui.md) — styling headless primitives: `data-state` transitions, the `--layer-*` mapping table, worked Dialog and DropdownMenu examples. Read when styling any bits-ui/headless component.
- [references/conventions.md](references/conventions.md) — do/don't list (logical properties, measure, where component CSS lives). Read when writing more than a few lines of CSS.
