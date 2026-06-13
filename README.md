# Maryna Rak — Portfolio Website

A static portfolio site for a Senior Product Designer. Plain HTML + CSS, no build step, no framework. Every page is a standalone `.html` file with its CSS inline in a `<style>` block, and references images from the shared `images/` folder.

## Structure

```
maryna-portfolio/
├── index.html              # Home (hero, project highlights, services, process, about, FAQ, contact)
├── projects.html           # Full project archive + Claude-skills section + Figma link
├── about.html              # About / CV page + FAQ + CV download
├── contact.html            # Contact page (email + LinkedIn)
├── project-help-center.html  # Case study — Support Contact Flow (Ubisoft)
├── project-roots.html        # Case study — Roots Marketplace (CMS + storefront)
├── project-pagecraft.html    # Case study — Pagecraft (shipped AI product)
├── project-marginalia.html   # Case study — Marginalia (concept, book discovery)
├── images/                 # All images (PNG), referenced as images/<name>.png
├── Maryna_Rak_CV.pdf       # CV, linked from About + footers
└── README.md
```

## Running locally

No build needed. Serve the folder with any static server, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Opening `index.html` directly via `file://` mostly works, but a local server is recommended so relative links and the CV download behave correctly.)

## Deploying

It's a static site — drop the whole folder on any static host:
- **Netlify / Vercel:** drag-and-drop the folder, or connect a Git repo. No build command; publish directory is the folder root.
- **GitHub Pages:** push to a repo, enable Pages on the root.

## Design system (kept consistent across pages)

- **Fonts:** Inter (sans) + JetBrains Mono (mono labels), loaded from Google Fonts.
- **Color tokens** (CSS variables in each page's `:root`):
  - `--accent: oklch(0.5 0.22 264)` — site blue (links, eyebrows)
  - `--ink: oklch(0.145 0.012 264)` — near-black (dark sections, buttons)
  - `--muted-foreground: oklch(0.44 0.02 260)` — secondary text
  - `--border: oklch(0.92 0.006 255)`, `--surface: oklch(0.985 0.003 250)`
  - Per-project accents: Marginalia uses coral `oklch(0.68 0.17 35)`; Pagecraft uses mint `oklch(0.6 0.13 165)`.
- **Nav (consistent on every page):** brand "Maryna / Product Designer" on the left; links **Projects · About · Contact** (Contact is the dark pill CTA) on the right; a `☰` button toggles `#mobileMenu` under 760px.
- **Footer (consistent):** © line + LinkedIn · Email · Figma · CV.

## Known placeholders to fill in

These are intentionally stubbed — search for them and replace:

- **Figma links** — every footer "Figma" link and the "See more on Figma" button on `projects.html` point to `href="#"`. Replace with the real Figma profile/file URL.
- **Prototype / demo links** — `project-marginalia.html` ("See the prototype") and `project-pagecraft.html` ("See it work — prototype", hero "See how it works") point to `href="#"`. Replace with the live prototype/demo URLs (e.g. a Figma prototype embed link or a hosted demo).
- **CV** — `Maryna_Rak_CV.pdf` is the current CV. Replace the file (keep the name) to update it everywhere at once.
- **Hero preview images** — the project case studies use composed hero images already; swap any in `images/` as better versions become available.

## Common edits

**Add a new project**
1. Duplicate an existing `project-*.html` as a template (Pagecraft/Roots are the most full-featured).
2. Add its image(s) to `images/`.
3. Add a project card to **both** `projects.html` (full archive) and, if it's a highlight, `index.html` (home shows a curated few).

**Change the nav or footer**
Currently the nav/footer markup is copied into each page. If you change it, change it in every `.html` file. (See "Suggested next step" below.)

**Edit copy or images**
Open the relevant `.html`, edit text inline; swap an image by replacing the file in `images/` or updating the `src`.

## Suggested next step (refactor opportunity)

Right now each page carries its own CSS inline and its own copy of the nav/footer. A clean improvement for maintainability:
1. Extract the shared design tokens + base styles into `css/style.css` and link it from every page; keep only page-specific overrides inline (the project pages have unique accent colors and a few bespoke sections).
2. Factor the nav/footer into a small JS include or a templating step so they live in one place.

This wasn't done in the initial build to avoid risking the per-page custom styling; it's a safe, well-scoped task to do with proper local testing.

---

Built iteratively. All copy is the designer's own; images are real product/screenshot exports. Questions: maryna.rak01@gmail.com
