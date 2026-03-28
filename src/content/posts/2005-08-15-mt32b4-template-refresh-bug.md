---
title: "MT3.2 beta 4 Template Refresh Bug"
date: 2005-08-15 11:40:54
archive: true
excerpt: 
subtitle: 
slug: mt32b4-template-refresh-bug
featured_image_url: 
alt_text: 
primary_category: "Web Development"
categories: ["Web Development"]
tags: ["cms"]
meta_description: 
context: professional
fix: false
hits: 96
---


			

This is more of a typo than a bug.  When refreshing your default Main Index template, it pulls in the code from the default template directory of your MT installation, and the Main Index default template adds an additional `>"` to the link to atom.xml feed.





Removing the extra characters in the main_index.tmpl of your default_templates directory should take care of it no problem and ensure bug free template refreshing.


			
		