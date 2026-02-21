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
- `src/_11ty/` - Eleventy filters and collections
- `src/_data/site.js` - Global config (URL, title, description)
- `.eleventy.js` - Build configuration
- `public/` - Generated output (don't edit)

## Key Patterns

**Posts** go in `src/content/posts/` as markdown. Set `draft: true` to hide from build.

**CSS uses tokens** - Two files: `tokens-primitive.css` (raw colors/spacing) and `tokens-semantic.css` (meaningful names like `--color-text`, `--color-link`). Use semantic tokens in styles.

**Templates** are Nunjucks. Access posts via `collections.posts`. Custom filters in `src/_11ty/filters/`.

**URLs**: Posts publish to `/journal/[slug]/`, archive at `/blog/`.

## Non-Obvious

- `ELEVENTY_ENV` controls dev vs prod (affects site URL in `_data/site.js`)
- Decap CMS admin at `/admin/` - config in `src/admin/config.yml`
- Post images go in `src/assets/i/`
- `crawl: "false"` in frontmatter excludes from search indexes
