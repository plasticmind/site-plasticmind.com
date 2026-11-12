# Plasticmind.com v2

Personal blog for Jesse Gardner. Eleventy static site, vanilla CSS, Markdown content.

## Commands

```bash
npm start          # Dev server at localhost:8080
npm run build:prod # Production build
```

## Hosting and deploys

**Cloudflare Pages serves plasticmind.com.** It's the Pages project `plasticmind-com`. In Cloudflare DNS, `plasticmind.com` and `www` are proxied CNAMEs to `plasticmind-com.pages.dev` (confirmed November 11, 2026).

**Netlify doesn't serve this site,** even though it looks like it might:
- A Netlify project named "plasticmind" builds every push to `main` and labels each build "Production." Those builds only update `plasticmind.netlify.app`. No DNS record sends plasticmind.com traffic there.
- `netlify.toml` and `.netlify/` only configure that Netlify project.
- Cloudflare does proxy to Netlify for other subdomains (`books.`, `kiosk.`). That's the source of the "Cloudflare in front of Netlify" mix-up.
- Plan as of November 11, 2026: disconnect the Netlify "plasticmind" project from GitHub so each push builds once.

**Publishing:** commit to `main` and push. Pages usually goes live in about 70 seconds.

**Checking a deploy:**
- Read the "Cloudflare Pages" check on the commit in GitHub, or run `npx wrangler pages deployment list --project-name plasticmind-com`. If Wrangler says "Failed to fetch auth token," run `npx wrangler login`.
- The "pages-build-deployment" GitHub Pages check fails on every commit (Jekyll can't build Nunjucks). Ignore it.
- To confirm which host answers a URL, request `/.netlify/images?url=/assets/i/jesse-gardner.jpg&w=20` on it. Pages returns 404; Netlify returns an image.

**Before you push a renamed file:** `git mv` stages the rename but not edits you made to the file before the move. Run `git add` on the new path, or check `git show HEAD:<path>` after committing.

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

## Layout & Navigation

**Shell**: `base.njk` wraps everything in `.l-shell[data-drawer]` → left drawer + `main.l-main` + right drawer + footer.

**Header** (`partials/site-header.njk`): Fixed header with Plasticmind pill logo. Mini-menu dropdown (Journal, Work, Archives). Menu button opens left drawer.

**Drawers** (`partials/drawer-left.njk`, `drawer-right.njk`): Left drawer has nav links + search UI + theme/text controls. Right drawer is settings. Managed by `global.js` via `data-drawer-target` buttons, `inert` attribute, keyboard shortcuts (`[`/`]` to toggle, `Escape` to close).

**Search UI** (already scaffolded, no backend): In `drawer-left.njk` — a bottom drawer (`#search-drawer`) with `<input type="search">`, submit button, and `#search-results` container. Styled as `.l-bottom-drawer` / `.c-search-form`. Needs a search engine wired up.

**Post count**: ~599 posts as of March 2026.

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
- `featured_image_url` - Hero image, also the share-card image (falls back to the post's first image, then the logo)
- `meta_description` - Search snippet. Falls back to `excerpt`, then `subtitle`, then the post's opening text
- `seo_title` - Overrides the whole `<title>` (use it to tell apart posts that share a title)
- `noindex: true` - Keeps the post on the site and in site search, but out of search engines and the sitemap. Set on 81 short personal posts from 2015 and earlier
- `crawl: "false"` - Hides the page from search engines, the sitemap, and site search

## Assets

Post images go flat in `src/assets/i/` (served at `/assets/i/`). No subdirectories except `logos/`.

**After adding a JPEG or PNG, run `node scripts/optimize-images.js`** and commit what it writes. It makes WebP copies (full size and `-800w`) and updates `src/_11ty/image-manifest.json`. The `pictures` transform in `.eleventy.js` uses the manifest to wrap images in `<picture>` and set width and height. An image missing from the manifest still works, without WebP. Give every content image alt text. WP assets dump at `/tmp/plasticmind-com-assets/` for reference. Run `node scripts/asset-check.js --missing-only` to find broken image refs.

## Gotchas

**YAML**: Always quote `title`, `subtitle`, `excerpt`, `meta_description`. Special chars (`: * | # &`) break unquoted values.

**Markdown**: Headings must start at column 1 (no leading whitespace). HTML block elements (`<blockquote>`, `<img>`, `<div>`) need blank lines before and after them or Markdown won't process adjacent content.

**Eleventy data files**: Use JSON not YAML. Avoid naming collisions with frontmatter fields (use `tagDescriptions.json` not `tags.json`).

**Redirects**: `src/_redirects` has 183 rules covering WP migration + category/tag consolidation. Cloudflare Pages and Netlify both support this format. Max 2000 rules.

## Filters & Collections

**Filters** (`src/_11ty/filters/`): `excludeDrafts`, `excludeFuture`, `excludeNoIndex` (crawl: "false"), `relatedPosts` (by tags/categories), `postsByMonthYear`, date formatters (`dateISO`, `dateFull`, `dateShort`).

**Collections** (`src/_11ty/collections/`): `posts.js` (filtered, sorted newest-first), `tagList.js`, `categoryList.js`, `sitemapHubs.js` (tag, category, and section pages for the sitemap).

## Non-Obvious

- `ELEVENTY_ENV` controls dev vs prod (affects site URL)
- Post images go in `src/assets/i/`
- Permalink generation in `src/content/posts/posts.11tydata.js`
- Archive banner dismissal stored in localStorage as `archive-banner-dismissed-{slug}`
- Header z-index 150, archive banner z-index 200
- `.u-visually-hidden` hides visually but keeps accessible to screen readers
- `global.js` handles drawer state, theme toggle, text size/line-height controls
- Fonts: Bricolage Grotesque (headings), Instrument Sans (body), Roboto Mono (code). Self-hosted in `src/assets/fonts/` (`fonts.css`), not loaded from Google Fonts
- Structured data (Person, BlogPosting, ProfilePage) lives in `partials/structured-data.njk`; the bio and profile links it uses are `site.author` in `src/_data/site.js`
- Google Analytics loads after the page's `load` event (see `head-meta.njk`)
- Spacing tokens: `--space-xs` through `--space-xl`; border radius: `--radius-sm`, `--radius-lg`, `--radius-round`
