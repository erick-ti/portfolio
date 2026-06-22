# Erick Ti · Portfolio

My personal portfolio: a custom-designed, custom-built static site for my work
and case studies, made from scratch with [Astro](https://astro.build). It is
content-driven, so adding a project is a one-file change and the layouts never
need to be touched.

## Stack

- **Astro 6** with typed content collections, validated at build time
- **Hand-written CSS** with centralized design tokens, no UI framework
- **Self-hosted fonts** via `@fontsource` (Instrument Serif for display, Hanken
  Grotesk for body text, IBM Plex Mono for the technical voice) and an
  `@astrojs/sitemap` integration
- Static output, deployed on **Vercel**

Requires Node 22.12+ (Astro 6 dropped Node 18 and 20).

## Develop

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build to ./dist; also validates the content schema
npm run preview  # preview the production build
```

## How it is organized

Every project is a single Markdown file in `src/content/projects/`. The
frontmatter is validated at build time against a Zod schema, so a missing or
malformed field fails the build instead of shipping broken. The Markdown body
holds the long-form case study: Context, What I Built, Architecture, Technical
Highlights, Tradeoffs, Outcome. From that content the site generates the
homepage, the filterable Work index, the category counts, and every
`/projects/<slug>` case-study page.

```
src/
  content.config.ts        # the project schema (typed content model)
  content/projects/        # one .md file per project
  layouts/BaseLayout.astro # shell: fonts, meta, header/footer, reveal JS
  components/              # Header, Footer, ProjectCard, FoilAppraisalCard, IntroSequence
  pages/
    index.astro            # homepage
    projects/index.astro   # filterable work index
    projects/[slug].astro  # generated case-study pages
    about.astro
  styles/global.css        # the design system; CSS variables live here
public/                    # images, resume, favicon, robots
```

The `visibility` field on each project drives an honest access badge: `public`
for work with a live site or repo, `private-production` for real internal
systems shown without a link, and `concept` for personal or experimental builds.

## Design

A dark "developer instrument" theme: an editorial serif display paired with a
monospace technical voice, a hairline grid, and a single warm amber accent, with
a second green accent reserved for live status. The design tokens all live at
the top of `src/styles/global.css`.

## Deploy

Static output, so it can be hosted anywhere. This site builds with
`npm run build` (output in `dist/`) and deploys automatically on push to Vercel.
