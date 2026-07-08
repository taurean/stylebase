# Styling headless primitives (bits-ui) with stylebase

bits-ui renders unstyled elements and communicates every piece of component state through **data-attributes** (`data-state="open|closed"`, `data-highlighted`, `data-disabled`, …). Style those attributes with stylebase tokens. A live no-JS reference of these recipes ships in stylebase's repo at `examples/primitives.html`.

## What stylebase already handles — don't redo these

- **Focus rings.** The global `:focus-visible` rule covers every trigger, item, and input. Don't add per-component focus styles; retune `--hue-focus-ring` / `--focus-ring-width` / `--focus-ring-offset` globally if needed.
- **Form control inheritance.** `button/input/select/textarea` already inherit font and color.
- **Reduced motion.** Transitions built on `--duration-*` collapse to 1ms automatically (and still fire `transitionend`, which bits-ui's exit animations rely on). No `@media (prefers-reduced-motion)` needed in component CSS.
- **Dark mode.** Use `--hue-z*` surface tokens and it's automatic.

## z-index: use the role, not a number

| Primitive | Token |
|---|---|
| `Dialog.Overlay` / `AlertDialog.Overlay`, drawer scrims | `--layer-overlay` |
| `Dialog.Content` / `AlertDialog.Content`, drawers/sheets | `--layer-modal` |
| `Popover`, `DropdownMenu`, `ContextMenu`, `Select`, `Tooltip`, `Combobox` list | `--layer-popover` |
| `Toast` viewport | `--layer-toast` |
| Sticky headers, floating action buttons | `--layer-sticky` / `--layer-raised` |

Popover sits *above* modal by design so menus opened inside dialogs stack correctly.

## Surface recipe by primitive

- Cards, triggers, inputs: `--hue-z1-bg` + `--hue-z1-border` + `--shadow-z1`, `--radius-md`/`--radius-lg`.
- Popovers/menus/selects: `--hue-z2-bg` + `--hue-z2-border` + `--shadow-z2`, `--radius-md`.
- Dialogs: `--hue-z2-bg` + `--shadow-z3`, `--radius-xl`; overlay uses `--hue-backdrop`.

## Worked example: Dialog

```svelte
<script lang="ts">
    import { Dialog } from "bits-ui";
</script>

<Dialog.Root>
    <Dialog.Trigger>Open</Dialog.Trigger>
    <Dialog.Portal>
        <Dialog.Overlay class="overlay" />
        <Dialog.Content class="content">
            <Dialog.Title>Title</Dialog.Title>
            <!-- ... -->
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>

<style>
    .overlay {
        position: fixed;
        inset: 0;
        z-index: var(--layer-overlay);
        background-color: var(--hue-backdrop);
    }

    .overlay[data-state="open"] {
        animation: fade-in var(--duration-base) var(--ease-out);
    }

    .content {
        position: fixed;
        inset-block-start: 50%;
        inset-inline-start: 50%;
        translate: -50% -50%;
        z-index: var(--layer-modal);
        background-color: var(--hue-z2-bg);
        color: var(--hue-z2-fg);
        border: var(--border-w-thin) solid var(--hue-z2-border);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-z3);
        padding: var(--space-lg);
        inline-size: min(90vw, 48ch);
    }

    .content[data-state="open"] {
        animation: dialog-in var(--duration-slow) var(--ease-spring);
    }

    .content[data-state="closed"] {
        animation: dialog-out var(--duration-base) var(--ease-in-out);
    }

    @keyframes fade-in {
        from { opacity: 0; }
    }

    @keyframes dialog-in {
        from {
            opacity: 0;
            translate: -50% -48%;
        }
    }

    @keyframes dialog-out {
        to { opacity: 0; }
    }
</style>
```

Exit animations: bits-ui keeps the element mounted while `data-state="closed"` plays; because reduced-motion collapses durations to 1ms (not 0), the unmount still fires.

## Worked example: DropdownMenu

```svelte
<script lang="ts">
    import { DropdownMenu } from "bits-ui";
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
    <DropdownMenu.Portal>
        <DropdownMenu.Content class="menu" sideOffset={6}>
            <DropdownMenu.Item class="item">Profile</DropdownMenu.Item>
            <DropdownMenu.Item class="item" disabled>Billing</DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Portal>
</DropdownMenu.Root>

<style>
    .menu {
        z-index: var(--layer-popover);
        background-color: var(--hue-z2-bg);
        border: var(--border-w-thin) solid var(--hue-z2-border);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-z2);
        padding: var(--space-xs);
        min-inline-size: 20ch;
        font-family: var(--ff-ui);
        font-size: var(--fs-1);
        line-height: var(--lh-ui);
    }

    .menu[data-state="open"] {
        animation: menu-in var(--duration-base) var(--ease-out);
    }

    .item {
        border-radius: var(--radius-sm);
        padding: var(--space-sm) var(--space-medium);
    }

    /* keyboard + pointer highlight comes through the same attribute */
    .item[data-highlighted] {
        background-color: color-mix(in oklch, var(--hue-z2-bg) 88%, var(--hue-z0-fg));
    }

    .item[data-disabled] {
        opacity: 0.5;
    }

    @keyframes menu-in {
        from {
            opacity: 0;
            translate: 0 calc(-1 * var(--space-xs));
        }
    }
</style>
```

## State-attribute cheat sheet

| Attribute | Emitted by | Style it for |
|---|---|---|
| `data-state="open\|closed"` | Dialog, Popover, Menu, Select, Accordion, Collapsible, Tooltip | enter/exit animation, trigger styling |
| `data-state="checked\|unchecked\|indeterminate"` | Checkbox, Switch, Radio | control fill/thumb |
| `data-state="active\|inactive"` | Tabs | active tab |
| `data-highlighted` | Menu/Select/Combobox items | keyboard + hover highlight (use it, not `:hover`) |
| `data-disabled` | most primitives | reduced opacity; never remove the focus ring |
| `data-orientation` | Menu, Tabs, Slider, Separator | direction-specific layout |
