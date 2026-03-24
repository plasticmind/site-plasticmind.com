---
title: "Accessibility Review of America by Design"
date: 2025-09-23
archive: false
excerpt: "The new americabydesign.gov has real ambitions — but some basic accessibility fundamentals got left behind."
subtitle: "Big ambitions, but some basics are missing."
slug: accessibility-review-america-by-design
featured_image_url: /assets/i/america-by-design.jpg
alt_text: "A screenshot of the new americabydesign.gov website. An American flag behind the title \"America by Design\" and a description \"President Trump signs the Executive Order to modernize the interfaces that serve everyday citizens.\""
primary_category: "Design"
categories: ["Design"]
tags: ["accessibility", "design systems"]
meta_description: "A brief accessibility review of americabydesign.gov — landmarks, headings, video backgrounds, and federal compliance requirements."
context: professional
fix: false
---

I ran a brief accessibility review of the new [America by Design](https://americabydesign.gov/) website:

1. There's no skip to content link and no basic landmarks (elements with roles like `header`, `nav`, `main`, `footer`, etc.) Landmarks like this are standard for keyboard and assistive technology navigation, making navigating the site frustrating at best.

2. Since you can't "skip to content," the giant "America by Design" logo at the top is announced as "America First Legal logo," which is confusing since it doesn't match what it says (same in the footer).

3. Related, there's no `<h1>` on the site, which means it has no clear, top-level name. People using a screen reader usually jump around by headings, and without that `<h1>`, there's no obvious "start here" in the heading list (in fact, no headings at all). So people have to hunt around to figure out where they are and what the page is about.

4. The hero text is wrapped using `<br>` tags, so its read with halts as if each line is a separate sentence. The "fade in" effect on the body text seems to be implemented with individual spans, so the voice reader reads each word individually for most paragraphs in the body. A really lousy screen reader experience.

5. The official federal banner is non-standard and incomplete. It should contain a "here's how you know" toggle/disclosure. More details over at the [US Web Design System (USWDS) site](https://designsystem.digital.gov/components/banner/).

6. [OMB Memorandum M-23-22](https://www.section508.gov/manage/laws-and-policies/website-accessibility-statement/) requires federal sites to display an accessibility statement and provide the ability for people to report accessibility issues. This site does neither.

7. WCAG 2.0 SC 2.2.2 requires that videos that play and last more than 5 seconds need to provide users a way to pause, stop, or hide it. The American flag video background falls under this category. I'd probably implement this by using the `prefers-reduced-motion` CSS media query to swap in a static image of a flag.

8. Setting aside the self-aggrandizement, the text here is marketing-heavy and brand-focused ("Apple Store like experience"). There isn't much task-oriented or next steps here. The USWDS encourages task-focused language.

I'd love to see America by Design lead with accessibility as much as aesthetics.

