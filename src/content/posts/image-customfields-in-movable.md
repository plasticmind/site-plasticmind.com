---
title: "Image CustomFields in Movable Type 4.1"
date: 2008-03-05 09:20:29
archive: true
excerpt: 
subtitle: 
slug: image-customfields-in-movable
featured_image_url: 
alt_text: 
primary_category: "Movable Type"
categories: ["Movable Type", "Plugins"]
tags: ["assets", "customfields", "Professional Pack"]
meta_description: 
context: professional
fix: false
hits: 477
---


			<h5>Dilemma: Image Link Instead of Image</h5>



Many of the sites I build use CustomFields to place a masthead image at the top of an entry.  This takes the hassle out of uploading and really just makes it easier for customers to have a consistent look and feel for their posts.  Trouble is, when I upgraded to Movable Type 4.1 (see this post for details about how to upgrade from Arvind&#8217;s CustomFields plugin to the one that&#8217;s built in to MT Professional Pack), the image asset links were only showing up as text links.  For example, using the code they suggested on the CustomFields screen:



<pre><code> &lt;mt:IfNonEmpty tag="EntryDataMastheadImage"&gt;
      &lt;mt:EntryDataMastheadImage /&gt;
 &lt;/mt:IfNonEmpty&gt;
</code></pre>



Resulted not in a placement of the image, but rather the words &#8220;View Image&#8221; with a link to the photo.  Not exactly what I had in mind.  I want the actual photo itself.  





Now, there are all sorts of cool new tags (like <code>&lt;mt:AssetLabel /&gt;</code> and <code>&lt;mt:AssetUrl /&gt;</code>) that let you get at any part of your uploaded asset.  The only trouble is, there&#8217;s no documented way to put the asset you want (in our case <code>&lt;mt:EntryDataMastheadImage /&gt;</code>)  in context.  Sure, you can do an mt:Assets loop that lets you list the last however many assets; but we&#8217;re trying to get at <code>mt:EntryDataMastheadImage</code>, nothing else.



<h5>Solution: Create CustomField Container With -Asset Suffix</h5>



When you create a custom field in Movable Type, it creates two tags for you.  The first is the one I listed before: <code>&lt;mt:EntryDataMastheadImage /&gt;</code> and it&#8217;s a single tag that&#8217;s used to call to the asset in question.  There&#8217;s another, undocumented tag that&#8217;s created: <code>&lt;mt:EntryDataMastheadImageAsset /&gt;</code>.  **This** tag is a container tag that does exactly what we need: puts that particular CustomField data in context.  Once it&#8217;s in context, we can use all of those nifty tags to get at whatever specific asset information we want.  Here&#8217;s how I solved my particular problem:



<pre><code> &lt;mt:IfNonEmpty tag="EntryDataMastheadImage"&gt;
      &lt;mt:EntryDataMastheadImageAsset&gt;
           &lt;img src="&lt;mt:AssetURL /&gt;" /&gt;
      &lt;/mt:EntryDataMastheadImageAsset&gt;
 &lt;/mt:IfNonEmpty&gt;
</code></pre>



*A great big round of applause to <a href="https://mt-hacks.com">Mark Carey</a> for helping me discover this little undocumented nugget.  Update: Arvind pointed out that <a href="https://plugins.movalog.com/forums/viewtopic.php?id=642">it&#8217;s documented on his forums</a>.*



			<!--more-->

		