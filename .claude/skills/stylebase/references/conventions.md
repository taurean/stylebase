# Conventions for CSS in stylebase-consuming projects

## Do

- **Use tokens for every value.** Colors, sizes, spacing, radii, shadows, z-index, durations. If a value you need has no token, derive it from one (`color-mix`, `calc`) or question the design.
- **Use semantic color tokens for surfaces and text** (`--hue-z*`), primitives (`--hue-blue-500`) only for accents — that's what keeps dark mode free.
- **Use logical properties**: `margin-block-start`, `padding-inline`, `inline-size`, `max-inline-size`, `inset-inline-start`. Physical (`width`, `left`, `margin-top`) only when the axis is genuinely physical (e.g. tied to pointer coordinates).
- **Write component styles in the component** (Svelte `<style>` is unlayered and beats all stylebase layers — that's by design, not a hack). Global overrides go in the bare `default`/`token` layers — see layers.md.
- **Use the layout primitives before writing flex/grid by hand**: `l:waterfall` (vertical stack), `l:river` (horizontal flow), `l:repel` (space-between row), `l:grid`/`l:root` (page grid/container), `l:ui-list` (unstyled inline list).
- **Constrain measure with `ch`**: body text `max-inline-size: 68ch`, headings `40ch` (the article defaults already do this inside `<article>`).
- **Use `u:visually-hidden`** for text alternatives on icon-only controls.

## Don't

- **Don't hardcode colors** (`#fff`, `white`, raw `oklch(...)`) — breaks theming.
- **Don't use `!important` or specificity hacks against stylebase** — put the override in the right layer instead; if it's not applying, the selector isn't matching.
- **Don't use utility classes where a token belongs.** `u:fs-*` is for one-off markup-level tweaks (a demo page, a CMS fragment); inside a component write `font-size: var(--fs-2)`.
- **Don't restyle focus per component** — the global `:focus-visible` ring is the system; retune its tokens if the design calls for it.
- **Don't write `prefers-reduced-motion` guards** for transitions built on `--duration-*` — already handled at the token level.
- **Don't use raw z-index numbers** — always a `--layer-*` token.
- **Don't style bare `[data-*]` selectors globally** — scope state-attribute styling to your component's class (`.menu [data-highlighted]`), since many libraries share those attribute names.
- **Don't import stylebase source modules individually** — consume the built file; override via layers.

## Breakpoints

Stylebase is fluid-first: type and spacing scale continuously, so many designs need few or no media queries. When you do need one, prefer container queries for component-level shifts, and media queries only for page-level layout. There are no breakpoint tokens (custom properties can't be used in media queries); the de facto page-level breakpoints are the scale endpoints: ~320px (scale min) and 1332px (`--grid-max-width`).
