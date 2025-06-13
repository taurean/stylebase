# stylebase
[![NPM Version](https://img.shields.io/npm/v/%40taurean%2Fstylebase?style=flat-square&logo=npm&logoColor=%23CB3837&label=NPM%20version%20%20%20%20&labelColor=%23ECEBEB)](https://www.npmjs.com/package/@taurean/stylebase) [![GitHub commit activity](https://img.shields.io/github/commit-activity/y/taurean/stylebase?style=flat-square)](https://github.com/taurean/stylebase) [![GitHub Repo stars](https://img.shields.io/github/stars/taurean/stylebase?style=flat-square)](https://github.com/taurean/stylebase)


A CSS framework with functional utility classes, layout utilities, design patterns, and design tokens for modern web development.

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

Built from best practices and resources including Evil Martians' Harmony color palette, Every Layout patterns, Cube CSS methodology, and Utopia fluid scales.
