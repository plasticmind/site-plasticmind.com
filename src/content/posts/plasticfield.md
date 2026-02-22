---
title: "PlasticField, A Plugin For Movable Type"
date: 2008-06-03 00:16:02
archive: true
excerpt: 
subtitle: 
slug: plasticfield
featured_image_url: 
alt_text: 
primary_category: "Movable Type"
categories: ["Movable Type"]
tags: []
meta_description: 
context: professional
fix: true
hits: 402
---


			

Thanks to <a href="https://endevver.com">Jay</a> and <a href="https://movalog.com">Arvind</a>, I&#8217;ve finally finished my first plugin, **PlasticField**.  I&#8217;d appreciate any <a href="https://plasticmind.com/contact/">feedback</a> on it you may have.



<h3>Overview</h3>



This plugin gives you a new custom field type (&#8216;Formatted Multi-Line Text Field&#8217;) with familiar formatting buttons as well as resizing controls instead of the bare boxes that CustomFields provides by default.  Extremely handy if you&#8217;re using Movable Type&#8217;s Custom Fields extensively as a CMS.





<img src="https://img.skitch.com/20080603-8uyyn8bacqdjjd51h64ynnayfm.png" alt="PlasticField" />



<h3>Requirements</h3>



PlasticField requires that you have <a href="https://www.movabletype.com/products/mt4.html">MT4.1 Professional</a> or higher running.  (The CustomFields addon pack is required.)





<a href="https://plasticmind.com/plugins/PlasticField.zip" class="download-link">Download PlasticField v.0.1 for MT <span>(.zip/32k, updated 6/3/08)</span></a>



<h3>Cost and Support</h3>



This plugin is free and is provided as-is.  You can use it, redistribute it and/or modify it.  You just can&#8217;t start reselling it as-is.  If you have a problem and would like to submit a fix, let me know.  **If you&#8217;d like to hire me to install it for you or just make your website look good, <a href="https://plasticmind.com/contact/">drop me a line</a>.**



<h3>Installation</h3>



Simply copy the contents of /plugins/ to your Movable Type plugin directory, and copy the
contents of /mt-static/ to your static directory.  



<h3>Using PlasticField</h3>



Look for changes to your Customfields » New Field screen.  If you&#8217;ve installed it correctly, the field type dropdown on the New Field screen should list &#8220;Formatted Multi-Line Text Area&#8221; as one of the choices.



<h3>Converting Existing Fields</h3>



Some people have asked about enabling these formatting controls on existing fields.  To do that, you must specify a different field type for the field, and that&#8217;s not something you can do from the application yet (I&#8217;d really like to address in a future release).  If you&#8217;re feeling bold and have made a backup recently, you can edit the mt-fields table in your database and change the field-type from &#8216;textarea&#8217; to &#8216;formatted_field&#8217; in any of the fields you want converted.  **Do this at your own risk!**



			<!--more-->

		