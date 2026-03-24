---
title: "Pinterest Image Overlays"
date: 2013-02-28 07:38:14
archive: true
excerpt: 
subtitle: "Some code snippets to give you a nice looking Pinterest overlay for your images."
slug: pinterest-image-overlays
featured_image_url: /assets/i/pinterest_overlay.png
alt_text: 
primary_category: "Web Development"
categories: ["Web Development", "Social Media & SEO"]
tags: []
meta_description: "Some code snippets to give you a nice looking Pinterest overlay for your images."
context: professional
fix: false
hits: 1693
---

I put together a little jQuery snippet for Simply Recipes that gives images in the body of the recipes a nice little Pinterest icon when you hover over them, letting users Pin the recipe using any of the photos from the recipe.

It’s a fun little way to encourage people to share, and I thought I’d pass it along it for anyone interested in doing something similar.

This gets dropped either into a <code>&lt;script&gt;</code> tag in your header or into a common Javascript file that gets loaded for your site. Be sure you’re loading jQuery first:

<pre><code>// PINTEREST BUTTON IMAGE OVERLAYS --------------------------------- //

$('.entry-content img').each(function(){
    var image_width = $(this).width();
    if( image_width &gt; 1 ) {
        var src=$(this).attr('src');
        $(this).wrap('&lt;div class="pinthis-image" /&gt;').before('&lt;a href="https://pinterest.com/pin/create/button/?url='+document.location.href+'&amp;amp;media='+src+'&amp;amp;description='+document.title+'" class="sn_pin" target="_blank"&gt;&lt;span class="pin_icon"&gt;&lt;/span&gt;&lt;span class="pin_button"&gt;&lt;/span&gt;&lt;/a&gt;');
    }
});
</code></pre>

**Important note:** The code above targets all images in the .entry-content div. You can update this to target whichever images you’d like using jQuery selectors. For example, for Simply Recipes, we’re using <code>.single:not(.print-page) .hrecipe .featured-image img, .single .hrecipe .recipe-description img, #recipe-footer img</code>. Roughly translated, that’s “any image on a single recipe page contained in the featured image, recipe description and recipe footer sections” (our method shots are too small to share).

Also, if you’re wondering why I’m testing the image_width, I found that Amazon links drop in an invisible 1px image for tracking, and this was getting the Pinterest treatment. The 1px text makes sure those little images don’t get included. Feel free to up that if you don’t want the treatment being applied to images under a certain size.

Finally, add the following to your style.css stylesheet. Defining keyframes (the animation) for each browser makes this a bit long. Don’t forget to upload the images below and update the image paths.

<pre><code>/* Pinterest Button Image Overlay */

.pinthis-image {
position: relative;
}
.sn_pin {
  width:100%;
  height:100%;
  z-index:999;
  position:absolute;
  top: 15px;
  -webkit-transition: opacity .5s;
  -moz-transition: opacity .5s;
  transition: opacity .5s;
}
.pin_button,
.pin_icon {
  position: absolute;
  display: block;
  width: 65px;
}
.pin_button {
  top: 12px;
  left: 10px;
  height: 41px;
  background: url(/wp-content/themes/YOUR_THEME/i/pinterest.png) no-repeat bottom center;
}
.pin_icon {
  top: 0;
  left: 13px;
  height: 23px;
  background: url(/wp-content/themes/YOUR_THEME/i/pin.png) no-repeat bottom center;
  z-index: 999;
}
.pinthis-image .sn_pin {opacity:0;}
.pinthis-image:hover .sn_pin {opacity:1}
.pinthis-image:hover .pin_icon {
  -webkit-animation: pinstick ease-in 1s both;
  -moz-animation: pinstick ease-in 1s both;
  animation: pinstick ease-in 1s both;
}
.pinthis-image:hover .pin_button {
  -webkit-animation: buttonrecoil ease-in 1s both;
  -moz-animation: buttonrecoil ease-in 1s both;
  animation: buttonrecoil ease-in 1s both;
}
.pin_button:hover {
  opacity: .8;
}
.pin_button:hover,
.pin_icon:hover {
  margin-top: -1px;
}
@-webkit-keyframes pinstick { 0% { opacity: 0; top: -10px; }  30% { opacity: 0; top: -10px; } 40% { opacity: 1; } 45% { top: 0;} 50% { top: 2px; } 65% { top: 0; } 100% { top: 0; } }
@-moz-keyframes pinstick { 0% { opacity: 0; top: -10px; } 30% { opacity: 0; top: -10px; } 40% { opacity: 1; } 45% { top: 0;} 50% { top: 2px; } 65% { top: 0; } 100% { top: 0; } }
@keyframes pinstick { 0% { opacity: 0; top: -10px; } 30% { opacity: 0; top: -10px; } 40% { opacity: 1; } 45% { top: 0;} 50% { top: 2px; } 65% { top: 0; } 100% { top: 0; } }
@-webkit-keyframes buttonrecoil { 0% { opacity: 0; top: 27px; } 25% { top: 11px; } 30% { top: 13px; } 35% { top: 12px; opacity: 1; } 40% { top: 13px; } 45% { top: 12px; } 50% { top: 14px; } 55% { top: 12px; } 100% { top: 12px; } }
@-moz-keyframes buttonrecoil { 0% { opacity: 0; top: 27px; } 25% { top: 11px; } 30% { top: 13px; } 35% { top: 12px; opacity: 1; } 40% { top: 13px; } 45% { top: 12px; } 50% { top: 14px; } 55% { top: 12px; } 100% { top: 12px; } }
@keyframes buttonrecoil { 0% { opacity: 0; top: 27px; } 25% { top: 11px; } 30% { top: 13px; } 35% { top: 12px; opacity: 1; } 40% { top: 13px; } 45% { top: 12px; } 50% { top: 14px; } 55% { top: 12px; } 100% { top: 12px; } }
</code></pre>

Here are the two images you’ll need. Drop them into your theme’s image directory (and be sure to update your stylesheet to point to them).

<a class="download-link" href="/assets/i/pinterest_overlay.zip">Pinterest Overlay Images</a>

If this all sounds foreign to you or you don’t need the customization I mentioned, you might want to check out the <a href="https://wordpress.org/extend/plugins/pinterest-plugin/">WordPress Pinterest plugin</a> which does something similar.

<!--more-->