---
title: "List Random Authors (via PHP)"
date: 2008-01-23 19:36:23
archive: true
excerpt: 
subtitle: 
slug: list-random-authors
featured_image_url: 
alt_text: 
primary_category: "Movable Type"
categories: ["Movable Type"]
tags: ["author", "php", "random"]
meta_description: 
context: professional
fix: false
hits: 214
---


			

It's been far too long since I posted to the Tweak.  Sometimes it's hard to document when you're working, but one of my resolutions is to do better with this (especially with the phenomenal strides Movable Type has taken recently).  In the mean time, you'll probably find more frequent, shorter posts that may not have as much explanation as you might have found in the past.  The hope is that getting a lot of quick solutions out there for public consumption is better than a few comprehensive ones.  **Enjoy.**





A couple of things to note first:  Makes sure that you've got author archives set up.  You can hack this to work with author profiles, but that's not the scope of this tutorial.



<pre><code>&lt;?php
    $displayed_authors = array(); // Will hold indexes from $authors for authors already displayed
    $show = 25; // How many authors should we show?

    &lt;mt:Authors&gt;
        $authors[&lt;mt:AuthorId /&gt;] = '&lt;li&gt;&lt;a href="&lt;mt:EntryLink archive_type="Author" /&gt;"&gt;&lt;mt:EntryAuthorDisplayName encode_php='1' /&gt;&lt;/a&gt;&lt;/li&gt;';
    &lt;/mt:Authors&gt;

    for ($i=1; $i &lt;= $show; $i++) {
        $rn = array_rand($authors);
        // Loops until it finds an author not displayed
        while(in_array($rn, $displayed_authors)) {
            $rn = array_rand($authors);
        }
        array_push($displayed_authors, $rn);
        echo $authors[$rn];
    }
?&gt;
</code></pre>



First, we set up an array where we'll store all the authors that have already been displayed.  More on that in a minute.  Then we define how many authors we want to show with this block.





Next, we loop through all the authors, stashing them all into an array.  Actually, we're stashing the html that we want displayed as it gets looped through.  This can be basically whatever you want.  If you use other Movable Type tags, make sure you add the  <code>encode_php='1'</code> filter or else you could get some nasty PHP parse errors and break your site. (*Usually because of single quote/double quote mismatching.*)





Next up is displaying the authors.  We're going to loop through authors 25 times; remember, that's what we set up with the $show variable.  The <code>array_rand</code> function basically says &#8220;pull a random number from 1 to the number of items in our array&#8221;.  We had to put in a special <code>while</code> loop to make sure it didn't pick a number already used; this would result in duplicate listings of a single author.  The <code>array_push</code> then stores the new, non-duplicate random number in our displayed authors array to ensure we don't duplicate it next time through the loop.





Finally, we echo a random item from the <code>$authors</code> array.  This loops through however many times you've told it to with the <code>$show</code> variable.





**Thanks to <a href="https://movalog.com">Arvind</a> for helping me solve the dupe problem.  He also made me say that I will now worship him forever.**



			<!--more-->

		