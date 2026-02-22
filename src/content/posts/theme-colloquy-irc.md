---
title: "Lovable Type: Creating A Theme For Colloquy IRC"
date: 2008-03-24 23:41:18
archive: true
excerpt: 
subtitle: 
slug: theme-colloquy-irc
featured_image_url: 
alt_text: 
primary_category: "Design"
categories: ["Design", "Downloads"]
tags: ["Colloquy", "IRC", "Movable Type", "skins"]
meta_description: 
context: professional
fix: false
hits: 1016
---

I waste a good deal of my day arguing about colonialism and pronunciation in the <a href="irc://irc.freenode.net/movabletype-talk">#movabletype-talk</a> IRC channel. And when you spend a good deal of time using a piece of software, you want it to fit the way you work. I downloaded <a href="https://colloquy.info/">Colloquy</a>, an IRC client for OS X, a while back, but was never all that impressed with it’s visual styles. You could make some basic changes to the presentation, but I felt like I was using Gaim, locked into ugliness.

So I got the urge to make it look right. After <a href="https://colloquy.info/project/wiki/Development/Styles/DefaultHTMLFormat">a bit of digging around</a>, I discovered that Colloquy styles are simply made up of XML and CSS. A little bit of tinkering around with the CSS and suddenly it’s starting to look a whole lot better. Colloquy even gives you the ability to include XLST and Javascript functions in your templates. I’m imagining something like moo.fx really jazzing up the app.

Better yet, with each style you can create as many “variants” that you’d like. A variant is simply a snip of CSS that lets your override certain parts of your style. So for instance, you can create a variant entitled “Large Fonts” and simply specify larger font sizes for whatever elements you’d like in that variant’s stylesheet. This particular skin I created has several useful variants: <a href="https://www.flickr.com/photos/plasticmind/2359906255/">High Contrast (dark color scheme)</a>, Hide Event Messages, Senior Discount (large print), No Background Image. Lots more to come.

Let us dispense with the introductions! Here’s the Movable Type 4 theme for Colloquy, for your IRC browsing enjoyment:

<a class="download-link" href="https://plasticmind.com/downloads/lovable-colloquy.zip">Download Lovable Type for Colloquy (.zip/110k, v.1)</a>

To install, simply copy the unzipped file to the:
<pre><code> ~/Library/Application Support/Colloquy/Styles
</code></pre>
directory. If that directory doesn’t exist, you’ll need to create it. For more information, be sure to check out <a href="https://colloquy.info/project/wiki/FAQs#WheredoIinstallnewStylesEmoticonsorPlugins">Colloquy’s FAQ list</a>.

<a href="https://www.flickr.com/photos/plasticmind/2359906255/in/photostream/"><img src="https://farm3.static.flickr.com/2056/2359906255_e73c35df6f.jpg?v=0" alt="" /></a>

<!--more-->

<a href="https://www.flickr.com/photos/plasticmind/2359904919/in/photostream/"><img src="https://farm3.static.flickr.com/2280/2359904919_3249478e7e.jpg?v=0" alt="" /></a>