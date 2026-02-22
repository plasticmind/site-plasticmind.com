---
title: "WordPress hRecipe Gotcha"
date: 2012-11-21 05:33:48
archive: true
excerpt: 
subtitle: "Help!  My recipe thumbnails aren't showing up in Google search results anymore!"
slug: wordpress-hrecipe-gotcha
featured_image_url: 
alt_text: ""
primary_category: "WordPress"
categories: ["WordPress"]
tags: []
meta_description: "Help! My recipe thumbnails aren't showing up in Google search results anymore!"
context: professional
fix: false
hits: 888
---

**Update:** It appears that Google now prefers metadata (Schema.org) over microformats (hrecipe). More information on <a title="How We Got Our Rich Snippets Back" href="https://plasticmind.com/seo/get-recipe-rich-snippets-back/">my blog post about switching to metadata</a>.

We recently migrated <a href="https://www.simplyrecipes.com/">Simply Recipes</a> over to WordPress from Movable Type. All-in-all a pretty seamless transition, and one I plan to document extensively in the coming weeks.

However, one of the strange things that happened right away was that **nearly all of our <a href="https://support.google.com/webmasters/bin/answer.py?hl=en&amp;answer=99170">rich snippets</a> disappeared from Google’s search results**. If you don’t know what rich snippets are, here’s a quick summary: for certain types of pages, Google grabs structured information from your page so it can display it inline with its search results. For recipes, a thumbnail of the food along with some preparation information gets displayed. Losing these is a big deal for a food blog since people looking for recipes tend to search with their eyes which are connected to their bellies.

<img class="mt-image-none" src="https://plasticmind.com/assets/Roast%20Turkey.png" alt="Roast Turkey.png" width="500" height="286" />

What confused me most is that I was using essentially the same HTML structure with the new WP site as I was with MT. How could it suddenly change—did Google change how they parsed recipes?

Thankfully, Google has a <a href="https://www.google.com/webmasters/tools/richsnippets">Rich Snippet Tool</a> that lets you test your pages for the presence of metadata on your page and gives you feedback about anything that needs to be changed to get rich snippets working as they should. However, to add to the confusion, some of our URLs worked and thumbnails were displayed, but others were not showing the thumbnail. Nothing worse than a problem that you can’t recreate consistently.

Anyhow, after some extensive testing, I figured out the mystery of the disappearing thumbnails.

WordPress has a function called <code>post_class()</code> that spits out all of the relevant classes for the a page. You can tell it to add classes, e.g. <code>post_class('hrecipe')</code> which is exactly what I was doing on recipe pages so Google would recognize this was a recipe and process the data on the page accordingly.

However, when you add a class using that function, it’s added to the **end** of the list of classes.

“Not a problem”, thought I.

Except that Google seems to process the list and grab the **first** type it recognizes. Again, no problem—except WordPress by default adds the “hentry” class to all single post pages. And that hentry class was causing to Google treat the page like an article even though the Rich Snippet Tool was displaying all of the correctly formatted recipe information it found on the page. **The hentry class seems to trigger Google to look for a different set of meta information about a page, and most importantly, it seems to cause it to ignore the photo.**

So the culprit was the hentry class WordPress was inserting into all posts by default with the <code>post_class()</code> function.

The following code inserted into functions.php did the trick:

<pre><code>/* = HRECIPE ================================ */

function sr_replace_hentry($class){
    if (get_post_type() === 'recipe'):
        for($i=0;$i&lt;count($class);$i++) {
           if($class[$i] == 'hentry') { $class[$i] = 'hrecipe'; }
        }
    endif;
    return $class;
}
add_filter('post_class','sr_replace_hentry');
</code></pre>

In plain language, here’s what the code does: “When spitting out the list of classes on a post, if we’re on a recipe page, replace hentry with hrecipe.”

<img class="alignnone size-full wp-image-5123" src="https://plasticmind.com/wp-content/uploads/2012/11/2014-09-11-at-10.19-AM.png" alt="Roast Turkey" width="547" height="144" />

Google Rich Snippet tool now displays the thumbnail alongside the recipe as expected.