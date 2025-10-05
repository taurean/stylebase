# stylebase
[![NPM Version](https://img.shields.io/npm/v/%40taurean%2Fstylebase?style=flat-square&logo=npm&logoColor=%23CB3837&label=NPM%20version%20%20%20%20&labelColor=%23ECEBEB)](https://www.npmjs.com/package/@taurean/stylebase) [![GitHub commit activity](https://img.shields.io/github/commit-activity/y/taurean/stylebase?style=flat-square)](https://github.com/taurean/stylebase) [![GitHub Repo stars](https://img.shields.io/github/stars/taurean/stylebase?style=flat-square)](https://github.com/taurean/stylebase)


An extremely barebones CSS framework(?) with utility classes, layout classes, design patterns, and design tokens for modern web development.

## Installation

**NPM (recommended):**
```bash
npm i @taurean/stylebase
```

**Direct download:**
Download `stylebase.min.css` from the [latest release](https://github.com/taurean/stylebase/releases) or use the file in `dist/`.

## Usage

Import globally **once** in your project as one of the earliest CSS files. This ensures design tokens and utility classes are available throughout your application.

```css
@import '@taurean/stylebase';
```

**Important:** Only import once to avoid duplicate styles and ensure proper cascade order.

## What's Included

- **Color system** - Complete OKLCH color palette with 11 shades per hue
- **Fluid typography** - Responsive font sizes using clamp()
- **Fluid spacing** - Responsive spacing scale using clamp()
- **CSS Grid layout** - 12-column grid with responsive gutters
- **Layout utilities** - Waterfall spacing, root container, grid helpers
- **Sensible defaults** - Base styles for HTML elements

Built from best practices and resources including [Evil Martians' Harmony color palette](https://evilmartians.com/opensource/harmony), [Cube CSS methodology](https://cube.fyi), and [Utopia fluid scales](https://utopia.fyi).


## contributing to stylebase + publishing changes
once changes are merged into `main`, run one of the release scripts (`npm run release:patch`, `npm run release:minor`, or `npm run release:major`) to minify CSS, update package.json version, and publish changes to [NPM](https://www.npmjs.com/package/@taurean/stylebase)

- use `npm run build` to update the minified CSS in `dist/`, useful for testing output before publishing
- use `npm run build:preview` to update a non-minified css file in `dist/`
- use `npm run dev` for live reload via browsersync, to test the example HTML files while making style changes. (files in `examples/` do not themselves have CSS files. The html files assume to be impacted by global CSS properties and utility classes built into stylebase)
- using release scripts assumes that the remote url for the main releases is labeled `gh`
