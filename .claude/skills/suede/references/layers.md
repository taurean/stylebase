# Layer recipes — overriding and theming suede-css

The bare layers (`token`, `default`, `utility`, `layout`) and unlayered CSS always beat the library, regardless of specificity. If an override isn't taking effect, the selector isn't matching; it's not a cascade problem.

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

Same-specificity selectors in `default` cleanly replace suede-css's (`suede-default`) versions.

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

`data-theme` on `<html>` forces a mode for the page; without it the OS preference applies. It also works on a subtree (see below).

```html
<html data-theme="dark">
```

```js
// 3-line toggle
const html = document.documentElement;
const next = html.dataset.theme === "dark" ? "light" : "dark";
html.dataset.theme = next; // remove the attribute to return to auto
```

On a subtree, `data-theme` switches what the tokens resolve to inside it, and nothing more. The mechanism is the inherited `color-scheme` property, which every `light-dark()` token follows. suede-css doesn't paint the themed element, because it can't know which surface it is (a page section, a card, a dialog). The element paints itself with the surface tokens it represents:

```css
.promo {
    background-color: var(--hue-z1-bg);
    color: var(--hue-z1-fg);
}
```

```html
<section class="promo" data-theme="dark">…</section>
```

Without those two declarations the section stays transparent over the light page, and its text keeps the color it inherited from `body`. Descendants that use tokens directly still switch. On `<html>` none of this is needed: `html` and `body` are already painted with the z0 surface.

## Scoped token overrides

Tokens are just custom properties — override them on any element, no layer needed:

```css
.marketing-hero {
    --fw-heading: var(--fw-bold);
    --waterfall-gap: var(--space-xl);
}
```

## Adding your own utilities/layouts

Put them in the bare `utility` / `layout` layers using the same escaped-colon convention if you want them to read as part of the system, or just write unlayered classes. Don't add to `suede-*`.
