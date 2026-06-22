import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * The `projects` collection is the heart of the site.
 *
 * To add a new project: drop a `.md` (or `.mdx`) file into
 * `src/content/projects/`. The frontmatter below is validated at build
 * time — if a required field is missing the build fails loudly, so the
 * site can never ship a half-finished project entry.
 *
 * The Markdown body holds the long-form case study (Context, What I
 * Built, Architecture, Technical Highlights, Tradeoffs, Outcome).
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    // --- identity -----------------------------------------------------
    title: z.string(),
    tagline: z.string(), // one clear sentence

    // --- classification ----------------------------------------------
    // category drives the filter "lanes" on the Work page.
    category: z.enum([
      'AI Systems',
      'Product / Full-Stack',
      'Data & Operations',
      'Developer Tools',
    ]),
    status: z.enum(['Shipped', 'In Progress', 'Archived']),

    // --- placement ----------------------------------------------------
    featured: z.boolean().default(false), // surfaces on the homepage
    order: z.number().default(99), // lower = earlier

    // --- context ------------------------------------------------------
    timeframe: z.string(), // e.g. "2024 — Present"
    role: z.string(), // e.g. "Sole engineer"
    org: z.string().optional(), // employer for non-personal work, e.g. "CelLink"
    stack: z.array(z.string()),

    // --- quick-glance metrics (rendered as the stat row) -------------
    metrics: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .default([]),

    // --- links (all optional — internal projects often have none) ----
    links: z
      .object({
        live: z.string().url().optional(),
        repo: z.string().url().optional(),
        writeup: z.string().url().optional(),
      })
      .default({}),

    // --- media (all optional — text-only cards still look intentional) -
    // Paths point at files in `public/`, e.g. '/projects/otis/cover.webp'.
    // Leave unset until you have real artwork; the UI degrades gracefully.
    coverImage: z.string().optional(), // card thumbnail + project hero
    coverAlt: z.string().optional(), // alt text for the cover image
    ogImage: z.string().optional(), // social-share preview image
    screenshots: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        })
      )
      .default([]),

    // --- visibility — drives an honest access badge -----------------
    // public             : public repo or live site to look at
    // private-production : real production system, internal, no link
    // concept            : personal / experimental, not yet public
    visibility: z
      .enum(['public', 'private-production', 'concept'])
      .default('public'),

    // hide a project without deleting it
    draft: z.boolean().default(false),
  }).refine((data) => !data.coverImage || Boolean(data.coverAlt), {
    message: 'coverAlt is required when coverImage is set',
    path: ['coverAlt'],
  }),
});

export const collections = { projects };
