---
title: "Category-based Combo Boxes"
date: 2005-08-22 04:12:36
archive: true
excerpt: 
subtitle: 
slug: categorybased-combo-boxes
featured_image_url: 
alt_text: 
primary_category: "Movable Type"
categories: ["Movable Type"]
tags: []
meta_description: 
context: professional
fix: false
hits: 87
---


#### Less Is More




One key principle of interface design is not to overload your users by dumping every choice available on your site right there on the front page.  Users don't mind drilling for information that needs to be drilled for.  Important stuff should be readily and easily accessible, and category archives falls into the category of important stuff, especially since they're one of the primary ways someone navigates your site.  But for anyone who posts on a regular basis, your category section can become rather large and unwieldy, very quickly falling under the category of &#8220;choice dumping&#8221;.  ***Fifty-one categories and seventy-two months listed on your sidebar may be intellectually impressive, but certainly aren't going to help the newcomer figure out your site.***





The category-based combo box really solves a lot of problems, because the information is there, hidden only in a simple form element which most users are comfortable with because they've used these in other applications.  A simple click of the button and your categories or months are displayed; another click and they're off to that page.  A useful tool that's made even more so by Movable Type's publishing capabilities.



#### How To Do It




What we're going to do, essentially, is create a combo box that uses a bit of javascript to load the URL from the <code>value</code> of the selected option.  The options are generated just like you'd generate list items (<code>&lt;li&gt;</code>) inside of an unordered list (<code>&lt;ul&gt;</code>), using the <code>&lt;MTArchiveList&gt;</code> tag with the archive_type qualifier set to &#8220;Category&#8221;:



<pre><code>&lt;form action=""&gt;
    &lt;select name="CategorySelect" onchange="if(options[selectedIndex].value) window.location.href=(options[selectedIndex].value)"&gt;
    &lt;option value="#"&gt;Browse by category:&lt;/option&gt;
    &lt;MTArchiveList archive_type="Category"&gt;
    &lt;option value="&lt;$MTArchiveLink$&gt;"&gt;&lt;$MTArchiveTitle$&gt; (&lt;$MTArchiveCount$&gt;)&lt;/option&gt;
    &lt;/MTArchiveList&gt;
    &lt;/select&gt;
    &lt;noscript&gt;&lt;input type="submit" value="Go" /&gt;&lt;/noscript&gt;
&lt;/form&gt;
</code></pre>



Let me point out the most important part of this code:  The <code>&lt;$MTArchiveLink$&gt;</code>.  Without this value in your option tag, you're browser ain't goin' nowhere, Batman.  That tag tells MT to place the link as the value of the option and the <code>&lt;$MTArchiveTitle$&gt;</code> provides an easier translation of that for the user.  I've put the category count in with the option, but that's completely optional (pardon the pun).  You can just remove the parenthesis and the <code>&lt;$MTArchiveCount$&gt;</code> to taste.





You can also change the flavor of this combo box to &#8220;Monthly&#8221; simply by changing the archive_type qualifier in the <code>&lt;MTArchiveList&gt;</code> tag to &#8220;Monthly&#8221;.  Movable Type will do the rest. 





An important note:  The first option I've set up is &#8220;Browse by Category&#8221; and cannot be chosen (or rather, it is the default state so you cannot change *to* it).  However, if a user visits a category and uses the browser back button, some browsers will have that category option still selected.  So if they (for whatever reason) choose &#8220;Browse by category:&#8221; it's going to send the value &#8220;#&#8221; to the browser, basically telling it to stay on the current page.



#### Accessibility Issues




To ensure usability for those with scripts disabled, we've wrapped a submit button inside of a <code>&lt;noscript&gt;</code>.  One extra step for those users, but if they've disabled scripts, they're probably used to that.





Be aware that this drop down box doesn't *quite* work with subcategories.  If you'd like a thorough explanation of how to put a hierarchical dropdown list of category archives on your page, <a href="https://www.rayners.org/2005/02/hierarchical_dr.php">check out David's Raynes article on it</a>.



			<!--more-->

		