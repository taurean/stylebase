# Layer recipes — overriding and theming stylebase

Stylebase declares this layer order (first line of its CSS):

```css
@layer webfont, stylebase-token, token, stylebase-default, default, stylebase-utility, utility, stylebase-layout, layout;
```

The library only writes into `stylebase-*` layers. Each bare name after it (`token`, `default`, `utility`, `layout`) is reserved for **you** and always wins against the library, regardless of selector specificity. Unlayered CSS beats every layer, so ordinary component styles (Svelte `<style>`, CSS modules) also always win. Consequence: **you never need `!important` against stylebase.** If an override isn't taking effect, the selector isn't matching — it's not a cascade problem.

## Override a default (element styling)

```css
/* your global stylesheet */
@layer default {
    h1 {
        letter-spacing: -0.02em;
    }

    a:not([class]) {
        text-decoration-thickness: 2px;
    }
}
```

Same-specificity selectors in `default` cleanly replace stylebase's (`stylebase-default`) versions.

## Retheme a token

```css
@layer token {
    :root {
        /* bold headings everywhere */
        --fw-heading: var(--fw-bold);

        /* rebrand the accent roles */
        --hue-focus-ring: light-dark(var(--hue-violet-600), var(--hue-violet-400));
        --hue-link: light-dark(var(--hue-violet-700), var(--hue-violet-300));

        /* long-form voice */
        --ff-content: var(--ff-transitional);
    }
}
```

Keep the `light-dark(light, dark)` shape when overriding semantic color tokens, or the token stops responding to theme changes.

## Manual theme toggle

`data-theme` on `<html>` — or **any subtree** — forces a mode; without it the OS preference applies:

```html
<html data-theme="dark">
```

```js
// 3-line toggle
const html = document.documentElement;
const next = html.dataset.theme === "dark" ? "light" : "dark";
html.dataset.theme = next; // remove the attribute to return to auto
```

Subtree theming works because the mechanism is the inherited `color-scheme` property: a `<div data-theme="dark">` renders its contents dark inside a light page.

## Scoped token overrides

Tokens are just custom properties — override them on any element, no layer needed:

```css
.marketing-hero {
    --fw-heading: var(--fw-bold);
    --waterfall-gap: var(--space-xl);
}
```

## Adding your own utilities/layouts

Put them in the bare `utility` / `layout` layers using the same escaped-colon convention if you want them to read as part of the system, or just write unlayered classes. Don't add to `stylebase-*`.
