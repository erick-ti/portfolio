# Erick Ti · Portfolio

My personal portfolio: a custom-designed, custom-built static site for my work
and case studies, made from scratch with [Astro](https://astro.build). It is
content-driven, so adding a project is a one-file change and the layouts never
need to be touched.

## Stack

- **Astro 7** with typed content collections, validated at build time
- **Hand-written CSS** with centralized design tokens, no UI framework
- **Self-hosted fonts** via `@fontsource` (Instrument Serif for display, Hanken
  Grotesk for body text, IBM Plex Mono for the technical voice) and an
  `@astrojs/sitemap` integration
- Static output, hosted on **Cloudflare Pages**

Use the exact Node version in `.node-version` and npm version in
`package.json` (`devEngines.packageManager`).

## Develop

```bash
fnm exec --using=.node-version make install smoke
fnm exec --using=.node-version make dev      # http://localhost:4321
fnm exec --using=.node-version make preview  # serve the built dist/
```

`make smoke` checks the runtime guard and builds the site, including content
schema validation. The Make commands refuse a mismatched Node/npm pair before
installing or building. Astro can keep dev and preview servers running in the
background. Stop them with `fnm exec --using=.node-version make dev-stop`
or `fnm exec --using=.node-version make preview-stop`; stopping the launching
shell does not stop a background server.

### Dependency installation

The project permits registry dependencies and requires an explicit decision for
each dependency install hook. The locked native packages build successfully
with their hooks denied. `npm: false` keeps ambient user/global hook approvals
from becoming the project's policy.

If an update introduces an unreviewed hook, use the pinned npm to install with
scripts disabled and list the hooks before deciding:

```bash
fnm exec --using=.node-version npm ci --ignore-scripts
fnm exec --using=.node-version npm install-scripts ls
```

Inspect the hook source, record a version-specific denial (or a necessary,
reviewed approval) in `allowScripts`, then rerun `make install smoke` with the
pinned runtime and normal script handling. A new hook version intentionally
requires review, including on Dependabot PRs. Do not blindly prune the sentinel
or bypass strict mode. Builds still execute dependency code; these controls
limit installation behavior and do not make dependencies trusted.

Review Node/npm releases during weekly maintenance. Adopt a new pair together
only after a clean locked install and build; update `.node-version`, engine
declarations and any root lockfile metadata together.

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
`npm run build` (output in `dist/`) and is served by Cloudflare Pages, which
rebuilds and redeploys on every push to `main`. `.node-version` selects the exact
Node release in CI and Pages; npm must match the manifest before install/build.
`public/_headers` keeps `/resume.pdf` out of search indexes.
