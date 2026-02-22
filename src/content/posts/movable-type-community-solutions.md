---
title: "Movable Type Community Solutions: First Impressions"
date: 2007-11-16 20:28:31
archive: true
excerpt: 
subtitle: 
slug: movable-type-community-solutions
featured_image_url: 
alt_text: 
primary_category: "CMS"
categories: ["CMS"]
tags: ["community", "documentation", "Movable Type", "MTCS", "reviews", "social networking"]
meta_description: 
context: professional
fix: false
hits: 186
---


			

I cracked open MTCS for the first time tonight for a project I&#8217;m working on.  Here are my initial thoughts, in no particular order:





**1. Custom Fields built-in.**  This is the first MT shipping as a full-fledged CMS.  You can create custom fields for entries, pages, categories, users and folders.  Blogs should really be on this list (for example, having a custom image for each blog in a network).  Also, you can&#8217;t create a global image or asset field; I think the reasoning is that assets are primarily blog specific.  However, I can think of instances where you&#8217;d want a custom image field that was available to all sites.





**2. Useful Trackbacks.**  Imagine that!  There&#8217;s now an option to allow only in-network blogs or whitelisted blogs to leave trackbacks.  That would be particularly useful in corporate extranet settings.





**3. Global templates.**  This is long overdue.  You now have system templates that each blog in network can call to.  Then you only need to change one template module and the changes are reflected across all your sites.  Also added: Email templates!





**4. Automatic Blogs.**  This option might have been available in MT4 as well, but it&#8217;s certainly useful and worth mentioning.  Create a user and a blog is automatically create for them; you can even specify the source blog to clone when creating.





**5. Community Settings.** This was sort of a let down.  Two options on this page: anonymous recommendation (allow anonymous users to recommend) and default upload destination.





**6. User Profiles.**  Better than nothing, but still weak.  The only thing they&#8217;ve added is a &#8220;Userpic&#8221; field, but there are no dimensions listed for it.  Could we at least have a bio field (user description, in keeping with our naming schemes)?





**7. Template Sets.**  This is a fantastic feature, and probably the biggest selling point for Six Apart.  The version of MTCS I&#8217;m running comes prepackaged with 3 template sets to choose from: Classic Blog, Community Blog and Community Forum; these are essentially entire sites packaged up and ready to go.  This brings up a really interesting dilemma: if the real power of the MTCS addon is in its template sets, are template sets free to distribute?  What&#8217;s to keep people from snagging Mark Carey&#8217;s <a href="https://mt-hacks.com/20070828-export-templates-with-template-exporter.html">Template Exporter</a> and distributing templates?  MTOS doesn&#8217;t cost a thing, and MTCS is fairly pricey; but will Six Apart need to restrict distribution of their template sets to keep their financial model (platform is free, addons are paid) viable?





**8. Forums and Community Blogs.**  Well, after actually installing a forum and a blog, I realized that what I said earlier wasn&#8217;t entirely true.  Even though the Community Solution seems to be primarily a set of templates, it does require mt-cp.cgi, which seems to be the file that handles posting a new blog item or a new forum topic.  It&#8217;s almost like a simplified shell for MT.  Oh, and the forum UI is slightly confusing with a hint of 90&#8217;s thrown in to boot: I had to click the number zero next to the word &#8220;favorite&#8221; to vote (after a manner) for a particular topic, and all the random icons are a bit disorienting.





All in all, I think that there&#8217;s a lot of potential here; Movable Type has always been more about providing a solid framework upon which to build.  But is it worth the hefty price tag, or should you just stick with MTOS and relevant plugins?  I&#8217;ll let you know after I finish this project.





**Update:**





**9. Improved Documentation.**  Not only is Six Apart finally giving us some really thorough documentation, but MTCS has a *fantastic* tag documentation feature that works sort of like the included template feature.  If you use a tag in your templates, it automatically shows up on the sidebar with a link to it&#8217;s documented page over at Movabletype.org.  I cannot tell you how handy this feature is!  Major props to the people at Six Apart for this little gem.



			<!--more-->

		