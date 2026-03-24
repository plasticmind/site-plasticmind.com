---
title: "Multi-platform Design Systems"
date: 2023-12-26
archive: false
excerpt: "How many platforms does your design system support, and how are you overcoming the challenges?"
subtitle: "Highlights from a discussion on The Question with Ben Callahan."
slug: multi-platform-design-systems
featured_image_url: /assets/i/question-multi-plaftorm.jpeg
alt_text: "The Question episode on multi-platform design systems"
primary_category: "Design"
categories: ["Design"]
tags: ["design systems"]
meta_description: "Highlights from a discussion on multi-platform design system support, including web components, framework strategies, and cautionary tales."
context: professional
---

"How many platforms does your design system support? Which platforms do you support and how are you overcoming the challenges of doing so?"

That was the question we discussed in last week's episode of The Question that I co-hosted with Ben Callahan.

It was a fascinating discussion, with lots of great feedback from other practitioners. Ben will probably provide a deep dive soon, but here are some of my highlights from the data:

- Not surprising, JS frameworks like React, Vue, and Angular had a strong showing.

- There was decent support for web components, though. Building a component library with web components and exporting to other frameworks via Stencil seemed like a popular strategy.

- Most design systems support component-friendly platforms (like React or Vue), while monolith platforms (like Drupal or WordPress) had a poor showing. Seems like web components might shine in cases where you need templates instead of component libraries.

- People struggle to support legacy systems (no surprise there).

- Someone said that they "ship CSS only" → I ❤️ pragmatic approaches that make sense in the right context.

Everyone provided so much great insight that the hour just raced by. Some more great feedback from our conversations:

- Adam Forrester shared how his team structured the design token automation and system architecture for a large multi-theme enterprise design system, and the size/structure of that team.

- Amy Lee proposed a helpful way of thinking about the level of connectedness a system on a scale of high and low. High-connected systems are more automated and have greater connectivity, faster updates, and more reliance on the system — probably ideal for fast-moving or less-resourced teams. Low-connected systems are more manually connected and have selective custom integrations, more platform-specific overrides, slower updates, etc — probably ideal for mature, well-funded teams that can be more selective.

And some cautionary tales about maintaining consistency and scalability across diverse platforms:

- Over-optimizing for one platform: "The teams that don't use React, cannot adopt the design system... This is causing them to rebuild components using our documentation, but costing so much time and money, that it's doing the opposite of what the design system is for. Abandoning React for something like web components at this stage seems like too steep of a hill to climb."

- Over-promising: "We haven't been equally staffed across the platforms we've promised to support. And, some platforms come more from contributions than the others. So, we (our design and our various code implementations) are out of sync."

How many platforms does your design system support? Which platforms? How are you overcoming the challenges?
