---
title: "Image CustomFields in Movable Type 4.1"
date: 2008-03-05 09:20:29
archive: true
excerpt: 
subtitle: 
slug: image-customfields-in-movable
featured_image_url: 
alt_text: 
primary_category: "Web Development"
categories: ["Web Development", "Plugins"]
tags: ["cms"]
meta_description: 
context: professional
fix: false
hits: 477
---


##### Dilemma: Image Link Instead of Image




Many of the sites I build use CustomFields to place a masthead image at the top of an entry.  This takes the hassle out of uploading and really just makes it easier for customers to have a consistent look and feel for their posts.  Trouble is, when I upgraded to Movable Type 4.1 (see this post for details about how to upgrade from Arvind's CustomFields plugin to the one that's built in to MT Professional Pack), the image asset links were only showing up as text links.  For example, using the code they suggested on the CustomFields screen:



<pre><code> &lt;mt:IfNonEmpty tag="EntryDataMastheadImage"&gt;
      &lt;mt:EntryDataMastheadImage /&gt;
 &lt;/mt:IfNonEmpty&gt;
</code></pre>



Resulted not in a placement of the image, but rather the words “View Image” with a link to the photo.  Not exactly what I had in mind.  I want the actual photo itself.  





Now, there are all sorts of cool new tags (like <code>&lt;mt:AssetLabel /&gt;</code> and <code>&lt;mt:AssetUrl /&gt;</code>) that let you get at any part of your uploaded asset.  The only trouble is, there's no documented way to put the asset you want (in our case <code>&lt;mt:EntryDataMastheadImage /&gt;</code>)  in context.  Sure, you can do an mt:Assets loop that lets you list the last however many assets; but we're trying to get at <code>mt:EntryDataMastheadImage</code>, nothing else.



##### Solution: Create CustomField Container With -Asset Suffix




When you create a custom field in Movable Type, it creates two tags for you.  The first is the one I listed before: <code>&lt;mt:EntryDataMastheadImage /&gt;</code> and it's a single tag that's used to call to the asset in question.  There's another, undocumented tag that's created: <code>&lt;mt:EntryDataMastheadImageAsset /&gt;</code>.  **This** tag is a container tag that does exactly what we need: puts that particular CustomField data in context.  Once it's in context, we can use all of those nifty tags to get at whatever specific asset information we want.  Here's how I solved my particular problem:



<pre><code> &lt;mt:IfNonEmpty tag="EntryDataMastheadImage"&gt;
      &lt;mt:EntryDataMastheadImageAsset&gt;
           &lt;img src="&lt;mt:AssetURL /&gt;" /&gt;
      &lt;/mt:EntryDataMastheadImageAsset&gt;
 &lt;/mt:IfNonEmpty&gt;
</code></pre>



*A great big round of applause to <a href="https://mt-hacks.com">Mark Carey</a> for helping me discover this little undocumented nugget.  Update: Arvind pointed out that <a href="https://plugins.movalog.com/forums/viewtopic.php?id=642">it's documented on his forums</a>.*



			<!--more-->

		