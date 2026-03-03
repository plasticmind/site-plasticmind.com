# PRD: Archives & Blog Pages — v2.plasticmind.com

## Context

This is a blog redesign built on 11ty (Eleventy), Nunjucks templates, and CSS custom properties (primitive + semantic token layers). The site has **500+ posts spanning 20+ years** (roughly 2003–2026) across 40+ categories. The existing category archive pages already use a clean year-grouped timeline pattern (see `categories.njk`). The current "Archive" page (`posts.njk`) is a basic paginated flat list — functional but forgettable.

This PRD covers two new pages:

1. **Archives** — A distinctive, explorable overview of 20+ years of writing
2. **Blog** — A curated latest-posts feed with a pinned/featured post

---

## Page 1: Archives (`/archives/`)

### Goal

Replace the existing flat paginated post list with something that honors 20+ years of writing. This page should feel like opening a well-organized personal library — inviting exploration and serendipity, not just chronological scrolling.

### Design Concept: "The Stacks"

A multi-layered archive page with three distinct sections that let visitors explore content by time, by topic, and by serendipity.

### Section A: Timeline Overview (Hero)

A compact, visual representation of the full writing history. Think of it as a "contribution graph" but for blog posts.

**Requirements:**

- Display a **heatmap-style grid** showing post density by month across all years (columns = years, rows = months), similar to GitHub's contribution graph but oriented vertically
- Each cell's intensity maps to post count for that month (0 posts = empty/faint, 1-2 = light, 3-5 = medium, 5+ = strong), using the coral color scale from `tokens-primitive.css` (`--coral-0` through `--coral-500`)
- Hovering a cell shows a tooltip: "March 2007 — 4 posts"
- Clicking a cell smooth-scrolls to that year in Section B
- Above the grid, show total stats: "523 posts · 21 years · 12 categories"
- Header: "Archives" with a brief line of copy, e.g. *"Two decades of thinking out loud on the internet."*
- The grid should be generated at build time via an 11ty filter or shortcode — not client-side JS. The hover/click interactivity can use minimal vanilla JS
- Grid should be responsive: on narrow screens, consider showing only the last 10 years with a "Show all years" toggle, or switch to a simplified single-row sparkline view

**Data needed:** A new 11ty filter `postsByMonthYear` that returns a nested structure: `{ year: { month: count } }`

### Section B: Year-by-Year Chronology

The familiar year-grouped timeline, but for ALL posts (not just one category). Reuse the existing `c-year-timeline` pattern from `categories.njk`.

**Requirements:**

- Group all posts by year using the existing `groupByYear` filter
- Each year group shows the year heading, post count for that year, and the timeline bar
- Posts show: date (short format), linked title, subtitle (if present)
- Year groups should have an `id` attribute (`id="year-2023"`) so the heatmap cells can link to them
- Use `<details>` elements for years older than 5 years (i.e., 2021 and earlier), collapsed by default. This keeps the page from being overwhelmingly long on load. The most recent 5 years are expanded
- When a heatmap cell is clicked, the corresponding year's `<details>` should be opened and scrolled into view
- Each year heading should show a subtle post count badge

### Section C: Topic Explorer

A redesigned category cloud — not a flat list of links, but a set of interactive "cards" for each category.

**Requirements:**

- Display all primary categories from `collections.categoryList`
- Each category is rendered as a small card showing: category name, description (from `categoryDescriptions.json`), and post count
- Cards are sorted by post count (descending) so the most-written-about topics are prominent
- Cards link to the existing `/category/{slug}/` pages
- Use a CSS grid layout: 3 columns on desktop, 2 on tablet, 1 on mobile
- Visual treatment: use a subtle left-border accent (like the timeline bar) in coral, with the card background using `--color-surface-alt`

### Section D: Serendipity ("Random Post")

A small "Feeling adventurous?" section at the bottom that highlights 3 random posts.

**Requirements:**

- Show 3 randomly selected posts using the existing `shuffle` filter with `| limit(3)`
- Each card shows: title, subtitle, date, and category
- Include a "Shuffle" button that reloads the page (or, if preferred, uses client-side JS to pick 3 new random posts from a preloaded JSON endpoint)
- For the build-time approach: since 11ty generates static HTML, the "random" posts will change on each build. That's acceptable. If true randomness per-visit is desired, create a small JSON endpoint (`/api/posts.json`) that the shuffle button can fetch from client-side
- Keep this section lightweight and playful in tone

