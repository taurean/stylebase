# CLAUDE.md

Guidance for working **on** suede-css. For writing CSS **with** suede-css in a consuming project, use the skill at `.claude/skills/suede/`.

## Layer contract

`suede/imports.css` sets the order: `webfont, suede-token, token, suede-default, default, suede-utility, utility, suede-layout, layout`. Each bare layer comes right after its `suede-*` sibling, so a consumer overrides anything by writing into the bare one. That pairing is the library's contract:

- Library code goes only in `suede-*` layers. Never write into a bare layer.
- `suede-token`: custom properties only, on `:root` (plus `[data-theme]` and media queries that swap values). Every token lives here, roles included, because a token declared in a later suede layer can't be overridden from `token`.
- `suede-default`: element selectors only, never classes.
- `suede-utility` / `suede-layout`: `u\:` / `l\:` classes only.
- No `!important`. The pairing makes it unnecessary.

## Modules

- `imports.css` holds the layer order and plain `@import`s, nothing else. Never use `layer()` on an import: modules declare their own layers, and importing a file containing `@layer suede-token { }` with `layer(suede-default)` silently creates `suede-default.suede-token`, outside the contract. Nothing errors.
- One file per concern in `suede/module/`, with a block for each layer the concern touches. Name files for the concern, never the layer. Each element's base rules live in exactly one file.
- Import order must not matter. Within a layer, two files never tie on element, property, and specificity. Context files (`article.css`) win through specificity using `:is()`, never `:where()`, which drops to the base rule's specificity and leaves the result to import order. Order within one file is fine to rely on.
- In each `suede-token` block, primitives (reference nothing) come before roles (point at primitives). Reading convention only.
- **Hooks** are custom properties suede-css reads but never declares (`--waterfall-gap`, `--fw-heading`). A value suede-css stands behind is a role declared in `suede-token`; a value that depends on the consumer's typeface, content, or aesthetic is a hook, with suede-css supplying only a default.
    - Add one only when a consumer has a real reason to set it. Every token should be meant for use.
    - The default lives in the `var()` fallback, and the hook is read in exactly one rule, so the default can't drift. `check:skill` fails on an unlisted fallback, a second read, or a listed hook nothing reads.
    - Hooks inherit on purpose: layout hooks are set on the container and read on its children.
    - A fallback resolves on the element that reads it, so `var(--fw-heading, var(--fw-regular))` follows a subtree's `--fw-regular`. A role declared on `:root` resolves once and would miss it.

## Conventions

- Logical properties. A physical one needs a comment saying why.
- Nesting one level deep at most, always with an explicit `&`. Nesting under a selector list raises every child to the list's highest specificity, so flatten those instead. The build doesn't compile nesting, so it ships as written.
- Generated scales keep their generator URL (Utopia, Harmony) in a comment above the block, and each fluid token gets a range comment (`/* Step 0: 10px → 12px */`).
- Deliberate opinions, don't "fix" them: headings are normal weight because hierarchy comes from size, and utilities are typography and accessibility only, with no spacing, color, or display utilities.

## Checks and release

- `pnpm lint` after every CSS change. It also catches undefined `var()` references.
- `pnpm build:preview` writes readable CSS to `dist-preview/` for diffing. `dist/` is committed and only rebuilt on release.
- Run `release:*` only when the user says to. It publishes to npm.

## When a token or class changes

Update `.claude/skills/suede/references/tokens.md` (`pnpm check:skill` enforces it; new hooks also go in `consumerHooks` in `scripts/check-skill-tokens.mjs`), add a `CHANGELOG.md` entry with a migration line for renames and removals, and update `examples/` if the change is visible.
