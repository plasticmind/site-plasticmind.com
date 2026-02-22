---
title: "WordPress Publish Confirmation"
date: 2012-12-19 10:50:37
archive: true
excerpt: 
subtitle: 
slug: wordpress-publish-confirmation
featured_image_url: https://plasticmind.com/wp-content/uploads/2012/12/mollyguard.png
alt_text: 
primary_category: "Code"
categories: ["Code", "WordPress"]
tags: []
meta_description: 
context: professional
fix: false
hits: 1251
---


			

I don&#8217;t typically like confirmation dialog boxes.  In nearly all cases, <a href="https://www.alistapart.com/articles/neveruseawarning/">an undo button is the better choice</a> than a confirmation dialog.





However, because of our existing WordPress set up, publishing an entry sets off a whole chain of events involving RSS feed readers, caches and a CDN that make it difficult to undo.  So I put together a simple WordPress function&#8212;a <a href="https://en.wikipedia.org/wiki/Big_red_button#Molly-guard">molly-guard</a>, if you will&#8212;that will trigger an &#8220;Are you sure you want to publish this?&#8221; confirmation alert before firing the actual publish event.





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



**Note:** This affects only the initial &#8220;Publish&#8221; event, not successive &#8220;Update&#8221; events.  It&#8217;s easy enough to modify it to include both.  Be sure to check out the <a href="https://gist.github.com/4337952">gist</a>&#8212;there are some revisions in there that might give you some ideas of how to tweak this to better suit your needs.



			<!--more-->

		