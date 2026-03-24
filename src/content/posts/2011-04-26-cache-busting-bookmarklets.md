---
title: "Cache Busting Bookmarklets"
date: 2011-04-26 11:27:52
archive: false
excerpt: 
subtitle: "One of the biggest hassles when trying to track down and squash bugs in a large-scale production environment is dealing with multiple layers of caching."
slug: cache-busting-bookmarklets
featured_image_url: 
alt_text: 
primary_category: "Miscellany"
categories: ["Miscellany", "Javascript"]
tags: []
meta_description: 
context: professional
fix: false
hits: 4920
---

Many of the sites I work on are at least three layers deep: a content delivery network (like Limelight or Akamai), server level file caching (like the W3 Total Cache plugin for WordPress) and the browser’s cache. Forgetting to clear one of those layers has often resulted in lots of time spent trying to debug a problem that’s already been fixed.

Anyhow, I put together a bookmarklet that helps make dealing with this a little less painful. A pretty typical way of getting around a cache is by adding a random query string to the end of the url; this usually bypasses most caches and gives you a “fresh” version of the page. So I put together a simple bookmarklet that reloads the current page your on with a time-stamped query string—resulting in a “fresh” version you can check for problems before purging the old caches.

**Nutshell: this bookmarklet reloads your page with a unique query string:**

<a href="javascript:location.href %3D location.href.split(%27%3F%27)%5B0%5D %2B %27%3Fbustcache%3D%27 %2B new Date().getTime()%3B" class="bookmarklet">&#x1f4a3;</a>

You know the drill: drag it to your bookmark toolbar and click for a minty burst of freshness.

But that bookmarklet is more of a convenience to save you from having to come up with a random string every time. The real headache is when a CDN caches your scripts or stylesheets. Why? Because even if you bring up a fresh version of your *page*, it’s still calling to the same CSS or Javascript file as the last iteration of your page. And if you’ve made changes to those stylesheets or scripts, you’re not going to see those updates unless you clear the CDN cache or append a query string to those javascript or stylesheet includes.

I looked around for a solution to this and found <a href="https://jasongraphix.com/journal/css-cachebuster/">Jason Beaird’s CSS Cache Busting bookmarklet</a> which proved to be a good starting point, but had to rewrite it to include scripts since I’m constantly getting frustrated with cached scripts as well.

**Nutshell: this bookmarklet adds a unique query string to all of the included scripts and stylesheets on your page:**

<a href="javascript:(function()%7B var x,y%3B x%3Ddocument.getElementsByTagName(%27link%27)%3B y%3Ddocument.getElementsByTagName(%27script%27)%3B for ( var i %3D 0%3B i < x.length %2B y.length%3B i%2B%2B ) %7B var el %3D ( i < x.length ) %3F x%5Bi%5D : y%5Bi-x.length%5D%3B var bust %3D%27%3Fbustcache%3D%27%2Bnew Date().getTime()%3B if (el.rel %26%26 (el.rel.toLowerCase() %3D%3D %27stylesheet%27)) %7B el.href%3Del.href.split(%27%3F%27)%5B0%5D%2Bbust%3B %7D else if (el.src %26%26 (el.type.toLowerCase() %3D%3D %27text/javascript%27)) %7B el.src%3Del.src.split(%27%3F%27)%5B0%5D%2Bbust%3B %7D %7D %7D)()%3B" class="bookmarklet">&#x1f4a3; (JS/CSS)</a>

Please take, use, enjoy—hopefully this saves you some time. If you have any feedback or cool tweaks, feel free to post them in the comments!