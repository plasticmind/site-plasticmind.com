---
title: "The Hidden Pinterest Stack"
date: 2015-10-23 11:36:36
archive: true
excerpt: 
subtitle: "After our site took a hit in Google this year, we realized we needed to double down on the social media front.  We targeted Pinterest first."
slug: hidden-pinterest-stack
featured_image_url: https://plasticmind.com/wp-content/uploads/2014/12/hidden-stack.jpg
alt_text: ""
primary_category: "Social Networking"
categories: ["Social Networking"]
tags: []
meta_description: "A handy little trick that lets you offer your users a Pinterest-friendly image that doesn't appear on the page."
context: professional
fix: false
hits: 3511
---

Specifically, we started looking for ways to make the sharing experience better for users and more effective overall. Pinterest has always been important to us since we're a recipe site and so many people use Pinterest as a recipe box. We discovered lots of room for improvement and made three significant changes on our site that have enhanced the pinning experience and have ultimately resulted in more referrals from Pinterest.

In this article, I'm going to walk you through the first one.  I haven’t seen this technique posted anywhere, but it’s incredible useful.
<h2>In Defense of Vertical Photos</h2>
If you use Pinterest, you know that tall vertical photos work really well in Pinterest, especially <a href="https://www.simplyrecipes.com/wp-content/uploads/2014/12/how-to-chop-onion-pinterest-stack.jpg">the tall “stack” photos</a>.  Even the Pinterest business blog <a href="https://business.pinterest.com/en/blog/pin-it-button-technical-tune-5-tips-make-sharing-your-site-better">recommends vertical photos</a>. However, those skyscraper-type images don’t play well with most site designs—certainly not ours. Plus, because the title of a Pin isn’t displayed on mobile devices, having the title in the image is common; but that also looks weird on a typical site where the title is presumable up top.

**So, the dilemma arises.** You want a nice Pinterest-friendly [ref]Pinterest recommends using images that are at least 600 pixels wide.[/ref] image available for people to pin, but it just doesn’t work in the context of your site’s design.
<h2>Some Bad Solutions</h2>
You could technically put the image in a hidden div on the page. [ref]The Pinterest button won’t show images that have a `display:none` style set, but it will show images within a hidden div.[/ref] However, most browsers still load hidden images, and those tall images tend to be rather large. Your page performance would take a hit and it would cost visitors time and bandwidth.

Fortunately, Pinterest recently introduced the <code>data-pin-media</code> attribute, which lets you point to an alternate image from one of your image tags. In other words, if your featured image was a landscape-oriented image, but you wanted to point to a portrait-oriented alternative, you’d some something like:
<pre><code>&lt;img src="landscape.jpg" alt="" data-pin-media="portrait.jpg" /&gt;</code></pre>
This would tell the Pin It button to show portrait.jpg instead of landscape.jpg in the image selection screen. Handy!

But there’s a problem. It’s a lousy user experience. If someone hovers the landscape image and clicks “Pin It”, the new pin creation popup will show a portrait image. If they click their browser’s Pin It button, the landscape image won’t be there to select. Some users might not notice the bait-and-switch, but you’ve limited and misled your users, and that’s never good UX.
<h2>A Better-ish Solution</h2>
There is a better way, but fair warning: this feels like a bit of a hack. We’re giving people better choices, so it’s worth it.

