---
title: "Giving Google Better Photos"
date: 2016-03-01 10:15:30
archive: true
excerpt: 
subtitle: "Using hidden meta tags to pass more appropriate Google images that may not appear on the page."
slug: giving-google-better-photos
featured_image_url: https://plasticmind.com/wp-content/uploads/2016/03/better.jpg
alt_text: ""
primary_category: "SEO"
categories: ["SEO"]
tags: ["images", "microdata", "richsnippets", "schema"]
meta_description: 
context: professional
fix: false
hits: 1347
---

One of the most important things we do to help make our site perform well in Google is including <a href="https://schema.org/Recipe">Schema.org markup</a> on our pages. In the off-chance you don’t know what that is, here it is in a nutshell: additional markup on your web page that helps sites like Google better understand the information on the page.

One important bit of information that the Recipe schema supports is <code>itemprop="image"</code>. If you include this markup on your recipe’s main photo image tag, Google will typically put this photo next to your site on search result pages (a "rich snippet").

<a href="https://plasticmind.com/wp-content/uploads/2016/03/serp-rich.png"><img class="alignnone size-full wp-image-5368" src="https://plasticmind.com/wp-content/uploads/2016/03/serp-rich.png" alt="Google Rich Snippet" width="1024" height="269" /></a>

They’ve also recently started showing a carousel of top results on mobile devices for certain searches.

<a href="https://plasticmind.com/wp-content/uploads/2016/03/carousel-normal-copy1.png"><img class="alignnone wp-image-5371 size-medium" src="https://plasticmind.com/wp-content/uploads/2016/03/carousel-normal-copy1-258x300.png" alt="Google Carousel Results" width="258" height="300" /></a>

The trouble is, Google’s carousel design is really meant for horizontally-oriented photos, but most of our featured images are vertically-oriented (tall instead of wide). Practically speaking, this means that many of our images are really unhelpful when they show up in the carousel. Take, for instance, this white bean and ham soup recipe:

<a href="https://plasticmind.com/wp-content/uploads/2016/03/carousel-bad.png"><img class="alignnone wp-image-5372 size-medium" src="https://plasticmind.com/wp-content/uploads/2016/03/carousel-bad-237x300.png" alt="Google Carousel + Portrait Photo = YUCK" width="237" height="300" /></a>

Portrait photos work best for the design of our site. They fit our layout better. They look great on portrait-oriented mobile devices. They make better Pinterest pins. And while most of our recipes do have horizontal shots (since we use them for category pages), we didn’t like the idea of changing the main images on our site just so our content looked better on search result pages.

Thankfully, I stumbled across a possible solution.

<a href="https://schema.org/docs/gs.html#advanced_missing">The Schema.org documentation has a section</a> about including information that doesn’t appear on the page:
<blockquote>“Sometimes, a web page has information that would be valuable to mark up, but the information can't be marked up because of the way it appears on the page... In these cases, use the meta tag along with the content attribute to specify the information.”</blockquote>
Put simply, you can include metadata that might not show up anywhere on the page using a simply meta tag, like so:
<pre>&lt;meta itemprop="url" content="https://www.simplyrecipes.com/recipes/banana_bread/"&gt;</pre>
This hidden tag appears in the HTML of the page and tells Google (and any other site that reads Schema markup) what the official url for this page is, even though the user would never see it.

This approached seemed like it might work for our photos, but would Google agree?

<a href="https://developers.google.com/structured-data/policies#non-visible_content_and_machine-readable_alternative">Google’s Rich Snippet Guide seems to make allowance for hidden meta data</a>, but includes some strong warnings:
<blockquote>"Typically Google will not display content that isn't visible to the end user. In other words, you generally shouldn't mark up content that is not visible to users. However, in some situations it can be valuable to provide search engines with additional data... The meta tag should not be used to hide content that is not visible to users in any form, since it might create misleading or deceptive search experience.”</blockquote>
Of course, we’re displaying relevant photos to users on each recipe page, but this hidden tag would contain a horizontal version of the photo, which is a much better fit for search result pages. We’re clearly not being deceptive with this approach, but would Google agree? The only way to figure it out was to try.

We rolled out the new markup a few weeks ago...

<a href="https://plasticmind.com/wp-content/uploads/2016/03/carousel-good.png"><img class="alignnone size-medium wp-image-5373" src="https://plasticmind.com/wp-content/uploads/2016/03/carousel-good-236x300.png" alt="Much better!" width="236" height="300" /></a>

Success!

Now we’re able to give our users the best possible visual experience on our site, while still providing users the most appropriate and relevant information for search result pages.