### Template Location

- Create: `src/content/pages/archives.njk`
- Permalink: `/archives/`
- Add to `eleventyNavigation` with appropriate order

### New Filters Needed

1. **`postsByMonthYear`** — Returns heatmap data structure. Location: `src/_11ty/filters/postsByMonthYear.js`
2. **`sortByCount`** — Sorts category objects by post count. Location: `src/_11ty/filters/sortByCount.js` (or inline in template)

### CSS Components to Create

All styles should follow the existing BEM + `c-` component / `l-` layout / `u-` utility naming convention and use semantic tokens where possible.

- `.c-heatmap` — The post-density grid (including `.c-heatmap__cell`, `.c-heatmap__year-label`, `.c-heatmap__month-label`, `.c-heatmap__tooltip`)
- `.c-archive-stats` — The stats line above the heatmap
- `.c-topic-card` — Category explorer cards (`.c-topic-card__name`, `.c-topic-card__description`, `.c-topic-card__count`)
- `.c-topic-grid` — Grid layout wrapper for topic cards
- `.c-random-posts` — The serendipity section
- Reuse `.c-year-timeline` from existing category pages
- Reuse `.c-archive-header` for the page header

### Accessibility

- Heatmap cells must have `aria-label` describing the data (e.g., "March 2007: 4 posts")
- Heatmap should have `role="grid"` with proper `role="row"` and `role="gridcell"` structure, or alternatively be implemented as a simple decorative visualization with an accessible text summary above it
- `<details>` elements for collapsed years are natively keyboard accessible
- Topic cards should be full-link cards (the entire card area is clickable, using a `<a>` stretched over the card via CSS, not wrapping the card in an anchor)
- Random posts section: if using JS shuffle, ensure focus management and announce the new posts to screen readers via `aria-live="polite"`

---

## Page 2: Blog (`/blog/`)

### Goal

A curated "what's new" page that surfaces the most recent writing with the ability to pin a featured post at the top. This replaces the current paginated Archive page as the primary blog entry point.

### Design Concept

A clean, editorial-style blog listing with a prominent featured post hero and a chronological feed below.

### Section A: Featured/Pinned Post

A single post highlighted at the top of the page with more visual weight than the rest.

**Requirements:**

- The featured post is determined by a **data file**: `src/_data/featuredPost.json` containing `{ "slug": "empire-state-of-ux" }` (or `null` if no post is pinned)
- If a `featuredPost` is set, display it as a larger card at the top: title, subtitle, date, category badge, first ~150 chars of excerpt/description, and a "Read →" link
- If `featuredPost` is `null`, skip this section entirely (no empty hero state)
- Visual treatment: a subtle background using `--color-surface-alt`, larger title typography, and a "Featured" label/badge
- The featured post should also appear in the chronological feed below in its normal position (don't filter it out — that's confusing)
- An alternative to the data file approach: use a `pinned: true` frontmatter field in the post. The template finds the most recent post with `pinned: true`. Either approach works; the data file is simpler to manage

### Section B: Recent Posts Feed

A reverse-chronological list of posts, paginated.

**Requirements:**

- Reuse the year-grouped timeline pattern from the category pages (`c-year-timeline`) — this gives visual consistency across the site
- Paginate at 30 posts per page (not 25; rounder number, and with the timeline grouping it reads better)
- Each post shows: date (short format), linked title, subtitle (if present), reading time (already available via the `timeToRead` plugin), and primary category as a small linked badge
- Pagination controls at the bottom: "← Newer" / "Older →" with page numbers if possible
- The current year's posts are expanded; older years on the current page use `<details>` collapsed by default
- Above the feed, show a brief intro: *"The latest from the blog."* (or similar — keep it short)

### Section C: Quick Links

A compact footer section below the feed.

**Requirements:**

- Link to `/archives/` with a label like "Explore the full archives →"
- Link to the RSS feed (`/feed/`)
- Optionally, show the top 5 categories as quick-filter links

### Template Location

- Create: `src/content/pages/blog.njk`
- Permalink: `/blog/`
- Update `eleventyNavigation`: change the existing "Blog" nav item (currently pointing to the old posts page) to point to `/blog/`
- The old `/posts/` page should either redirect to `/blog/` or be removed. Recommendation: add a redirect in `_redirects`

