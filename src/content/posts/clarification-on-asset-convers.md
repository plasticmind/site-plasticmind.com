---
title: "Clarification On Asset Conversion, From RightFields to Custom Fields"
date: 2008-06-25 13:13:37
archive: true
excerpt: 
subtitle: 
slug: clarification-on-asset-convers
featured_image_url: 
alt_text: 
primary_category: "Movable Type"
categories: ["Movable Type"]
tags: ["conversion", "Custom Fields", "Rightfields", "upgrade"]
meta_description: 
context: professional
fix: false
hits: 167
---


			

**If you don't use Movable Type or either one of these plugins, you can stop reading now.**





I hope you'll forgive the long, intimidating title.  It's just that there has been some confusion regarding the move from Right Fields to Custom Fields, specifically when it comes to asset related fields.  





**First, let's talk about the difference between the RightFields and Custom Fields image field.**





A Rightfield's file field let you choose a file from your computer.  On save, this file would then be uploaded to a location on your server that you specified in the settings for that particular field along with miscellaneous upload options like naming and overwrite.  Rightfields stored the preset upload folder separately from the entry filename.  Then it offered a tag (i.e. <code>&lt;MTFileURLPath field="document"&gt;</code> which basically &#8220;built&#8221; your file's location by combining the preset folder and the name it gave it when it uploaded.  This was extremely useful because a developer could preset all of the location, naming and overwrite defaults and the client didn't have to think about it. 





Custom Field asset fields work differently.  You click an &#8220;Upload&#8221; button which triggers the asset manager.  All of the options for naming, location and overwriting are presented to the user through the asset manager interface.  It's a somewhat bulky process, especially for developers looking to streamline the image uploading experience for their users.  The upside is that other plugins can manipulate the asset manager, like Dan's Better File Uploader.





**What's the big deal about converting RF file fields to CF asset fields?**





As was mentioned before, Rightfield separates the filename from the location. This dissection of the URL makes converting into a system asset a pain.  Also, keep in mind RF really knew nothing about the asset other than it's filename&#8212;it is, essentially, a textfield with the filename.  So converting it to a text field in CF makes the most sense from an developmental standpoint.  That's exactly what Chad Everett's <a href="https://cxliv.org/2008/05/09/converting_rightfields_to_customfields_now_with_sql_goodness.php">RF2CF plugin</a> does.  Obviously, it's not the perfect solution, but it works. 





**So, what should happen?**





The ideal scenario would be for the import tool to merge both <a href="RF2CF plugin](https://cxliv.org/2008/05/09/converting_rightfields_to_customfields_now_with_sql_goodness.php">Chad's RF2CF</a> plugin with <a href="https://plugins.movalog.com/asset-handler/">Arvind's AssHAT plugin</a>.  This uber-plugin would pull out the file name from RF's file field, combine it with the base location from the field settings and then pass that full file location information to AssHAT's magic unicorns which could then turn it into an asset.





For right now, though, the best solution (which I've used several times with great success) is Chad's plugin which ports over nearly all of Custom Fields successfully and puts the filename from old RF file fields into simple text fields which can then be built out into your templates.



			<!--more-->

		