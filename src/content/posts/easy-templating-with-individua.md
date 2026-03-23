---
title: "Easy Templating with Individual Entry Archives"
date: 2006-09-11 03:42:51
archive: true
excerpt: 
subtitle: 
slug: easy-templating-with-individua
featured_image_url: 
alt_text: 
primary_category: "Blogging & CMS"
categories: ["Blogging & CMS"]
tags: []
meta_description: 
context: professional
fix: false
hits: 106
---


			

If you're like me, you don't like to code in theory.  You're constantly rebuilding your templates to be sure that everything looks the way you want it to.  This is fine when you're working with an index template.  You can simply rebuild that one template and view your changes.  But making changes to your individual entry archive usually means a full site rebuild to see your changes, which can be a real problem if you've got alot of entries.





So here are two quick tips for experimenting with your IEA's:


			<!--more-->#### The Single Entry Save




*Hacking Movable Type* describes this technique.  Make the changes to your IEA template, then pick an old obscure entry and resave it.  That entry alone will be rebuilt and you can view your changes.  The only drawback to this approach is that if you're truly experimenting with your IEA code, you have to overwrite what's there and (hopefully) back up the working copy of the template code to your notepad.  That's why I've taken to using the second approach.



#### An IEA as an Index Template




When playing with the code, I like the idea of building just one file in a "hidden" location (e.g. '_index.php') to avoid people having a "broken experience".  When working on my archive page or my index, I'll usually copy the template code and create a new template and set it up to publish to my "hidden" location of choice.  With this little tip, you can do the same thing with your individual entry archives.  





Simply create a new index template and paste your your IEA template code into it.  Set it to publish wherever you like (e.g. '_iea.php').  Then wrap the **entire** template in:





<code>&lt;MTEntries lastn="1"&gt;<br /><br />
...YOUR IEA TEMPLATE CODE...<br /><br />
&lt;/MTEntries&gt;</code>





You guessed it.  We're putting the entire IEA template in the context of one entry, which is basically what your IEA is anyhow.  When you're happy with your IEA, copy and paste everying except for the beginning and ending <mtentries> tags.  Voila!





(And if you don't like the way your last entry looks, just use the offset="x" attribute to push it back to previous entries.)


		