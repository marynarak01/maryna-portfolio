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
├── project-pagecraft.html
├── project-roots.html
├── project-help-center.html
├── project-marginalia.html
├── project-design-system.html
├── css/
│   ├── global.css          ← tokens, nav/footer, shared .page-hero + .cs-hero
│   ├── design-system.css   ← Ink design-system page
│   ├── marginalia.css      ← marginalia accent (coral)
│   └── pagecraft.css       ← pagecraft accent (mint)
├── js/
│   └── include.js          ← injects partials/header + footer
├── partials/
│   ├── header.html
│   └── footer.html
└── images/                 ← see "Images you must add" below
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

## ⬜ Images you must add to images/  (naming must match EXACTLY)
Already included: project-design-system-1.png … -8.png

You need to drop these in (same folder, same names):
- project-pagecraft-1.png … -6.png   (hero uses -1; page uses -1..-5; card uses -1)
- project-roots-1.png … -5.png
- project-help-center-1.png … -9.png
- project-marginalia-1.png … -6.png
- favicon.ico            → images/favicon.ico   (referenced by every page)

## ⬜ Other files to add at root
- Maryna_Rak_CV.pdf      (linked from about page + footer)

## ⬜ Links still to fill (project-design-system.html)
Five  href="#"  placeholders: 2 in the hero (documentation, example page),
1 mid-page (documentation), 2 inline component links (button, input).
