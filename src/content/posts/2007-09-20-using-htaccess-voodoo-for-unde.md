---
title: "Using .htaccess Voodoo For Underscore and Dash Woes"
date: 2007-09-20 07:58:47
archive: true
excerpt: 
subtitle: 
slug: using-htaccess-voodoo-for-unde
featured_image_url: 
alt_text: 
primary_category: "Social Media & SEO"
categories: ["Social Media & SEO"]
tags: []
meta_description: 
context: professional
fix: false
hits: 674
---


			

Here's a little tip for people who have recently switched to dashes (-) from underscores (_) as word separators and wish all those old inbound links could still work.  Try this in your <a href="https://en.wikipedia.org/wiki/Htaccess">.htaccess file</a>:



<pre><code>Options +FollowSymLinks
RewriteEngine on
RewriteBase /
RewriteRule ^([^_]*)_([^_]*)_([^_]*)_([^_]*)_([^_]*)_(.*).html$ https://example.com/$1-$2-$3-$4-$5-$6.html [R=301,L]
RewriteRule ^([^_]*)_([^_]*)_([^_]*)_([^_]*)_(.*).html$ https://example.com/$1-$2-$3-$4-$5.html [R=301,L]
RewriteRule ^([^_]*)_([^_]*)_([^_]*)_(.*).html$ https://example.com/$1-$2-$3-$4.html [R=301,L]
RewriteRule ^([^_]*)_([^_]*)_(.*) .html$ https://example.com/$1-$2-$3.html [R=301,L]
RewriteRule ^([^_]*)_(.*) .html$ https://example.com/$1-$2.html [R=301,L]</code></pre>



Here's how it works: if a request comes into your server for an .html files with underscores, it redirects that request to the corresponding file with dashes.  So if you've got a blog that was publishing files_like_this.html and now is publishing files-like-this.html, the old links from a friend's site to the a_file_like_this.html will be redirected to it's dashed counterpart.





The first RewriteRule deals with entries that have 5 underscores.  The second deals with entries that have 4, and so on.  I could have written a regular expression that would redirected each time an underscore was written, but you'd end up with your server redirecting 4 or 5 times, which would be oppressively slow and taxing on your server, neither acceptable side effects.  





This technique, on the other hand, limits the redirects to one; the only drawback is that if you've got more than 5 underscores, you'll need to add another RewriteRule above the first one with extra wildcards in the regex and a -$7 at the end.  A reasonable price to pay for snappier server response.  Also, keep in mind that you may need to swap out extensions if need be (for instance, you'll notice that my articles have no extensions--cruft-free--so I took out the extensions altogether from the RewriteRules).



		