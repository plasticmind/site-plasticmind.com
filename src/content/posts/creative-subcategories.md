---
title: "Creative Ways To Use Subcategories"
date: 2007-09-08 21:49:40
archive: true
excerpt: 
subtitle: 
slug: creative-subcategories
featured_image_url: 
alt_text: 
primary_category: "Movable Type"
categories: ["Movable Type"]
tags: ["archive", "breadcrumbs", "categories", "children", "parent", "subcategories"]
meta_description: 
context: professional
fix: false
hits: 473
---


### Create a &#8220;Breadcrumb&#8221; Trail In Movable Type Using Subcategories




**Quandary:**  Someone clicks on a subcategory archive, but it looks just like every other category page.  How can we give the user a better sense of context for the subcategory pages?





**Solution:**  Breadcrumbs!  You know, they look like: *Category » Subcategory* , with links that let us get around a complex hierarchy pretty easily.  Put this code where your category title gets displayed:



<pre><code>&lt;mt:HasParentCategory&gt;
    &lt;mt:ParentCategories exclude_current="1"&gt;
        &lt;a href="&lt;mt:CategoryArchiveLink&gt;"&gt;&lt;mt:CategoryLabel&gt;&lt;/a&gt;
    &lt;/mt:ParentCategories&gt;  »
&lt;/mt:HasParentCategory&gt;
&lt;mt:ArchiveTitle&gt;
</code></pre>



Essentially, we check to see if the category page we&#8217;re on has a parent.  If it does, we append the title with that parent category name (exclude_current hides the subcategory we&#8217;re in) and link so the user can jump back pretty quickly.



### Display Subcategories As A Menu On A Category Archive Page




**Quandary:** You got several categories with subcategories, and you&#8217;d like to show these subcategories as a menu on the parent category archive page.





**Solution:** This is a little tricky because all subcategories are categories too.  So you have to think more in terms of relationships to tackle this one.  Here&#8217;s the code:



<pre><code>&lt;mt:HasSubCategories&gt;
    &lt;ul&gt;
    &lt;mt:SubCategories&gt;
        &lt;li&gt;&lt;a href="&lt;mt:CategoryArchiveLink/&gt;"&gt;&lt;mt:CategoryLabel /&gt;&lt;/a&gt;&lt;/li&gt;
    &lt;/mt:SubCategories&gt;
    &lt;/ul&gt;
&lt;/mt:HasSubCategories&gt;

&lt;mt:HasParentCategory&gt;
    &lt;mt:ParentCategories exclude_current="1"&gt;
        &lt;mt:HasSubCategories&gt;
            &lt;ul&gt;
            &lt;mt:SubCategories&gt;
                &lt;li&gt;&lt;a href="&lt;mt:CategoryArchiveLink /&gt;"&gt;&lt;mt:CategoryLabel /&gt;&lt;/a&gt;&lt;/li&gt;
            &lt;/mt:SubCategories&gt;
            &lt;/ul&gt;
        &lt;/mt:HasSubCategories&gt;
    &lt;/mt:ParentCategories&gt;
&lt;/mt:HasParentCategory&gt;
</code></pre>



The first chunk says, &#8220;If this category has subcategories (children), then run through the list of them and create a menu.&#8221;  This part targets the parent category pages, because they have children.





The second chunk is similar, but it&#8217;s meant for the subcategory pages themselves.  This code says, &#8220;If this category has a parent category, then give us a list of subcategories (children) that belong to that parent and make a menu.&#8221;  Since Movable Type doesn&#8217;t have any type of sibling tags, we have to go back to a parent if it exists and then display that parent&#8217;s children (those are the siblings).



			<!--more-->

		