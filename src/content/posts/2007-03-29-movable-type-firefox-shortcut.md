---
title: "Movable Type Firefox Shortcut"
date: 2007-03-29 09:51:34
archive: true
excerpt: 
subtitle: 
slug: movable-type-firefox-shortcut
featured_image_url: 
alt_text: 
primary_category: "Web Development"
categories: ["Web Development"]
tags: ["cms"]
meta_description: 
context: professional
fix: false
hits: 91
---


			

I'm constantly bringing up different client's Movable Type installs for maintenance, and typing out the full path to Movable Type gets old quick.  If you install MT to a consistent location (/cgi-bin/mt/mt.cgi) as I do, I've got a little Firefox shortcut that will make your life easier.





In Firefox, go to the bookmark management/organization section.  Create a new bookmark.



<div class="contentbox"><code>
Name: **Movable Type**<br />
Location: **https://%s/cgi-bin/mt/mt.cgi**<br />
Keyword: **mt**
</code></div>



Now just type 'mt yourclientsite.com' and Firefox does the heavy lifting.  If you want a FastCGI rendition, just create another bookmark with mt.fcgi and set the keyword to 'mtf'.  It's totally flexible, just put in your standard installation location and you're off!



		