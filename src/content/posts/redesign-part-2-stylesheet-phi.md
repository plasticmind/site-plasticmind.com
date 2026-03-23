---
title: "Redesign, Part 2: Stylesheet Philosophy"
date: 2007-09-10 20:17:20
archive: false
excerpt: 
subtitle: "I am not a developer."
slug: redesign-part-2-stylesheet-phi
featured_image_url: 
alt_text: 
primary_category: "Web Development"
categories: ["Web Development"]
tags: []
meta_description: 
context: professional
fix: false
hits: 358
---


			

After spending five days making a curtain backdrop using ASCII characters and Basic on my IBM PC Jr., I decided childhood was too short and I'd rather be doodling anyhow.  Maybe it was the stacks of green-and-white striped paper my dad spent countless nights poring over that turned me off; I'm not sure.  Whatever it was, coding and I don't get along so well.





However, I do get along rather well with most coders (conceptually, anyhow).  I love the concepts, just not the syntax.  So I really dig talking programming concepts with developers.  One of these concepts that I've picked up from the developers I've spent time with is this: **Eliminate redundant code**.  If you've got to do something twice, put it in a function and call to it all places you need it.  This not only gives you power and clarity, but it also reduces the amount of code you write and therefore the likelihood of mistakes.



### Applying It To Stylesheets




So let's get right down to it.  What does **eliminate redundant code** have to do with stylesheets?



			<!--more-->

Plenty.  The best stylesheets are well-thought-out and deal with many stylistic changes in a broad, concise way.  <a href="https://plasticmind.com/old/css/plasticmario.css">Bad CSS</a> is akin to micromanagement: you spend so much time styling each individual element that you forget the big picture of how elements relate to each other and inherit properties, resulting in a whole lot of redundancy.  (We call redundancy like this *bureaucracy* when it happens in the government.)  Here's how I broke down the stylesheets for <a href="https://plasticmind.com">Plasticmind.com</a>:



### Press Reset




I almost always begin with a reset CSS file.  One speedbump for me when I was first learning CSS was understanding that there are default styles applied by browsers to most HTML elements.  Headers get varying font sizes.  Lists get bullets.  The body gets margin.  Anchors get colored and underlined.  There's a slew of minimal styles that browsers apply to HTML to ensure that an unstyled page is human readable.  Trouble is, all of these *hidden styles* can be maddening if you don't realize this.  That's what makes a reset stylesheet great.  It resets everything back to zero and lets *you* define every style without worrying about mysterious defaults rearing their proverbial heads.  My personal favorite is <a href="https://developer.yahoo.com/yui/reset/">Yahoo's reset CSS</a>.



### One For The Layout, Two For The Look




Next, I decided to take a dual stylesheet approach.  My site has a common layout across the multiple sections, so I created an overall shared layout that exists in <a href="https://plasticmind.com/css/haas-common.css">a common CSS file</a>, while the section specific styles get put into <a href="https://plasticmind.com/css/haas-blog.css">a section specific stylesheet</a>.  So, if a particular style will be used in every section, it goes into the common stylesheet; if not, it gets stashed into the section-specific one.





<img src="/assets/i/stylesheetphilosophy.gif" width="507" height="185" alt="stylesheetphilosophy.gif"/>



### Fixes For IE




Finally, using <a href="https://www.quirksmode.org/css/condcom.html">condition comments</a> in the header of all the sections, I include a “fix” stylesheet for Internet Explorer.  This helps the pathetic browser render like every other browser out there (or at least as best it can).  Most of my fixes were small, so I opted to keep them all in one stylesheet.  You may want to break them up into sections if they're large; but I'd warn against making too many exceptions for Internet Explorer—they're a headache to maintain.  



### Section Specific Styling




Also, be sure to give your body tag an id, especially if you're using one stylesheet for multiple sections.  This gives you the ability to specify styling for one particular section without too much trouble:



<pre><code>&lt;body id="journal"&gt;
    &lt;div class="entries"&gt;
        ...</code></pre>



This lets you then do something like:



<pre><code>#journal .entries {
    color: red;
}</code></pre>



You can specify any particular element in *only* that section by prepending it with the id in the body tag.  But then, if it's a section-specific style, shouldn't that be in the section-specific stylesheet?



### Conclusion




The beauty of this approach is that I can now create an entirely new section in almost no time.  By duplicating the HTML structure and calling to the common stylesheet, I'm up and running with a fully functional grid.  All I need to do to finalize is simply create a section stylesheet to define the colors and background images.  Twice the power, none of the redundancy, half the time.  That's a concept I dig.





Be sure to come back for part three of our *Redesign* series:  *CSS tricks that make this site tick*.



		