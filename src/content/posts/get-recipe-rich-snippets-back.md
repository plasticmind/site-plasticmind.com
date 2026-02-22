---
title: "How We Got Our Rich Snippets Back"
date: 2014-09-05 15:50:56
archive: true
excerpt: 
subtitle: 
slug: get-recipe-rich-snippets-back
featured_image_url: 
alt_text: ""
primary_category: "SEO"
categories: ["SEO"]
tags: ["Google", "richsnippets"]
meta_description: 
context: professional
fix: false
hits: 1000
---

Several months ago the photos for our recipes disappeared from Google's search result pages:

<img class="alignnone size-full wp-image-5080" src="https://plasticmind.com/wp-content/uploads/2014/09/no-snippet.png" alt="no-snippet" width="542" height="399" />

Not great, since most people search visually, more so when they're hungry.

Now, I don't like talking much about anything to do with SEO, since the landscape changes so often and I'm left feeling like Google's little guinea pig.  However, I did want to share my experience since others seem to be having similar problems.

In 2012, <a title="hRecipe and Rich Snippets" href="https://plasticmind.com/wordpress/wordpress-hrecipe-gotcha/">we ran into problems with Google's rich snippets</a> because of conflicts while trying to use the hrecipe microformatting.  To put it plainly, since our recipe pages had both hentry and hrecipe classes, Google decided to pay attention to the hentry and ignore all the rest of the recipe microformatting on the page—resulting in no recipe markup at all.

A year later, <a title="Google favoring microdata" href="https://plasticmind.com/seo/elusive-rich-snippets/">I came to the conclusion</a> that Google was starting to favor microdata (using the itemprop attribute) instead of microformatting (using special classes).  I added all of the Schema.org information that Google prescribed and left the hrecipe markup largely intact, removing only the hrecipe class.  Google recommended using only one approach, but I didn't think much about it since most of the microformatting was really just classes like "ingredients" and "author" and the snippets were still working.

However, our rich snippets disappeared again this summer, baffling us.

It was a kind message from <a href="https://gracessweetlife.com/about/">Grace Langlois</a> that prompted me to think again about my dual approach. I reviewed our code and found the hrecipe class had crept back in there during our site relaunch.  I pulled it out along with all of the other microformat-specific classes I hadn't removed earlier.

It seems as though Google was seeing both sets of markup on our pages and ignoring microdata in favor of our hrecipe markup. And because Google has been shifting away from hrecipe, we got *some* info in our rich snippet, but never complete.

Removing all references to hrecipe seems to have forced Google to pick up the microdata markup, which seems to have brought back our pictures:

<img class="alignnone size-full wp-image-5081" src="https://plasticmind.com/wp-content/uploads/2014/09/snippet.png" alt="snippet" width="541" height="476" />

<h3>Related Links:</h3>

<ul>
    <li>Google: <a href="https://support.google.com/webmasters/answer/99170?hl=en">About rich snippets and structured data</a></li>
    <li><a href="https://schema.org/Recipe">Schema.org/Recipe</a></li>
    <li><a href="https://wordpress.org/support/view/plugin-reviews/all-in-one-schemaorg-rich-snippets">All-In-One Schema.org WordPress Plugin</a></li>
</ul>