The secret is to load a small, transparent image [ref]I tried using base64 encoding to avoid the extra HTTP request, but Pinterest doesn’t recognize base64 encoded images. I also tried using smaller images, but found that 200x100 pixels worked well in the tests I ran. The placeholder gif I created is heavily crunched and very small (200bytes, less than 1k).[/ref] at the beginning of the page in a hidden div, but use the <code>data-pin-media</code> attribute to point to the big, Pinterest-friendly image. (<a href="https://www.simplyrecipes.com/wp-content/themes/simply/assets/i/blank.gif">Download the placeholder image here</a>.)
<pre><code>&lt;div style="display: none;"&gt;&lt;img src="small_placeholder.gif" alt="" data-pin-media="pinterest-friendly.jpg" /&gt;&lt;/div&gt;</code></pre>
Pinterest now displays our big Pinterest-friendly image when someone clicks their Pin It button, without requiring non-Pinterest users to download that giant image on the page.
<h2><img class="alignnone size-full wp-image-5206" src="https://plasticmind.com/wp-content/uploads/2014/12/86427e9fab617acd185132e52163260b.gif" alt="86427e9fab617acd185132e52163260b" width="652" height="540" /></h2>
<h2>Demo</h2>
To see this in action, visit <a href="https://www.simplyrecipes.com/recipes/moms_turkey_soup/">Elise's Turkey Soup recipe</a> and click your browser's Pinterest button.  You're offered a beautiful Pinterest-friendly image that doesn't appear anywhere on the page.
<h2>Warning</h2>
A word of caution: <a href="https://github.com/pinterest/widgets/issues/42#issuecomment-66813024">According to one of the Pinterest developers</a>, the size of the images available in the image select screen is determined by the largest image on the page:
<blockquote>The any-image Pin It button… assigns points based on things like size (bigger is better), shape (portrait is better than landscape, up to a point), whether it's a video, whether it's been identified as the canonical image on the page, and other special factors. After we get everything scored, we sort by score, highest to lowest, and then thumbnail everything whose score is greater than that of the highest-scoring image on the page divided by a magic number (currently 30, subject to change).</blockquote>
Simply put, if you specify a significantly larger image with data-pin-media, some of the smaller images on your page that normally would show up in the image selection screen probably won’t be there anymore. That wasn’t too much of an issue for us, since we’d rather people be pinning the larger photos anyhow.
<h2>Notes</h2>
I've had some people ask some more specific questions about how we implement this, so here goes.

We're running WordPress, so I created several custom fields (post meta) on our recipe pages (custom post type):
<ul>
	<li>Custom <span class="il">Pinterest</span> description (falls back to using our custom meta description field if left empty)</li>
	<li>Primary <span class="il">Pinterest</span> pin ID**</li>
	<li>Secondary <span class="il">Pinterest</span> pin ID (in case there are two pins)**</li>
</ul>
<img class="alignnone size-large wp-image-5327" src="https://plasticmind.com/wp-content/uploads/2014/12/pin-details-1024x572.png" alt="pin details" width="1024" height="572" />

I also created two additional featured image fields for primary and secondary <span class="il">Pinterest</span> stacks:

<img class="alignnone size-full wp-image-5328" src="https://plasticmind.com/wp-content/uploads/2014/12/pin-images.png" alt="pin images" width="543" height="1024" />

Then, in the template, I stash those values into variables and <a href="https://gist.github.com/plasticmind/9edaa59c2f5955802e59">do a little logic</a> to display them if they exist. (**Notice that we're only using the image url and the description values, not the Pin IDs... more on that in a minute.)

You can see the output on one of our pages:

<img class="alignnone size-full wp-image-5330" src="https://plasticmind.com/wp-content/uploads/2014/12/pin-details1.png" alt="pin-details" width="972" height="304" />

We had more complicated logic earlier where we could have a second description for the second pin (e.g. a different kind of call to action for a different kind of pin), but we found it wasn't being used enough to warrant the complication.

We also ended up not using the Pin ID fields.  Pinterest has the concept of an "official pin", and specifying the id of that pin meant that it gets passed via data-pin-id and that when people pin images on your page to Pinterest, you'll get more repins on the official pins and make it more likely to show up in search (in theory). However, we didn't find it worth the hassle.  We found that the ID's changed a lot as pins were deleted or repinned, so we decided to ditch the data-pin-id logic.

So all we're really using for our trick (from the CMS) are the two Pinterest images and the Pinterest description.

Hope that helps!