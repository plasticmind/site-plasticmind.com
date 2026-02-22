# Plasticmind.com v2

Personal blog for Jesse Gardner. Eleventy static site, vanilla CSS, Markdown content.

## Commands

```bash
npm start          # Dev server at localhost:8080
npm run build:prod # Production build
```

## Structure

- `src/content/posts/*.md` - Blog posts (frontmatter: title, date, description, tags, draft, crawl)
- `src/_includes/layouts/` - Nunjucks templates (base.njk, post.njk)
- `src/_includes/partials/` - Reusable template parts
- `src/assets/css/` - Stylesheets (global.css + token files)
- `src/_11ty/filters/` - Eleventy filters (date, slugify, groupByYear, etc.)
- `src/_11ty/collections/` - Custom collections (posts, tagList, categoryList)
- `src/_data/site.js` - Global config (URL, title, description)
- `.eleventy.js` - Build configuration
- `public/` - Generated output (don't edit)

## Key Patterns

**Posts** go in `src/content/posts/` as markdown. Set `draft: true` to hide from build.

**CSS uses tokens** - Two files: `tokens-primitive.css` (raw colors/spacing) and `tokens-semantic.css` (meaningful names like `--color-text`, `--color-link`). Use semantic tokens in styles.

**Templates** are Nunjucks. Access posts via `collections.posts`. Custom filters in `src/_11ty/filters/`.

**URLs**: Posts publish to `/journal/[slug]/`, archive at `/blog/`. Tag archives at `/tags/[slug]/`, category archives at `/category/[slug]/`.

## Post Frontmatter

Key fields beyond basics:
- `slug` - Used for permalink (falls back to slugified title if missing)
- `primary_category` - Main category for post (displayed bold, linked to category archive)
- `tags` - Array of tags (linked to tag archives)
- `context` - "personal" or "professional" (affects archive banner messaging)
- `archive` - Set to `true` for older posts that need caveat banner
- `featured_image_url` - Hero image for post

## YAML Frontmatter Gotchas

WordPress imports often have YAML issues. These fields should ALWAYS be quoted:
- `title`, `subtitle`, `excerpt`, `meta_description`, `alt_text`

Special characters that break YAML if unquoted:
- Colons (`:`) - interpreted as key-value separator
- Asterisks (`*`) - interpreted as alias reference
- Pipes (`|`) - interpreted as multiline literal
- Hash (`#`) - interpreted as comment
- Ampersand (`&`) - interpreted as anchor

## Tag & Category Archives

- Tag/category descriptions stored in `src/_data/categoryDescriptions.json` and `src/_data/tagDescriptions.json`
- Templates at `src/content/tags/tags.njk` and `src/content/categories/categories.njk`
- Posts display primary_category (bold) followed by tags in footer, all linked to archives
- Tag links use `rel="tag"` for SEO (microformat indicating topic relationship)
- `slugify` filter converts names to URL-safe slugs in templates

## Eleventy Data Files

- **Use JSON, not YAML** - Eleventy doesn't parse `.yml` files without additional config; `.json` works natively
- **Avoid naming collisions** - Don't name data files the same as frontmatter fields (e.g., `tags.json` conflicts with `post.data.tags`). Use specific names like `tagDescriptions.json`

## Non-Obvious

- `ELEVENTY_ENV` controls dev vs prod (affects site URL in `_data/site.js`)
- Decap CMS admin at `/admin/` - config in `src/admin/config.yml`
- Post images go in `src/assets/i/`
- `crawl: "false"` in frontmatter excludes from search indexes
- Permalink generation in `src/content/posts/posts.11tydata.js` uses `slug` field with slugified title fallback
- Archive banner dismissal stored in localStorage as `archive-banner-dismissed-{slug}`
- Header is fixed at top (z-index 150), archive banner is z-index 200
- Dark surface styles: use `--color-surface-dark` bg with `--color-text-light` text (see footer)
- CSS Grid `align-items: stretch` makes child elements fill container height naturally (used for timeline bars that scale with content)
