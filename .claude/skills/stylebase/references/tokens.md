# Stylebase token catalog

All tokens are defined on `:root` in the `stylebase-token` / `stylebase-default` layers. Override any of them from `:root` in the bare `token` layer or unlayered CSS. Fluid tokens interpolate between a ~310–320px viewport (min) and ~1332–1764px (max).

## Color primitives — `--hue-<name>-<step>`

23 hues × 11 steps (`50, 100, 200 … 900, 950`), all OKLCH, modeled on Evil Martians' Harmony. Lightness is ~constant per step across hues, so any two hues at the same step are interchangeable for contrast purposes. `500` is the "brand" stop; `50` near-white, `950` near-black.

Hues: `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `light-blue`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose` (chromatic); `slate` (cool neutral), `zinc`, `neutral` (achromatic), `stone` (warm neutral), `olive`, `mauve` (tinted neutrals).

**Use for:** accents, state colors (success/warning/danger), charts, brand moments. **Don't use for** surfaces and body text — use the semantic tokens below so dark mode keeps working.

## Semantic colors (respond to light/dark automatically)

| Token | Role |
|---|---|
| `--hue-z0-bg` / `--hue-z0-fg` | Page background / text |
| `--hue-z0-divider` | Hairlines, `hr` (50% of currentColor) |
| `--hue-z1-bg` / `--hue-z1-fg` / `--hue-z1-border` | Raised surfaces: cards, buttons, inputs |
| `--hue-z2-bg` / `--hue-z2-fg` / `--hue-z2-border` | Overlay surfaces: dialogs, popovers, menus, toasts |
| `--hue-focus-ring` | Focus ring color (consumed by the global `:focus-visible` rule) |
| `--hue-link` | Default link color |
| `--hue-backdrop` | Dialog/drawer backdrop (`::backdrop`, overlay divs) |
| `--shadow-color` | Base color the `--shadow-z*` tokens mix from |

Pair `z1` surfaces with `--shadow-z1`, `z2` with `--shadow-z2`/`--shadow-z3`. In dark mode surfaces step *lighter* with elevation.

## Typography

### Font sizes — `--fs-0` … `--fs-10` (fluid, rem-based)

| Token | Range | Typical use |
|---|---|---|
| `--fs-0` | 10 → 12px | fine print, h6 |
| `--fs-1` | 12 → 15px | body default, h5 |
| `--fs-2` | 14.4 → 18.75px | article body, h4 |
| `--fs-3` | 17.28 → 23.4px | h3 |
| `--fs-4` | 20.7 → 29.3px | h2 |
| `--fs-5` | 24.9 → 36.6px | h1 |
| `--fs-6` | 29.9 → 45.8px | display |
| `--fs-7` | 35.8 → 57.2px | display, article h1 |
| `--fs-8` | 43 → 71.5px | display |
| `--fs-9` | 51.6 → 89.4px | display |
| `--fs-10` | 61.9 → 111.8px | hero display |

### Line heights

`--lh-ui: 1` (buttons/controls), `--lh-snug: 1.15` (large headings), `--lh-condensed: 1.35` (small headings), `--lh-standard: 1.5` (body), `--lh-expanded: 1.62`, `--lh-loose: 1.75` (long-form).

### Font families

Semantic aliases (prefer these): `--ff-content` (long-form body), `--ff-heading`, `--ff-sans` (body/default), `--ff-serif`, `--ff-ui` (system UI), `--ff-mono` (code).

Underlying modern-font-stacks primitives: `--ff-antique-display`, `--ff-didone-display`, `--ff-handwritten-display`, `--ff-humanist-classical`, `--ff-humanist-geometric`, `--ff-humanist`, `--ff-industrial-display`, `--ff-mono-slab-serif`, `--ff-neo-grotesque`, `--ff-old-style`, `--ff-rounded-sans-display`, `--ff-slab-serif-display`, `--ff-system`, `--ff-transitional`. Retheme by pointing an alias at a different stack.

### Font weights

`--fw-regular: 400`, `--fw-medium: 500`, `--fw-semibold: 600`, `--fw-bold: 700`. Headings default to `var(--fw-heading, var(--fw-regular))` — normal weight by design; set `--fw-heading` to opt into weight globally or per subtree.

## Spacing — `--space-*` (fluid, px-based)

Geometric (~φ) scale: `--space-5xs` (0.56→0.67px), `--space-4xs` (0.9→1.08), `--space-3xs` (1.46→1.75), `--space-2xs` (2.36→2.83), `--space-xs` (3.82→4.59), `--space-sm` (6.18→7.42), `--space-medium` (10→12), `--space-lg` (16.18→19.42), `--space-xl` (26.18→31.42), `--space-2xl` (42.36→50.83), `--space-3xl` (68.54→82.25), `--space-4xl` (110.9→133.08), `--space-5xl` (179.44→215.33). Paired step: `--space-s-xl` (10→36px, the grid gutter).

Note the middle step is `--space-medium` (not `-md`) — intentional, don't "fix" it. Component-internal padding: `sm`–`lg`. Between siblings: `medium`–`xl`. Between sections: `2xl`+.

## Radius — `--radius-*`

`--radius-xs` (2px), `--radius-sm` (4px), `--radius-md` (6px — buttons, inputs, menu items), `--radius-lg` (10px — cards), `--radius-xl` (16px — dialogs), `--radius-full` (pills, avatars).

## Borders & focus

`--border-w-thin` (1px — default borders), `--border-w-standard` (2px), `--border-w-thick` (3px — emphasis edges). Focus ring geometry: `--focus-ring-width`, `--focus-ring-offset` (consumed by the global `:focus-visible` rule; retune rather than restyling focus per component).

## Stacking — `--layer-*` (semantic z-index)

`--layer-base: 0`, `--layer-raised: 10` (sticky-ish local raising), `--layer-sticky: 100` (sticky headers/rails), `--layer-overlay: 1000` (dialog backdrops), `--layer-modal: 1100` (dialog content), `--layer-popover: 1200` (popover/dropdown/tooltip/menu — above modals so they work *inside* dialogs), `--layer-toast: 1300`. Pick by role; never out-bid with raw numbers.

## Shadows — `--shadow-z1..z3`

`--shadow-z1` (raised cards/buttons), `--shadow-z2` (popovers, menus), `--shadow-z3` (dialogs, maximum emphasis). Built from `--shadow-color` via `color-mix`; override `--shadow-color` to retint all shadows at once.

## Motion — `--duration-*`, `--ease-*`

`--duration-instant` (0ms), `--duration-fast` (100ms — hovers, fades), `--duration-base` (200ms — popovers, menus), `--duration-slow` (350ms — dialogs, drawers). Easings: `--ease-out` (default; decelerating entrances), `--ease-in-out` (exits, moves), `--ease-spring` (slight overshoot for playful entrances). Under `prefers-reduced-motion` the durations collapse to 1ms automatically (still firing `transitionend`) — never write your own reduced-motion guard for duration-token transitions.

## Grid

`--grid-max-width` (83.25rem), `--grid-gutter` (= `--space-s-xl`), `--grid-columns` (12). Consumed by `l:grid` / `l:root`.

## Layout class custom-property APIs (set on the element, not `:root`)

`--waterfall-gap` (default 2em) for `l:waterfall`; `--river-gap` (1em) for `l:river`; `--repel-gap` (`--space-medium`) for `l:repel`.
