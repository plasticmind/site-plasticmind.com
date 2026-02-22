---
title: "Essential CSS Tricks: Image Frames"
date: 2007-10-15 04:27:33
archive: true
excerpt: 
subtitle: 
slug: css-image-framing
featured_image_url: 
alt_text: 
primary_category: "CSS"
categories: ["CSS"]
tags: ["css", "frames", "images"]
meta_description: 
context: professional
fix: false
hits: 4625
---


### Images and Frames&#8230; What's a Blog To Do?




The initial draft I created for the new Plasticmind.com had rounded frames with drop shadows for the portfolio thumbnails.  Now, I had to create each thumbnail by hand anyhow, so I could have just applied the frame and drop shadow in Photoshop.  However, after deciding to pull my recent photo thumbnails from Flickr, I realized that I had to find a way to automate this.  The first thing that came to mind was using Image::Magick to import the thumbnails and then lay a frame over them.  But that's a lot of coding, a lot of processing power, and worst of all, a whole lot a disk space for hosting these fancified thumbnails.





Enter CSS to save the day.  The concept is simple: lay a transparent .png frame over top the thumbnail.  The .png image can contain all sorts of alpha transparency (opacity), so you can do fancy effects like color overlays and feathered drop shadows.  And because it all happens within an HTML anchor tag, my current markup allows for the frame to be changed on hover.  



### CSS Image Framing, The Concept




First, the concept:





<img src="/assets/css-tips2.png" alt="CSS Image Framing, Tips" />





We begin with a thumbnail from Flickr.  Then we'll need to create a transparent frame that will be placed over our thumbnail.  (If the frame is larger than the thumbnail, we'll have to factor some padding into our styling.) The best part about this approach is that the frame is applied via CSS while your thumbnails are placed, as they should be, with HTML.  Some framing techniques involve placing your thumbnail as a CSS background on a frame image, but a view of the unstyled page reveals a list of empty frames.  Not exactly accessible.  But since our frame is placed over the thumbnails with CSS, people who choose to turn off styling or search engines that don't process CSS see a list of thumbnails, which is precisely what you want.



			<!--more-->### CSS Image Framing, The Markup




Now, on to the markup:



<pre><code>&lt;ul class="thumbs"&gt;
    &lt;li&gt;
            &lt;a href="https://www.flickr.com/photos/plasticmind/1400144808/in/set-72157602062581211/"&gt;
                &lt;img src="https://farm2.static.flickr.com/1406/1400144808_24ca2a402b_s.jpg" alt="Mondavi Lights" /&gt;
                &lt;span&gt;&amp;nbsp;&lt;/span&gt;
            &lt;/a&gt;
        &lt;/li&gt;
&lt;/ul&gt;
</code></pre>



This is semantic goodness.  It's a list of thumbnails.  Without any styling, here's what you get:



<ul class="unstyled">
    <li><a href="https://www.flickr.com/photos/plasticmind/1400144808/in/set-72157602062581211/"><img src="https://farm2.static.flickr.com/1406/1400144808_24ca2a402b_s.jpg" alt="Mondavi Lights" /><span>&nbsp;</span></a></li>
</ul>



Our thumbnail is 75px and it's inside an unordered list.  We've also got a span element in there (with a <code>&amp;nbsp;</code> inside since some browsers ignore empty tags) that we'll use to create the frame.  We'll set the dimensions of the span, give it a background image (our frame) and position it over top the thumbnail.  



### CSS Image Framing, The Styling




Here's the CSS:



<pre><code>/* ----- Thumbnail Grid Styles */

.thumbs ul, .thumbs li {
    list-style: none;
    }
.thumbs li {
    float: right;
    padding: 5px 0 0 5px;
    position: relative;
    width: 88px;
    height: 88px;
    }
.thumbs a {
    text-decoration: none;
    }
.thumbs a span {
    position: absolute;
    top: 0;
    left: 0;
    width: 88px;
    height: 88px;
    background-image: url(https://plasticmind.com/img/blog-frame.png) no-repeat top;
    overflow: hidden;
    }
.thumbs a:hover span {
    background-position: bottom;
    }
</code></pre>



Let's go through these one at a time.  First, <code>.thumbs ul, .thumbs li</code> and <code>.thumbs a</code> - we're turning off the default styling for lists and anchors.  We don't really want bullets or underlines for our thumbnails.





Next, <code>.thumbs li</code>.  We're going for a grid of thumbnails, so we're going too float them left so they pile up nicely in a grid.  The padding pushes the thumbnails 5 pixels from the top and left and helps center the thumb inside my frame.  This might need tweaking based on the size on your frame relative to the size of your thumbs.  Position relative is essential because when we set the position of the span to absolute, we want the browser to know that we mean absolute *inside* the list item (as opposed to the entire page.)  Then we set the width and height of the list item to the width and height of the frame image.





Finally, <code>.thumbs a span</code>.  Here's where the magic happens.  First, we set the position to absolute and specify the top and left placement.  In laymen's terms, this is basically, &#8220;put this in the top left most corner of the container it's in.&#8221;  Because it's in a relatively placed list item, this span will get placed in the upper-left-most corner of said list item.  Then we specify the width and height and set the background image and voila!  Our frames are laid over top of our images.  (We use overflow:hidden to make sure nothing gets spilled out of the frame.)





The only thing left is our mouseover.  What I've found works best for image rollovers is background positioning.  The idea is this: my frame image is actually 176 pixels high (88 x 2).  The top half of my frame image is the normal state of the frame.  The bottom half is the rollover state of the frame.  Then in my stylesheet, I specify &#8216;top' in my background-image declaration for <code>.thumbs a</code> and and &#8216;bottom' for <code>.thumbs a:hover</code>.  Now, the browser doesn't have to fetch another image when you mouse over something, it's already loaded.  (Please note that while most browsers support :hover for all elements, Internet Explorer only supports :hover with the anchor tag.)



### CSS Image Framing, IE Caveat




Of course, IE6 does not correctly support alpha transparency, so if you want to make sure people using that browser can see your thumbnails, you'll need to create a .gif version of your frame and then specify it using an IE-only stylesheet.  (<a href="https://virtuelvis.com/archives/2004/02/css-ie-only">Best practice says do this via conditional comments.</a>)





Your IE stylesheet would look something like this:



<pre><code>.thumbs a span {
    background-image: url(https://plasticmind.com/img/photos-frame.gif);
    }
</code></pre>

### The Final Result




What we end up with is a semantically correct, search-engine friendly list of thumbnails that look fantastic.  And the design possibilities are endless.  There's <a href="https://www.digital-web.com/articles/web_standards_creativity_png/">a whole lot you can do</a> with alpha transparency.  White out your images.  Create translucent overlays.  Gradients, copyrights, watermarks, masks&#8230; go crazy.



		