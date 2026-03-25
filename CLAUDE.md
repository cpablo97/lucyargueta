# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for Lucy Argueta (artist/designer). No build tools, bundlers, or package manager — pure HTML/CSS/JS served directly from the filesystem or a simple web server.

## Development

Open `index.html` directly in a browser, or serve locally:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

No install, build, or test steps exist.

## Architecture

### Pages
- `index.html` — landing page with animated project grid
- `projects/proyecto-{1-6}.html` — individual project detail pages (template-based, galleries mostly empty)

### Styles
Two separate CSS files with distinct approaches:
- `style.css` — main landing page; hardcoded values, grid animation logic
- `project.css` — project detail pages; uses CSS custom properties (`--color-accent`, `--gutter`, etc.)

Prefer the CSS variables approach from `project.css` when adding new styles. The accent color is `#ff2200`.

### JavaScript
`slides.js` — single vanilla JS file handling:
1. Auto-rotating grid layout (pattern array of `fr` column configurations, cycles every 2s)
2. Blob background animation (random position updates every 3s)
3. "Next slide" button (`#next-slide`)

No external libraries or frameworks.

### Assets
- `assets/` — project images
- `artbo[1-6].webp` — hero/grid images for landing page
- `ArchivoBlack-Regular.ttf`, `VinaSans-Regular.ttf` — self-hosted fonts

### Responsive breakpoints
Both CSS files share the same four-tier system:

| Token | Max-width | Target |
|-------|-----------|--------|
| `lg`  | 1279px    | Small desktop / tablet landscape |
| `md`  | 1023px    | Tablet portrait |
| `sm`  | 767px     | Mobile (both orientations) |
| `xs`  | 479px     | Mobile portrait |

On `sm` and below the landing page grid animation is **disabled** — `.fotos` becomes a horizontal `scroll-snap` flex slider. The "Siguiente proyecto" button scrolls to the next card instead of triggering the grid pattern change. On resize, `slides.js` switches modes automatically via `matchMedia`.
