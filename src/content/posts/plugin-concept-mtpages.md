---
title: "Plugin Concept: MT-Pages"
date: 2007-03-01 05:41:19
archive: true
excerpt: 
subtitle: 
slug: plugin-concept-mtpages
featured_image_url: 
alt_text: 
primary_category: "Blogging & CMS"
categories: ["Blogging & CMS"]
tags: []
meta_description: 
context: professional
fix: false
hits: 141
---


			

A few weeks ago, during one of our ProNet phone calls when Tim brought up the fact that creating static pages still requires alot of hoop-jumping, I started thinking about a way to implement default page templates that would allow easy management of pages via the MT interface but separate from templates and entries.





The plugin would be called MTPages.





**UPDATE: This plugin is actually called Athena and isn't a plugin at all.  Single page management will be a core functionality of Movable Type 4.0!**


			<!--more-->

Instead of getting mixed in with Entries, another section called "Pages" would be added to the blog.  It would function almost exactly like the Entries section, only it would list all of our static pages.  Keeping it separate would accomplish two things:  a clear distinction for both types of content in the mind of the user and no hassle with archives when rebuilding.  (MT might not allow this type of functionality, so I may be deluded about this...)





In the template section, another Tab would be added for "Page Templates".  Multiple page templates could be created and named.  A default page template should be supplied by the plugin so the Pages section works immediately upon install.





<a href="/assets/i/mtpages-pagetemplates.png"><img src="/assets/i/mtpages-pagetemplates-thumb.png" alt="" /></a>





In the main menu, we now see a section called "Pages".





<a href="/assets/i/mtpages-mainmenu.png"><img src="/assets/i/mtpages-mainmenu-thumb.png" alt="" /></a>





Clicking on it brings us to our "Page Listing" screen where have a list of all our static pages on the site.  Instead of showing the date a page was published, we see the location where each page is published.





<a href="/assets/i/mtpages-pagelisting.png"><img src="/assets/i/mtpages-pagelisting-thumb.png" alt="" /></a>





Clicking on "New Page" brings us to what is essentially a new entry screen with an additional drop down where we can choose a particular page template from all of our predefined ones.





<a href="/assets/i/mtpages-editpage.png"><img src="/assets/i/mtpages-editpage-thumb.png" alt="" /></a>





The only thing I have not yet settled is how to handle publishing.  Perhaps it would be a good idea (since these are single instance pages) to provide a field for the user to specify publishing settings (although basename might work).  Or maybe it could be tied into the category drop down.  Not too sure about that.


		