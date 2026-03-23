# Plasticmind.com v2

Personal blog for Jesse Gardner. Eleventy static site, vanilla CSS, Markdown content.

## Commands

```bash
npm start          # Dev server at localhost:8080
npm run build:prod # Production build
```

## Structure

- `src/content/posts/*.md` - Blog posts
- `src/_includes/layouts/` - Nunjucks templates (base.njk, post.njk)
- `src/_includes/partials/` - Reusable template parts
- `src/assets/css/` - Stylesheets (global.css, tokens-primitive.css, tokens-semantic.css, prism.css)
- `src/_11ty/filters/` - Eleventy filters
- `src/_11ty/collections/` - Custom collections (posts, tagList, categoryList)
- `src/_data/` - Global data (site.js, categoryDescriptions.json, tagDescriptions.json)
- `.eleventy.js` - Build configuration with plugins
- `public/` - Generated output (don't edit)

## Key Patterns

**Posts**: Set `draft: true` to hide from build. URLs publish to `/journal/[slug]/`.

**CSS tokens**: Use semantic tokens (`--color-text`, `--color-link`) not primitives. Brand pink is `--coral-500`.

**Templates**: Nunjucks. Access posts via `collections.posts`.

**Theme system**: Three modes (light/system/dark) stored in localStorage. `data-theme` on `<html>` is resolved value, `data-theme-pref` is user preference.

**Code blocks**: Prism.js via `@11ty/eleventy-plugin-syntaxhighlight` for fenced Markdown blocks. Legacy `<pre><code>` blocks (from WP migration) get client-side highlighting via `prism-legacy.js` — only loaded on pages that need it. Auto-detects CSS, JS, or markup.

**SVG icons**: Use `currentColor` for adaptive fills, `var(--color-surface)` for knockout areas.

## Taxonomy

**Categories** (18): Uppercase in frontmatter, displayed lowercase. Defined in `categoryDescriptions.json` (keyed by slug). Category pages at `/category/{slug}/`.

**Tags** (13): Always lowercase in frontmatter. Defined in `tagDescriptions.json`. Tag pages at `/tags/{slug}/`. Tags cross-cut categories (e.g., `design systems` and `ai` span multiple categories).

**Journal page**: `/journal/` (renamed from `/blog/`). Shows title + hashtag category + subtitle + date. `/blog/` redirects to `/journal/`.

## Post Frontmatter

- `slug` - Permalink (falls back to slugified title)
- `primary_category` - Main category, uppercase (bold in footer, displayed lowercase)
- `tags` - Array of tags, always lowercase
- `context` - "personal" or "professional" (affects archive banner)
- `archive` - Set `true` for older posts needing caveat banner
- `featured_image_url` - Hero image
- `crawl: "false"` - Excludes from search indexes

## Assets

Post images go flat in `src/assets/i/` (served at `/assets/i/`). No subdirectories except `logos/`. WP assets dump at `/tmp/plasticmind-com-assets/` for reference. Run `node scripts/asset-check.js --missing-only` to find broken image refs.

## Gotchas

**YAML**: Always quote `title`, `subtitle`, `excerpt`, `meta_description`. Special chars (`: * | # &`) break unquoted values.

**Markdown**: Headings must start at column 1 (no leading whitespace). HTML block elements (`<blockquote>`, `<img>`, `<div>`) need blank lines before and after them or Markdown won't process adjacent content.

**Eleventy data files**: Use JSON not YAML. Avoid naming collisions with frontmatter fields (use `tagDescriptions.json` not `tags.json`).

**Redirects**: `src/_redirects` has 183 rules covering WP migration + category/tag consolidation. Cloudflare Pages and Netlify both support this format. Max 2000 rules.

## Non-Obvious

- `ELEVENTY_ENV` controls dev vs prod (affects site URL)
- Post images go in `src/assets/i/`
- Permalink generation in `src/content/posts/posts.11tydata.js`
- Archive banner dismissal stored in localStorage as `archive-banner-dismissed-{slug}`
- Header z-index 150, archive banner z-index 200
- `.u-visually-hidden` hides visually but keeps accessible to screen readers
