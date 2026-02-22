---
title: "Capturing Pixel Density with Google Analytics"
date: 2013-06-19 06:12:04
archive: true
excerpt: 
subtitle: "Google Analytics lets you see how many of your users are on mobile devices, but the information you can pull on those devices is woefully limited.  One such oversight is pixel density ratio."
slug: pixel-density-google-analytics
featured_image_url: 
alt_text: 
primary_category: "Mobile"
categories: ["Mobile"]
tags: ["analytics", "retina"]
meta_description: 
context: professional
fix: false
hits: 3903
---


			

Andy Rossi put together <a href="https://gist.github.com/andrewrocco/3130217">a workable code snippet</a> that uses the value of <code>window.devicePixelRatio</code> to determine high or normal resolution and writes that as a custom variable to Google Analtyics.





The only trouble with it is that <a href="https://www.matanich.com/2012/11/06/picture-polyfill/">not all browsers support</a> <code>devicePixelRatio</code> consistently, IE10 being the primary culprit.  The other problem is that it lumps all pixel densities above 1.5 into &#8220;high&#8221; and anything below that into &#8220;low&#8221;.  We&#8217;ve been discovering that a lot of devices reporting 1.3, so we decided we wanted a more specific look at what ratios people were using.





So I decided to put together a more reliable test based on Tyson Matanich&#8217;s handy <a href="https://github.com/tysonmatanich/GetDevicePixelRatio">GetDevicePixelRatio script</a>.





Just include the <a href="https://github.com/tysonmatanich/GetDevicePixelRatio">GetDevicePixelRatio script</a> and the GA code on your site, then the following code should start pushing your visitor&#8217;s pixel density to Google Analytics (probably best to include in a document ready function): 



<pre><code>// Track Device Pixel Ratio
var pixelRatio = window.getDevicePixelRatio();
_gaq.push(['_setCustomVar', 1, 'Pixel Ratio', pixelRatio, 2 ]);
</code></pre>

			<!--more-->

		