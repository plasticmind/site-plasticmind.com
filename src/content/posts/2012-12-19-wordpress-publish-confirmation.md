---
title: "WordPress Publish Confirmation"
date: 2012-12-19 10:50:37
archive: true
excerpt: 
subtitle: 
slug: wordpress-publish-confirmation
featured_image_url: /assets/i/mollyguard.png
alt_text: 
primary_category: "Web Development"
categories: ["Web Development"]
tags: ["cms"]
meta_description: 
context: professional
fix: false
hits: 1251
---


			

I don't typically like confirmation dialog boxes.  In nearly all cases, <a href="https://www.alistapart.com/articles/neveruseawarning/">an undo button is the better choice</a> than a confirmation dialog.





However, because of our existing WordPress set up, publishing an entry sets off a whole chain of events involving RSS feed readers, caches and a CDN that make it difficult to undo.  So I put together a simple WordPress function—a <a href="https://en.wikipedia.org/wiki/Big_red_button#Molly-guard">molly-guard</a>, if you will—that will trigger an “Are you sure you want to publish this?” confirmation alert before firing the actual publish event.





Just drop this code into your functions.php:



<pre><code>/* = Add a "molly guard" to the publish button */

add_action( 'admin_print_footer_scripts', 'sr_publish_molly_guard' );
function sr_publish_molly_guard() {
echo &lt;&lt;&lt;EOT
&lt;script&gt;
jQuery(document).ready(function($){
    $('#publishing-action input[name="publish"]').click(function() {
        if(confirm('Are you sure you want to publish this?')) {
            return true;
        } else {
            $('#publishing-action .spinner').hide();
            $('#publishing-action img').hide();
            $(this).removeClass('button-primary-disabled');
            return false;
        }
    });
});
&lt;/script&gt;
EOT;
}
</code></pre>



**Note:** This affects only the initial “Publish” event, not successive “Update” events.  It's easy enough to modify it to include both.  Be sure to check out the <a href="https://gist.github.com/4337952">gist</a>—there are some revisions in there that might give you some ideas of how to tweak this to better suit your needs.



			<!--more-->

		