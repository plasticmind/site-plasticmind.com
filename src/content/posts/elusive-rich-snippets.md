---
title: "Those Elusive Rich Snippets!"
date: 2013-07-05 11:17:59
archive: true
excerpt: 
subtitle: 
slug: elusive-rich-snippets
featured_image_url: 
alt_text: 
primary_category: "Social Media & SEO"
categories: ["Social Media & SEO"]
tags: []
meta_description: 
context: professional
fix: false
hits: 215
---


			

Last year, I wrote about some <a href="https://plasticmind.com/wordpress/wordpress-hrecipe-gotcha/">trouble we were having with Google's rich snippets</a> for recipes.  In a nutshell, when Google saw the <code>.hentry</code> class on our recipe page, it ignored the <code>.hrecipe</code> class that Google uses to determine if a page is a recipe or not.  Subsequently, all of our lovely recipe photos stopped showing up in the search results.  (Boo.)





We recently noticed that instead of food photos next to the results, Elise's avatar was showing up.  This is the treatment given to news articles that have a verified author.





<img alt="missing-thumb.jpg" src="/assets/i/missing-thumb.jpg" width="527" height="347" class="mt-image-none">





It goes without saying that people want to see what they're thinking of cooking, so we really wanted to figure out why our photos had disappeared.  We hadn't changed anything recently in the code, so we were at a bit of a loss.





<a href="https://support.google.com/webmasters/answer/99170?hl=en">Google's rich snippet guidelines</a> indicates that you can use either schema.org microdata (itemprop and itemscope) or microformats (hrecipe and semantic classes).  We had chosen the microformats approach since it required less markup and felt like a more natural and semantic integration into our pages.  





A bit later, we decided to include the schema.org microdata on the page as well, to hedge our bets and make sure we were giving search engines everything they could possibly want.  Google, on their blog, <a href="https://googlewebmastercentral.blogspot.com/2011/06/introducing-schemaorg-search-engines.html">warned against mixing the two approaches</a>, but basically <a href="https://www.w3.org/2011/06/semtech-bof-notes#line0119">renounced that in one of their structured data chats</a>.  So we assumed we were safe.





I wasn't sure exactly where to start (any SEO talk requires a bit of black magic).  Obviously, Google has been trying to promote Google+ and <a href="https://plus.google.com/authorship">Google Authorship</a>, so I thought perhaps Google was just emphasizing authorship over any recipe formatting.  My initial thought was to strip out Google Authorship.  





However, I decided to strip out all of the microformatting.  I removed the <code>.hrecipe</code> class and most of the “Google-specific” microformatting they require and left just the semantic stuff (like <code>.ingredient</code> and <code>.photo</code>).  I used only the microdata approach and included some of the data I has missed before like <code>interactionCount</code> and <code>datePublished</code>.  After a few days, the thumbnails were back.





<img alt="all-is-well.png" src="/assets/i/all-is-well.png" width="666" height="303" class="mt-image-none" style="">





One other interesting side note: the formatting of my search results while logged in to Google seem to lag behind the general public.  When I noticed the thumbnails were missing while not logged in and searching, they were still showing up for me when I was signed in and searching. Now they're back in the public search, but if I'm logged in I still get the version without the thumbnails.





Moral of the story: always be sure to check your searches without being logged in.  (I've also noticed some slight variations while searching from different parts of the country, but nothing conclusive.)



			<!--more-->

		