---
title: "Crush Those Images"
date: 2014-09-08 23:23:28
archive: true
excerpt: 
subtitle: 
slug: crush-images
featured_image_url: /assets/i/crunch1.jpg
alt_text: ""
primary_category: "Web Development"
categories: ["Web Development"]
tags: []
meta_description: 
context: professional
fix: false
hits: 430
---

We have lots of different images that make <a title="Simply Recipes: A Food and Cooking Blog" href="https://www.simplyrecipes.com">Simply Recipes</a>—more than 40, in fact.  The logo, stylistic elements, UI icons, third-party badges, and social media icons, along with double-sized retina versions of many of them.  And I haven't even mentioned the images for our separate mobile template.

Aside: When we launched <a title="Simply Recipes Redesign" href="https://www.simplyrecipes.com/welcome_to_our_new_look/">our recent redesign</a>, we moved away from using traditional images and started <a href="https://css-tricks.com/using-svg/">using base-64 encoded SVG images</a> inline.  There are a several reasons why this is awesome: easier to manage, far fewer HTTP requests, no quality loss when zooming.  (I'm using <a href="https://github.com/svg/svgo-gui">svgo-gui</a> to compress my SVG files.)  However, since SVG isn't supported everywhere, I'm using <a href="https://modernizr.com/">Modernizr</a> to deliver traditional image assets to browsers that don't support SVG.  Also, complex shapes and photos don't really work well as SVG.  So image sizes still matter, which brings me back to the point of this article:

I use <a href="https://incident57.com/codekit/">CodeKit</a> for Sass preprocessing. It's great, it really is. However, the "Optimize Images" seems to be a bit lacking.  I clicked it, saw savings of 15-20% and went on my merry way, assuming my images had been sufficiently crunched.  However, Google's PageSpeed Test was still complaining:

<img class="alignnone size-full wp-image-5090" src="/assets/i/optimize.png" alt="optimize" width="533" height="186" />

After a bit of research, I found several useful tools that helped optimize my image sizes even further.  I used <a href="https://tinypng.com/">TinyPNG</a> to crush the files even further, some files being reduced by up to 80%.  Keep in mind this is a lossy operation; though I did side-by-side tests on several of the important images and couldn't tell the difference.  After running them through TinyPNG I installed <a href="https://imageoptim.com/">ImageOptim</a> (free Mac app, try <a href="https://nikkhokkho.sourceforge.net/static.php?page=FileOptimizer">FileOptimizer</a> if you're on PC) and ran them all through that app for further optimization.

All told, I started with a total byte size of 367k for all our images, and these extra tools brought that down to 192k—**a total savings of 44%**.

And those are just the theme-related images. There are several WordPress plugins we are experimenting with now to help bring the file size of our uploaded images. I've linked some of the best-reviewed and most-active ones below:

### Related Links


<ul>
<li><a href="https://wordpress.org/plugins/wp-smushit/">Plugin: WP Smush It</a></li>
<li><a href="https://wordpress.org/plugins/ewww-image-optimizer/">Plugin: EWWW Image Optimizer</a></li>
</ul>