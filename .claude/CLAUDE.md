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

**Code blocks**: Prism.js via `@11ty/eleventy-plugin-syntaxhighlight`. Base `pre`/`code` styles in global.css handle legacy HTML blocks too.

**SVG icons**: Use `currentColor` for adaptive fills, `var(--color-surface)` for knockout areas.

## Post Frontmatter

- `slug` - Permalink (falls back to slugified title)
- `primary_category` - Main category (bold in footer)
- `tags` - Array of tags
- `context` - "personal" or "professional" (affects archive banner)
- `archive` - Set `true` for older posts needing caveat banner
- `featured_image_url` - Hero image
- `crawl: "false"` - Excludes from search indexes

## Gotchas

**YAML**: Always quote `title`, `subtitle`, `excerpt`, `meta_description`. Special chars (`: * | # &`) break unquoted values.

**Markdown**: Headings must start at column 1 (no leading whitespace).

**Eleventy data files**: Use JSON not YAML. Avoid naming collisions with frontmatter fields (use `tagDescriptions.json` not `tags.json`).

## Non-Obvious

- `ELEVENTY_ENV` controls dev vs prod (affects site URL)
- Post images go in `src/assets/i/`
- Permalink generation in `src/content/posts/posts.11tydata.js`
- Archive banner dismissal stored in localStorage as `archive-banner-dismissed-{slug}`
- Header z-index 150, archive banner z-index 200
- `.u-visually-hidden` hides visually but keeps accessible to screen readers
