---
title: "Movable Type 3 vs. Movable Type 4: A Modular Site Approach"
date: 2007-07-23 22:07:29
archive: true
excerpt: 
subtitle: 
slug: mt3-vs-mt4-templates
featured_image_url: 
alt_text: 
primary_category: "Blogging & CMS"
categories: ["Blogging & CMS"]
tags: []
meta_description: 
context: professional
fix: false
hits: 572
---

Adam Cleaveland from <a href="https://www.cleavedesign.com/">Cleave Design</a> sent over this question, and I thought it was particularly relevant, especially in light of the new approach Movable Type 4 takes with it's default templates:

<blockquote>"I am having a very hard time understanding the "Templates" within MT. I'm used to just being able to make a change within the header.php in Wordpress that affects every page. However, with Movable Type, it seems that if I make any chance in the template, I have to make that change in every different template I have (Main Index, Master Archive, Search Template, Comment-Pending Template, Comment-Error Template, etc., etc.). Am I just completely missing something? Or is this the only way to go about doing it?"</blockquote>

The question he raises is a good one. The first thing is not to confuse "template tags" with "template modules". As MT is currently bundled, each "template" has all of the code needed for a full page. The main index page has all of the html header information, the banner has all the banner information, sidebar, etc. Now, it's nice because most information like the blog name and description and meta tags are all stored in MT and get put into the page by using template tags (i.e. ). But essentially if you want to change the HTML for the header or the banner or anything else, you have to change it on that particular template. So, for example, adding a div above the banner would require opening each template and adding the div above the banner.

Now, there are ways around this; in fact, that's one of the reasons Six Apart is changing it's approach with the new Movable Type 4. It makes a lot more sense (even though it's a bit more confusing for the beginner). The basic approach is this: commonly used chunks of code are stored as template "modules" and then called to from each template. Makes MUCH more sense because you don't repeat code. If the header code is the same for all of your pages, then the only thing you need on each page is a call to the template module () that holds your header code. It's all in one place.

Of course, sometimes you've got things in those modules that need to be custom for each page, like the entry title in the HTML header area. Movable Type handles nearly all of that stuff with template tags. Put in between yourtags and Movable Type figures out the context and puts the right information in there. Sometimes, though, there are things you might want to, for example, add to your sidebar for particular pages; Movable Type allows you to set variables and call them from your templates. This gives you the ability to add specific content or check against a Boolean "switch" to turn parts of your module on or off.

Lots of developers use a similar approach with PHP. Common elements like the header and footer get created as index templates and then included with a simple PHP include. This saves you considerably on rebuilds because MT is only building one file that all your pages include instead of building the same code for every page. It's not always the best option, but it's often worth considering.

The learning curve for this new approach is slightly higher because you have to be able to follow the linking; but the power it brings you is tremendous. Instead of trying to scrounge through all of your templates and replace code each time a change is made to these common elements, you can just change it in one place and MT will build it out across your site.