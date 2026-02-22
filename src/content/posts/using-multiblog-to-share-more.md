---
title: "Using MultiBlog to Share More"
date: 2005-08-15 12:12:25
archive: true
excerpt: 
subtitle: 
slug: using-multiblog-to-share-more
featured_image_url: 
alt_text: 
primary_category: "Movable Type"
categories: ["Movable Type"]
tags: []
meta_description: 
context: professional
fix: false
hits: 104
---


			### Module Aggregation




David Raynes&#8217; MultiBlog is a must have plugin for anyone interested in content aggregation, but it&#8217;s uses are far greater than just sharing text.





Take for instance storing a master stylesheet in your main blog and sharing it with other blogs (i.e. a FAQ blog) on your system to keep your look consistent.  You could also share template modules across an installation, giving you the freedom to structure different parts of your site uniquely while still being able to share common elements (header, search box, category list) painlessly.





Consider this example, where I&#8217;ve shared the header modules from blog 2 with the blog I&#8217;m currently working on:



<pre><code>&lt;MTMultiBlog include_blogs="2"&gt;&lt;$MTInclude module="header"$&gt;&lt;/MTMultiBlog&gt;
</code></pre>



Now I can easily make changes to the header without needing to worry about the other blogs, other than a simple rebuild.





And it isn&#8217;t limited to the body.  You can use MultiBlog tags in the head as well:



<pre><code>&lt;MTMultiBlog include_blogs="2"&gt;&lt;$MTBlogName encode_html="1"$&gt;&lt;/MTMultiBlog&gt;
</code></pre>



I can make changes to the title (or description/modules/categories for that matter) of the master blog (blog#2) and the add-on blogs don&#8217;t need to be changed.  



### Search Templates




I&#8217;ve found that this trick works *especially* well in search templates, because according to the Movable Type documentation: 





You can also use the <code>&lt;MTInclude&gt;</code> tag in your search templates to include template modules or external files.  In a template, the system needs to know which weblog to look in for the module named Header. If there are search results found, the system will look in the weblog that is *earliest alphabetically*; if there are *no search results*, Movable Type *will simply try* to load a weblog from your database (<span class="red">***the determination of the weblog that is chosen is undefined***</span>).





Undefined and controlled look/feel do not go hand in hand.  Using MultiBlog to specify a stylesheet or template module ensures that the blog pieces you want to appear are the ones that appear.



			<!--more-->

		