# Erick Ti — Portfolio

A custom-designed, custom-built portfolio site. Built from scratch with
[Astro](https://astro.build) — content-driven, so adding a project is a
one-file change.

**Aesthetic:** a dark "developer instrument" theme — editorial serif
display (Instrument Serif) paired with a technical monospace voice
(IBM Plex Mono), hairline grid, one warm signal accent.

---

## Quick start

Requires Node 22.12+ (Astro 6 dropped Node 18 and 20).

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build to ./dist
npm run preview  # preview the production build
```

---

## Adding a project — the whole workflow

This is the point of the architecture: **a new project is one Markdown
file.** You never touch layout code.

1. Create `src/content/projects/your-project.md`.
2. Fill in the frontmatter (validated at build time — a missing field
   fails the build, so a half-finished entry can never ship):

```markdown
---
title: 'Project Name'
tagline: 'One recruiter-friendly sentence about what it is.'
category: 'AI Systems'          # or Product / Full-Stack | Data & Operations | Developer Tools
status: 'Shipped'               # or In Progress | Archived
visibility: 'public'            # public | private-production | concept  (drives the access badge)
featured: true                  # surfaces on the homepage (keep this to ~3)
order: 1                         # lower = earlier everywhere
timeframe: '2024 — Present'
role: 'Sole engineer'
stack: ['Python', 'FastAPI', 'PostgreSQL']
metrics:
  - { value: '80%', label: 'faster report generation' }
  - { value: '50+', label: 'internal users' }
links:                            # all optional — internal projects omit these
  live: 'https://...'
  repo: 'https://github.com/...'
# --- media: all optional. Put files in public/; cards look intentional without them.
coverImage: '/projects/name/cover.webp'   # card thumbnail + project page hero
coverAlt: 'Short description of the cover image'
ogImage: '/og/name.png'                    # social-share preview image
screenshots:
  - { src: '/projects/name/01.webp', alt: 'What it shows', caption: 'Optional caption' }
draft: false                     # set true to hide without deleting
---

## Context
The Markdown body is the long-form case study. Recommended sections:
Context, What I Built, Architecture, Technical Highlights, Tradeoffs,
Outcome.
```

`visibility` controls an honest access badge — `public` for a repo or
live site, `private-production` for real internal systems with no link,
`concept` for personal/experimental work. The media fields are optional:
leave them off until you have real artwork and the text-only cards still
look deliberate.

3. That's it. The homepage, the filterable Work index, the category
   "lane" counts, and a full `/projects/your-project` case-study page
   are all generated automatically.

The schema lives in `src/content.config.ts` — edit it there if you want
new fields or categories.

---

## Project structure

```
src/
  content.config.ts        # the project schema (typed content model)
  content/projects/        # one .md file per project  <- add here
  layouts/BaseLayout.astro # shell: fonts, meta, header/footer, reveal JS
  components/              # Header, Footer, ProjectCard
  pages/
    index.astro            # homepage
    projects/index.astro   # filterable work index
    projects/[slug].astro  # generated case-study pages
    about.astro
  styles/global.css        # the design system (CSS variables live here)
public/
  favicon.svg
  resume.pdf               # <- replace with your real resume
```

---

## Customizing

- **Colors / type:** all CSS variables are at the top of
  `src/styles/global.css`.
- **Domain:** update `site` in `astro.config.mjs` and the URL in
  `public/robots.txt` before deploying.
- **Resume:** drop your real file at `public/resume.pdf`.
- **Contact links:** edit `src/components/Footer.astro` and the quick
  panel in `src/pages/about.astro`.
- **Copy:** the project case studies and the About page bio are
  placeholder drafts — rewrite in your own voice; the layout holds.

---

## Deploying

Static output — host it free anywhere. Recommended: push to GitHub and
connect the repo to **Cloudflare Pages**, **Vercel**, or **Netlify**.
Build command `npm run build`, output directory `dist`. Auto-deploys on
every push.

---

Designed and built from scratch with Astro.
