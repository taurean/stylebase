# Conventions for CSS in suede-css-consuming projects

## Do

- **Derive missing values from tokens** (`color-mix`, `calc`) rather than hardcoding. If nothing fits, question the design.
- **Use logical properties**: `margin-block-start`, `padding-inline`, `inline-size`, `inset-inline-start`. Physical (`width`, `left`, `margin-top`) only when the axis is genuinely physical (e.g. tied to pointer coordinates).
- **Write component styles in the component.** Global overrides go in the bare `default`/`token` layers (see layers.md).
- **Use the layout primitives before writing flex/grid by hand**: `l:waterfall` (vertical stack), `l:river` (horizontal flow), `l:repel` (space-between row), `l:grid`/`l:root` (page grid/container), `l:ui-list` (unstyled inline list).
- **Constrain measure with `ch`**: body text `max-inline-size: 68ch`, headings `40ch` (the article defaults already do this inside `<article>`).
- **Use `u:visually-hidden`** for text alternatives on icon-only controls.

## Don't

- **Don't use utility classes where a token belongs.** `u:fs-*` is for one-off markup-level tweaks (a demo page, a CMS fragment); inside a component write `font-size: var(--fs-2)`.
- **Don't import suede-css source modules individually.** Consume the built file; override via layers.

## Breakpoints

suede-css is fluid-first: type and spacing scale continuously, so many designs need few or no media queries. When you do need one, prefer container queries for component-level shifts, and media queries only for page-level layout. There are no breakpoint tokens (custom properties can't be used in media queries); the de facto page-level breakpoints are the scale endpoints: ~320px (scale min) and 1332px (`--grid-max-width`).
