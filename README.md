# maryna-portfolio — clean build

Static HTML portfolio. No build step. Plain HTML + CSS + a tiny JS include for
the shared nav/footer.

## Structure
```
/
├── index.html
├── about.html
├── projects.html
├── contact.html
├── online-stores.html
├── project-*.html
├── css/
│   ├── global.css          ← shared styles
│   └── *.css               ← project-specific styles
├── js/
│   └── *.js
├── partials/
│   ├── header.html
│   └── footer.html
├── showcase/               ← design-system examples
└── images/                 ← portfolio project images
```

## What changed in this clean build
- **Deduped hero CSS** — the repeated hero blocks that lived inline in every page
  were pulled into `css/global.css` as two shared classes:
  - `.page-hero`  → about, projects, contact
  - `.cs-hero`    → all project case-study pages
  Per-page tweaks (the bigger Ink hero, project accent colours) stay inline.
- **Added the Ink Design System** case study (`project-design-system.html`,
  `css/design-system.css`, `images/project-design-system-1..8.png`) and its card
  on `index.html` + `projects.html`.
- **Fixed a markup bug** in the original `index.html` (a broken `</diiv>` tag and
  an unclosed `.help-grid` div).

## Run locally
Must be served (the nav/footer load via fetch, blocked on file://):
```
python3 -m http.server 8000
```
then open http://localhost:8000/

## Assets and links
The project images, favicon, and CV referenced by the portfolio are included in
the repository. The Design System documentation, example page, and button
guidelines link to their local showcase pages.
