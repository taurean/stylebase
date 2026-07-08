# stylebase
[![NPM Version](https://img.shields.io/npm/v/%40taurean%2Fstylebase?style=flat-square&logo=npm&logoColor=%23CB3837&label=NPM%20version%20%20%20%20&labelColor=%23ECEBEB)](https://www.npmjs.com/package/@taurean/stylebase) [![GitHub commit activity](https://img.shields.io/github/commit-activity/y/taurean/stylebase?style=flat-square)](https://github.com/taurean/stylebase) [![GitHub Repo stars](https://img.shields.io/github/stars/taurean/stylebase?style=flat-square)](https://github.com/taurean/stylebase)


A framework-agnostic CSS foundation: design tokens, sensible HTML defaults, layout primitives, and a deliberately tiny utility set — for content sites and web apps, including ones built on headless component primitives (e.g. bits-ui).

## Installation

**NPM (recommended):**
```bash
npm i @taurean/stylebase
```

**Direct download:**
Download `stylebase.min.css` in `dist/`.

## Usage

Import globally **once** in your project as one of the earliest CSS files. This ensures design tokens and utility classes are available throughout your project.

```css
@import '@taurean/stylebase';
```

**Important:** Only import once to avoid duplicate styles and ensure proper cascade order.

## What's Included

- **Color system** — OKLCH primitives (23 hues × 11 steps) plus semantic surface/text roles with automatic light/dark via `light-dark()` and a `data-theme` toggle hook
- **Fluid typography** — responsive type scale, line heights, font stacks, weight tokens
- **Fluid spacing** — responsive spacing scale using clamp()
- **Radii, borders, shadows, z-index, motion** — token families for real UI work (dialogs, popovers, toasts), with `prefers-reduced-motion` handled at the token level
- **Accessibility baseline** — global `:focus-visible` ring, `u:visually-hidden`, `box-sizing` reset, form inheritance normalization
- **CSS Grid layout** — 12-column grid with responsive gutters
- **Layout primitives** — `l:waterfall`, `l:river`, `l:repel`, `l:root`, `l:grid`, `l:ui-list`
- **Sensible defaults** — base styles for HTML elements

Built from best practices and resources including [Evil Martians' Harmony color palette](https://evilmartians.com/opensource/harmony), [Cube CSS methodology](https://cube.fyi), and [Utopia fluid scales](https://utopia.fyi).

## Overriding stylebase (cascade layers)

Stylebase declares paired cascade layers:

```css
@layer webfont, stylebase-token, token, stylebase-default, default, stylebase-utility, utility, stylebase-layout, layout;
```

Library styles live only in the `stylebase-*` layers. The bare layers (`token`, `default`, `utility`, `layout`) come later in the order and are reserved for you — anything you declare there overrides stylebase without specificity fights or `!important`. Unlayered CSS (e.g. component styles) overrides everything.

```css
/* your stylesheet */
@layer token {
    :root {
        --fw-heading: var(--fw-bold); /* opt into bold headings */
        --hue-link: light-dark(var(--hue-violet-700), var(--hue-violet-300));
    }
}

@layer default {
    h1 { letter-spacing: -0.02em; }
}
```

Dark mode follows the OS by default; force it with `data-theme="dark"` (or `"light"`) on `<html>` or any subtree.

**Claude Code users:** this repo ships a skill at `.claude/skills/stylebase/` for writing styles with stylebase — token catalog, override recipes, and headless-primitive (bits-ui) patterns. Copy it into a consuming project's `.claude/skills/`.

## Contributing to stylebase + publishing changes

Once changes are merged into `main`, run one of the release scripts (`npm run release:patch`, `npm run release:minor`, or `npm run release:major`) to lint, check docs sync, minify CSS, update the package.json version, and publish to [NPM](https://www.npmjs.com/package/@taurean/stylebase).

- `npm run build` — update the minified CSS in `dist/`, useful for testing output before publishing
- `npm run build:preview` — write a non-minified CSS file to `dist-preview/` (gitignored) for human-readable diffs
- `npm run lint` — stylelint over the source (catches invalid values and undefined `var()` references)
- `npm run check:skill` — verify the skill's token catalog matches the source
- `npm run dev` — live reload via browsersync to test the example HTML files while making style changes (files in `examples/` have no CSS of their own; they rely on stylebase's global styles and classes)
- Release scripts assume the GitHub remote is named `gh`
