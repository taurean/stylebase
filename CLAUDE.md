# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `npm run build`: Builds minified CSS to `dist/stylebase.min.css`
- `npm run build:preview`: Builds non-minified CSS to `dist-preview/stylebase.css`

## Code Style Guidelines
- CSS is organized using cascade layers: `@layer webfont, token, defaults, utility, composition`
  - `webfont`: Only for webfont imports
  - `token`: Only for defining design tokens/variables, no classes
  - `defaults`: Only for styling HTML elements, not classes
  - `utility`: Utility classes with namespaced format using escaped colons
  - `composition`: Layout classes with namespaced format using escaped colons
- CSS variables use kebab-case with `--` prefix (e.g., `--step-0`, `--waterfall-gap`)
- Class naming follows namespaced format with escaped colons (e.g., `l\:waterfall`) only for layouts and utilities
- Use 4-space indentation in all CSS files
- Include descriptive comments for CSS variables, showing their responsive ranges
- Fluid typography uses `clamp()` for responsive sizing
- Import modules with their appropriate layer: `@import "module/file.css" layer(layername)`
- Maintain version information in banner comment (handled by PostCSS config)
- Files should only contain CSS related to their specific purpose (follow single responsibility)