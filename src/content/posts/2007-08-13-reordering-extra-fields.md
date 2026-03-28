---
title: "Tricking RightFields Into Showing Your Extra Fields First"
date: 2007-08-13 13:06:43
archive: true
excerpt: 
subtitle: 
slug: reordering-extra-fields
featured_image_url: 
alt_text: 
primary_category: "Web Development"
categories: ["Web Development", "Plugins"]
tags: ["cms"]
meta_description: 
context: professional
fix: false
hits: 178
---


			

<a href="https://www.staggernation.com/mtplugins/RightFields/">Kevin Shay's RightFields</a> is probably one of my most-used plugins for Movable Type, and thanks to Kevin's help I came up with a unique solution to a problem I was facing.





RightFields lets you rename the standard fields (entry body, extended entry, etc.), but I had a strange situation today where I needed to keep the standard fields untouched and use only extra fields.  (The client was migrating from using the entry body for everything to using the extra fields for different types of data, but it's a migration that will take a long time.)  Of course, RightFields handles this beautifully, but the client has a unique request: *move the extra fields to the top of the edit entry screen*.





Unfortunately, RightFields doesn't have the option to place the extra fields before the standard fields.  But here's the nifty tweak:  





RightFields uses <code>&lt;TMPL_IF NAME=DISP_PREFS_SHOW_TAGS&gt;</code> as an anchor to place the extra fields in the edit_entry.tmpl file.  (This is the template that you see when you edit an entry.)  So let's fool RightFields into moving the extra fields by moving the anchor.





Edit the /MT_DIR/tmpl/cms/edit_entry.tmpl file.





Look for <code>&lt;div id="body-box"&gt;</code> and put the following code right after it:





<code><br />
&lt;!-- Lets trick RightFields! --&gt;<br /><br />
	&lt;TMPL_IF NAME=DISP_PREFS_SHOW_TAGS&gt;&lt;/TMPL_IF&gt;<br /><br />
&lt;!-- End trick --&gt;<br />
</code>





Your edit entry screen should now display extra fields first!



		