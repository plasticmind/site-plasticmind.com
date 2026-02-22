---
title: "Bookmarklet: Archive Page to Wayback Machine"
date: 2019-02-23 22:36:50
archive: false
excerpt: 
subtitle: 
slug: bookmarklet-archive-to-wayback-machine
featured_image_url: 
alt_text: 
primary_category: "0's and 1's"
categories: ["0's and 1's"]
tags: ["bookmarklet", "javascript"]
meta_description: "A handy bookmarklet for requesting an archive of a web page by the Internet Archive Wayback Machine."
context: professional
fix: false
hits: 4941
---

<a href="https://www.zeldman.com/">Jeffrey Zeldman</a> shared this helpful tip for saving web pages to the <a href="https://archive.org/web/">Internet Archive Wayback Machine</a>:

https://twitter.com/zeldman/status/1099451257343889409

I reference the Wayback Machine a lot, so requesting an archive of the current page by prepending the url with <code>web.archive.org/save/</code> is wicked useful; but I figured I'd make it just a smidge easier by turning it into a bookmarklet.

**Drag this bookmarklet to your bookmarks bar:**

<a class="bookmarklet" href="javascript:location.href = '//web.archive.org/save/' + location.href.split('?')[0];">&#x1f4be; Archive</a>

Once it's there, you can click it to request an archive on the page/url you're currently browsing.

Thanks again to <a href="https://twitter.com/t">Tantek</a> and <a href="https://twitter.com/zeldman">Zeldman</a> for the tip. Please take, use, enjoy—hopefully this saves you some time. If you have any feedback or additional tweaks, feel free to share in the comments.