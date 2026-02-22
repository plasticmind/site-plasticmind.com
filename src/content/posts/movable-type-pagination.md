---
title: "Movable Type Pagination"
date: 2008-05-27 21:01:50
archive: true
excerpt: 
subtitle: 
slug: movable-type-pagination
featured_image_url: 
alt_text: 
primary_category: "CMS"
categories: ["CMS"]
tags: ["pagination ajax archives comments"]
meta_description: 
context: professional
fix: false
hits: 633
---

<h3>Good, But Not In The Way That You’re Thinking</h3>

**The new version of Movable Type boasts pagination, but it’s probably not pagination in the same sense that you’re thinking.** When most people think about pagination, they think, “My front page should have X number of entries with a link to a page 2 which has that same X number of entries, and so on and so on.”

But that’s not really what Movable Type 4.x does; out of the box, Movable Type 4.x offers category archives paginated by month. This is certainly a performance enhancement, especially since category archives can have hundreds or even thousands of entries and rebuilding them every time you save an article is hara-kiri for your server. In a nutshell, each category has a page for each month. If you posted twenty entries in the Tragedies category during the month of May, the *Tragedies, May 2008* page would have twenty entries; if you posted ten entries in that same category during April, the *Tragedies, April 2008* page would only have ten entries.

The great thing about this is that once April is over, Movable Type doesn’t have to rebuild that page again unless you backdate an entry (which is not that often). Each new month is a clean slate category archive; and you’ll definitely notice the spring in your server’s step when it’s only building out a dozen entries per category archive and not a thousand.

<h3>Ouch, Said The User</h3>

Trouble is, this is a really jarring experience for users. When navigating interfaces, people tend to think in patterns: *Scroll down six entries, click next page, scroll down six entries, click next page. Patterns are everywhere in user interfaces: menus work better in fixed locations; a scrollbar moves things the same distance each time it’s clicked. People like being able to anticipate what’s next; it reduces frustration and let’s them get better at getting around. It helps them feel better about using your site.

**Category-monthly archiving doesn’t.**

<!--more-->

Let’s take an journey through these imaginary category-monthly archives; maybe you’ll see what I mean. I start in *Tragedies, May 2008* and there are twenty entries listed here. I scroll down twenty entries to the bottom of the page and click *Tragedies, April 2008*. There are ten entries on this page, and at the bottom there’s a link to *Tragedies, February 2008*. Wait, I thought I was in April? I scroll back to the top and realize that I am, in fact, in the April archives. Scrolling back down, I check the link again: February. Huh. I guess that means there were no articles in March. For this category or for… wait, which category was I in again? Oh nevermind, let’s go see what’s new on Digg…

Obviously, this is an exaggeration. People can find their way around your site, just like I can find the milk in the grocery store even though they put it all the way in the back. It’s just an annoyance, and petty annoyances can add up if you’re not careful.

<h3>Why All The Fuss?</h3>

Now, before you go assuming that the people at Six Apart are mean-spirited killjoys out to drive away your readers, let me explain. They have a very good reason for category-monthly archives. See, Movable Type is primarily a static publishing platform. (For a breakdown of dynamic publishing vs. static publishing, see<a href="https://bdash.net.nz/blog/2004/03/07/static-vs-dynamic-publishing/"> https://bdash.net.nz/blog/2004/03/07/static-vs-dynamic-publishing/</a>) What that means, in short, is that Movable Type actually builds your pages beforehand, as opposed to other programs that serve it up “on the fly”. The problem is that while dynamic systems just call to whatever content parameters they need for that page, static systems like Movable Type actually create a real page with a set of content constraints.

Let me put it this way. A dynamic system can simply say to the database: “The user wants to see the next six entries; give me the next six entries and I’ll put them on a page.” The static system would actually have to say “Give me all of your entries and I’ll build page after page of six entries each in case a user requests it” and do this every time an entry was saved. As you may have guessed from my moribund tone, this would wreak havoc on your server. That’s why the default Movable Type templates ship with category-monthly archives.

<h3>Don’t Give Up The Ship! or Pagination? Yes We Can!</h3>

If you stopped reading here (and I wouldn’t blame you) you might think that pagination was downright impossible with Movable Type. But there are several different pagination solutions that suit different needs with varying degrees of success. In order of recommendation:

**1. One big static file, paginated dynamically.** This was a favorite of mine for a long time. Movable Type creates one index file with some or all of your entries, and the results are then paginated using something like PHP. Which entries get shown would be declared in the query string, for example, index.php?page=2. The problem with this is that it can be terribly inefficient, which is why most MT developers frown on using the <a href="https://www.nonplus.net/software/mt/MTPaginate.htm">MTPaginate plugin</a> (it uses this approach).

**2.Get Smarty.** One of the things I didn’t mention earlier was the fact that Movable Type can publish both static *and* dynamic pages. <a href="https://everitz.com">Chad Everett</a> takes advantage of the Smarty templating that Movable Type uses for dynamic publishing to create really handy pagination controls. <a href="https://cxliv.org/2005/03/31/automated_smarty_pagination.php">Read more about his Smarty pagination over here.</a>

**3. Six static pages of entries and a link to archives.** You can see this approach over at <a href="https://www.seriouseats.com/">Serious Eats</a>. Simply create six templates with eight entries on each and publish them to index1-5.html; be sure to offset the entries on the page in multiples of eight (offset=(8*page number)). At the bottom of each page is a hardcoded link to the previous page of entries. On the final page (in this example, index5.html) there’s a link to the archive listing where people can discover more content. This is a decent compromise for most needs: you get all the benefits of static publishing, very little of the performance impact, while still allowing users to discover your content (most don’t go further back than 3 or 4 anyhow).

**4. Mark Carey’s Pagination Plugin.** In his own words:

<blockquote>My goal here was to create a pagination plugin with high performance. I didn’t want it to slow down rebuilds, and I wanted pages to display for readers without delay. With these goals in mind, I decided to dynamically render pages 2, 3, 4, and so on. This means that unlike the default for most pages in Movable Type, pages 2+ are not static files that get published to your blog directories. They dynamically rendered by the plugin’s page viewer script. Note that this viewer script is Perl-based and does not use MT’s built-in PHP-based dynamic publishing system. The benefit of this is that you can virtually any plugin template tags in your paginated templates, and you don’t need to use PHP. So when someone views page 2, the script goes into action and builds the page and displays it.</blockquote>

<a href="https://mt-hacks.com/pagination.html">The Pagination plugin</a> also supports caching for increased performance:

<blockquote>To speed up dynamic page views and reduce CPU/memory/database usage, Pagination supports (optional) page-level caching, powered by the <a href="https://mt-hacks.com/cacheblock.html">Cache Block</a> plugin. This means that once the plugins generates the HTML for “page 2”, it will store that in the cache for next time. And next time someone wants to see “page 2”, it can be quickly fetched from the cache.</blockquote>

**5. Xomment Your Comments.** This solution is custom built for comments, but I thought I’d mention it here because it’s relevant. <a href="https://dererumnatura.us/docs/xomment.html">Xomment</a> is a plugin for MT that uses javascript calls to the server (also known as AJAX) to display, submit, preview and quote comments. It’s a really solid plugin with an approach worth considering.