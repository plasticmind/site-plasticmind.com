---
title: "PDF → Code with AI + MCP"
date: 2026-01-23
archive: false
excerpt: "Claude Code turned a 5-page PDF form into an 8-step web application using our design system MCP server."
subtitle: "A well-structured design system is critical infrastructure for AI-assisted coding."
slug: turning-pdf-to-code-with-ai-mcp
featured_image_url:
alt_text:
primary_category: "Technology"
categories: ["Technology"]
tags: ["design systems", "ai"]
meta_description: "Using Claude Code to turn a 5-page PDF form into an 8-step web application using components, tokens, and utility classes from the NYS Design System."
context: professional
fix: false
---

![A side-by-side comparison of a paper foster-adoptive parent application form from the NYS Office of Children and Family Services and a web-based version of the same form built with the NYS Design System, showing an 8-step application progress bar and radio button options for application type.](/assets/i/pdf-to-web-app.jpg)

I gave Claude Code a 5-page PDF form, and in just over an hour, it had turned it into an 8-step web application using components, tokens, and utility classes from the NYS Design System by talking to our new [design system MCP server](https://github.com/ITS-HCD/nysds/tree/main/packages/mcp-server).

This is only a test and still needs refinement. Some PDF fields, like a blank text input for work schedule, might not make as much sense in a web application. Some questions, like whether those other forms references should be a part of this application workflow, need to be answered by agency folks. And this is only front-end code, and doesn't tackle any back end data storage. But it's exciting to see the promise of move away from PDFs and toward accessible web applications.

A well-structured design system is critical infrastructure for AI-assisted coding.
