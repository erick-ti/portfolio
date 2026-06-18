import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Update `site` to your real domain before deploying.
export default defineConfig({
  site: 'https://erickti.dev',
  integrations: [mdx(), sitemap()],
});
