# Search Implementation Plan

> **Note:** User wants this saved to `.claude/SEARCH-IMPLEMENTATION.md` — copy there after exiting plan mode.

## Context

The site has ~599 blog posts but no search functionality. A search drawer UI is already scaffolded in `drawer-left.njk` (input, submit button, `#search-results` container) with CSS styles in place. The drawer open/close/focus-trap logic in `global.js` already works. What's missing is a search engine to power it.

**Tool choice: Pagefind** — a post-build static search indexer. It indexes the rendered HTML output, generates a compressed binary index (~50-100KB for this site), and provides a JS API we can wire into the existing custom search UI. No JSON index to maintain, no third-party service, zero cost.

## Files to Modify

| File | Change |
|------|--------|
| `package.json` | Add `pagefind` as devDependency, update build scripts |
| `.eleventy.js` | No changes needed — Pagefind runs after Eleventy build |
| `src/_includes/partials/drawer-left.njk` | Minor tweaks to search form (remove submit button, add as-you-type behavior) |
| `src/assets/js/search.js` | **New file** — Pagefind JS API integration |
| `src/_includes/layouts/base.njk` | Add `<script>` tag for search.js |
| `src/assets/css/global.css` | Add search result item styles (`.c-search-results__item`, loading/empty states) |
| `src/content/posts/posts.11tydata.js` | Add `data-pagefind-body` attribute handling (optional — see step 3) |

## Implementation Steps

### 1. Install Pagefind

```bash
npm install --save-dev pagefind
```

Update `package.json` build scripts:
```json
"build:prod": "ELEVENTY_ENV=production eleventy && npx pagefind --site public",
"build": "ELEVENTY_ENV=development eleventy && npx pagefind --site public",
"start": "ELEVENTY_ENV=development eleventy --serve"
```

Note: `npm start` (dev server) won't have search indexing by default. We can add a separate `build:search` script or run pagefind manually during dev. Pagefind also has a `--serve` mode we could explore, but the simplest path is to build first, then test.

### 2. Configure Pagefind indexing scope

Create `pagefind.yml` in project root:
```yaml
site: public
glob: "journal/*/index.html"
```

This tells Pagefind to only index journal posts (not the homepage, archives, category pages, etc.). Posts with `crawl: "false"` in frontmatter can be excluded by adding `data-pagefind-ignore` to their template.

Alternative: Instead of glob filtering, add `data-pagefind-body` to the post content area in the post layout template, so Pagefind only indexes the article body (not nav, footer, etc.).

### 3. Mark indexable content in templates

In `src/_includes/layouts/post.njk`, add `data-pagefind-body` to the main content wrapper so Pagefind indexes article content specifically (not navigation, footer, sidebar chrome):

```html
<article data-pagefind-body>
  ...post content...
</article>
```

Add metadata attributes for richer search results:
```html
<h1 data-pagefind-meta="title">{{ title }}</h1>
<time data-pagefind-meta="date" datetime="...">...</time>
```

For posts with `crawl: "false"`, add `data-pagefind-ignore="all"` to the article wrapper via a conditional in the template.

### 4. Create search.js

New file: `src/assets/js/search.js`

```javascript
// Lazy-load Pagefind on first interaction with search drawer
// Wire into existing #search-drawer form and #search-results container
// - Listen for input events on .c-search-form__input (debounced, ~300ms)
// - Call pagefind.search(query)
// - Render results into #search-results
// - Show loading state while searching
// - Show "No results" for empty result sets
// - Each result: title, excerpt snippet (highlighted), date, URL
// - Click result → navigate to post
```

Key implementation details:
- **Lazy initialization**: Don't load Pagefind JS until the search drawer opens for the first time (saves bandwidth on pages where search isn't used)
- **Debounced input**: Search as the user types with 300ms debounce — no submit button needed
- **Result rendering**: Use `result.data()` to get title, excerpt, URL. Pagefind provides highlighted excerpt snippets automatically.
- **Focus management**: Auto-focus the search input when the drawer opens (already handled by `global.js` `openBottomDrawer`)
- **Clear results**: When input is emptied, clear results container
- **Keyboard**: Pressing Enter in the input should not submit the form (prevent default), since search is instant

### 5. Update search drawer HTML

In `drawer-left.njk`, simplify the search form:
- Remove the submit `<button>` (search is instant as-you-type)
- Keep the `<form>` wrapper with `role="search"` for semantics
- Add a results count / status area for screen readers (`aria-live="polite"`)
- Add a loading indicator element (hidden by default)

### 6. Add search result CSS

Add to `global.css` after the existing `.c-search-results` rule:

- `.c-search-results__item` — result card with title, snippet, date
- `.c-search-results__title` — post title as link
- `.c-search-results__excerpt` — snippet with `<mark>` highlighting from Pagefind
- `.c-search-results__meta` — date/category in muted text
- `.c-search-results--empty` — "No results found" state
- `.c-search-results--loading` — loading indicator
- Style Pagefind's `<mark>` highlights to use `--color-link` or `--coral-500`

### 7. Load search script in base template

In `base.njk`, add the search script. Since it lazy-loads Pagefind, it's lightweight:

```html
<script src="/assets/js/search.js" defer></script>
```

The Pagefind JS + index files will be in `public/pagefind/` (generated at build time, not checked into git). Add `public/pagefind/` to `.gitignore`.

## Handling dev server

Pagefind runs post-build, so the dev server (`eleventy --serve`) won't have a search index. Options:
1. **Simplest**: Run `npm run build` once to generate the index, then `npm start`. The index persists in `public/pagefind/` until cleaned.
2. **Better DX**: Add a `dev:search` script that builds + runs pagefind, for when you want to test search locally.
3. **Graceful fallback**: In `search.js`, if Pagefind fails to load, show "Search unavailable in dev mode" instead of breaking.

Recommend option 3 (graceful fallback) combined with option 1 for when search needs testing.

## Verification

1. `npm run build:prod` — should complete without errors, `public/pagefind/` directory should exist with index files
2. Serve `public/` locally (e.g., `npx serve public`) and open the search drawer
3. Type a query — results should appear as-you-type after ~300ms
4. Verify results link to correct `/journal/slug/` URLs
5. Verify posts with `crawl: "false"` do NOT appear in results
6. Verify draft posts do NOT appear in results (they aren't built, so they can't be indexed)
7. Test empty query state, no-results state, and loading state
8. Test keyboard: Tab through results, Enter to navigate, Escape to close drawer
9. Test screen reader: aria-live region announces result count
10. Test both light and dark themes for result styling
