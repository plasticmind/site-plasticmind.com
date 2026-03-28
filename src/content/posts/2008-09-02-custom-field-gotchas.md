---
title: "Custom Field Gotchas"
date: 2008-09-02 10:06:03
archive: true
excerpt: 
subtitle: 
slug: custom-field-gotchas
featured_image_url: 
alt_text: 
primary_category: "Web Development"
categories: ["Web Development"]
tags: ["movable type", "cms"]
meta_description: 
context: professional
fix: false
hits: 195
---


			

Consider this a public service announcement to anyone debating about using Movable Type Custom Fields for a site:





**1. You cannot create <a href="https://bugs.movabletype.org/default.asp?pg=pgPublicView&amp;sTicket=80974_gi0c">system level asset custom fields.</a>**  This precludes sharing asset fields across larger blog networks where global templates are used. 





**2. There are no formatting options for editing Custom Fields.**  If you're using Custom Fields for your primary entry data (i.e. no entry body, only custom field data), be aware that they have no formatting options for the editor—it's just an input field.  You can get around this with <a href="https://plasticmind.com/movable-type/plasticfield/">my PlasticField plugin</a>, but it's not the best solution because it requires you to create a new field, doesn't use the default editor, and doesn't support installed format types like Markdown or Textile.





**3. You cannot <a href="https://forums.sixapart.com/index.php?showtopic=65698&amp;pid=262539&amp;mode=threaded&amp;start=#entry262539">sort by Custom Fields</a>** despite the note about the “sort_by” attribute (below the basename) <a href="https://www.movabletype.org/documentation/images/screenshots/pull-down-options-thumb-500x257.png">on the Create Field screen</a>.





**4. Date-based Custom Fields don't <a href="https://wiki.movabletype.org/CustomField_Date_Fields">honor the format argument.</a>**  They spit out one format alone making them virtually unusable for creating neat things like iCal files (which require UTC date formatting).  And a related problem: <a href="https://forums.movabletype.org/2008/08/custom-fields-date-field-error.html">You can no longer specify a time-only field or a date-only field in 4.2.</a>





**5. When cloning a blog, <a href="https://bugs.movabletype.org/default.asp?79649">Custom Field data is lost</a>** (though this seems to be fixed for the next release).





**Please feel free to let me know if I've missed anything.**



			<!--more-->

		