### New Data File

- `src/_data/featuredPost.json`: `{ "slug": "empire-state-of-ux" }` — slug matches the post's `slug` frontmatter field

### CSS Components to Create

- `.c-featured-post` — The pinned post hero (`.c-featured-post__title`, `.c-featured-post__subtitle`, `.c-featured-post__meta`, `.c-featured-post__excerpt`, `.c-featured-post__badge`)
- `.c-category-badge` — Small inline category label (reusable across both pages and potentially in post layouts)
- `.c-quick-links` — Compact footer link section
- Reuse `.c-year-timeline` for the post feed
- Reuse `.c-archive-header` for the page header

### Accessibility

- Featured post section should use an `<article>` element with a clear heading hierarchy
- Category badges should be proper links with sufficient color contrast against their background
- Pagination uses `<nav aria-label="Blog pagination">` with proper link states
- Reading time is informational — include it as part of the metadata, not as a standalone element

---

## Shared Implementation Notes

### CSS Architecture

- Add new component styles to `global.css` following the existing BEM conventions
- Use semantic tokens (`--color-text`, `--color-surface-alt`, `--color-link`, etc.) for all colors
- Use the coral scale for accent elements (timeline bars, badges, heatmap cells)
- Respect the dark theme: the site has a dark body with `--color-surface-reverse` for the main background. Ensure all new components work with the existing dark palette. Check `global.css` for how existing components handle this

### Template Patterns

- Extend `layouts/base.njk` for both pages
- Use `{% block content %}` for page-specific content
- Follow the existing `<section class="c-section"><div class="l-container--lg">` wrapper pattern
- Use Nunjucks `{% set %}` for computed data (e.g., filtering featured post from collection)

### Post Frontmatter Fields Available

Based on existing posts, these fields are available for use:

```yaml
title: string
date: date
subtitle: string (optional)
slug: string
primary_category: string
categories: string[]
tags: string[]
excerpt: string (optional)
context: string (optional — "professional", etc.)
featured_image_url: string (optional)
hits: number (optional — legacy view count from WordPress)
```

### Build Performance

- The Archives page will process all 500+ posts at build time. The `groupByYear` filter and `postsByMonthYear` filter should be efficient (single pass through the collection)
- Avoid nested loops over the full collection where possible
- The heatmap is static HTML — no runtime computation needed

### Migration Steps

1. Create the new filters (`postsByMonthYear`, `sortByCount`)
2. Create `featuredPost.json`
3. Build the Blog page first (simpler, replaces existing)
4. Build the Archives page
5. Update navigation in `eleventyNavigation`
6. Add redirect: `/posts/ → /blog/` in `_redirects`
7. Test dark theme, responsive breakpoints, and keyboard navigation

---

## Out of Scope

- Search functionality (could be added later as a separate feature)
- Tag-based filtering (categories are the primary taxonomy here)
- Infinite scroll (pagination is fine)
- Client-side rendering / SPA behavior (this is a static site)
- Post view counts / analytics display (the `hits` field exists but is legacy WordPress data)

---

## Open Questions for Jesse

1. **Heatmap vs. simpler alternative:** The contribution-graph heatmap is the most visually distinctive option, but it could be overengineered for a personal blog. A simpler alternative: a "year bar chart" showing post count per year as horizontal bars. Less interactive, faster to build, equally informative. Worth considering if build complexity is a concern.

2. **Featured post mechanism:** Data file (`featuredPost.json`) vs. frontmatter field (`pinned: true`). The data file is one central place to manage; the frontmatter field keeps everything colocated with the post. Recommendation: data file, since you'd rarely pin more than one post and it's easier to update without touching post files.

3. **Collapsed years threshold:** PRD suggests collapsing years older than 5 years. Should this be configurable, or is 5 a good default? For 20+ years of content, this means ~15 collapsed groups which is manageable.

4. **Random posts: build-time vs. client-side?** Build-time is simpler and works without JS. Client-side gives true per-visit randomness. For a static blog, build-time is probably fine — the posts change every deploy.

5. **URL structure:** `/blog/` for the latest posts feed and `/archives/` for the full explorer. The old `/posts/` redirects to `/blog/`. Does this work, or would you prefer different slugs?
