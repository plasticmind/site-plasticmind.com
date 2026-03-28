---
title: "A Brief Review of Movable Type 4.0"
date: 2007-08-14 22:45:48
archive: true
excerpt: 
subtitle: 
slug: a-brief-review-of-movable-type
featured_image_url: 
alt_text: 
primary_category: "Miscellany"
categories: ["Miscellany", "Web Development"]
tags: ["movable type", "cms"]
meta_description: 
context: professional
fix: false
hits: 254
---

Clearly, this new release from Six Apart is monumental. Massive changes to both the interface and the innards make this a drastically new product for them. If you've not yet downloaded it, it doesn't cost you anything.

## Action Oriented Interface

Movable Type 3.x was primarily object oriented: entries, comments, templates. Movable Type 4, on the other hand, is very action oriented: Create, Manage, Design. It's much more content-centric as well. When you land of the dashboard, you're presented with dynamic content like "Most Recent Comments" or "You have 13 drafts".

Most everything is where you'd expect it to be. Vital information shows up on the right hand side with relevant links (imagine that). There are still some common-sense items that didn't make it in, like a rebuild option on the <span style="text-decoration: line-through;">entry</span> template list action menu; but overall it's much easier to navigate that the previous incarnations.

And as I understand it, the application interface is much easier to change; what that means is a plethora of plugins that let you customize the UI to your hearts content. Kevin's Bookmarks plugin gives you a bookmarks menu for your most frequented MT pages. Arvind's Template Shelf creates a sidebar widget to the app that lets you quickly browse templates in your blog. Arvind's even created a retro plugin called "My Blogs" (not to be confused with *My Humps* by The Black Eyed Peas) that makes your MT4 install look like MT3. And with the launch of the new Plugin Directory, I think it's safe to assume we'll be seeing more in the same vein.

## Common Tasks

The new workflow takes a little getting used to, and I'm sure it won't work for everyone; but common tasks like reviewing comments and creating entries seems considerably faster. I know many will balk at the new interface, but it really is much clearer. There is a much more structured placement of information: System wide information at the very top, blog selection on the next level, then a blog related action menu below that. It flows well.

There have been some concerns raised about the menus. First, clicking versus hover. Six Apart chose to make the action menu expand on hover and the blog menu expand on click. I think it's a fair compromise as most people won't be furiously switching blogs (compare this to the jump menu at the top of the old interface, two clicks instead of 3). Second, disabled items graying out versus disappearing. Six Apart chose to leave them in and just gray them out when they're not available. Having worked tech support before, I know how maddening a thing disappearing menu items (Microsoft called them personalized menus) can be. The human brain builds habits or pathways when using an interface; when those constantly change, it can end up taking a considerable amount longer while generating frustration. (But there is a plugin out there for those of you who just have to have it that way.)

One essential technique that speeds up my work is opening new parts of the app in separate tabs; those 1 or 2 second loads can add up quickly. Just hold down Ctrl or Apple as you click a menu item.

## Javascript Heavy

The new interface relies on quite a bit of javascript wizardry, which seems to cause quite a bit of drag, especially using Firefox, one of the slowest browsers at processing javascript. The template editor with code highlighting and line numbering is not just a nice touch, it's really helpful. Unfortunately, something funny would happen once or twice over the course of a day and I couldn't edit my templates without a full reboot of the system. The scripting is really great, but they need to tighten the belt before they release 4.1.

## New User Controls

If you're a lone blogger, you may never touch this feature, but poke around in there. The ability to define custom roles and permission sets and then assign them to different users makes MT4 the platform of choice for community blogs. Movable Type can even build a profile page with author information.

## Code Base

I'm not a developer, but I follow the developer lists; several of the more well-known MT developers were really frustrated with some of the new changes to the code base. Whether that's just a normal response to a major code overhaul or because the plugin documentation was scarce up until just a few weeks ago, I can't say for sure. It had me shaking in my boots when Tim Appnel threw up his hands in frustration when trying to port his Tags.app plugin; but a recent boom in MT4 plugins has slaked some of those concerns.

## Templates

Aye, there's the rub. It's a bittersweet thing. The Movable Type templating language used to be so simple and easy to figure out; but with this release, templates are becoming less like templates and more like a programming language. This has it's advantages and disadvantages. The current template structure works much like TypePad's setup: every chunk of template is stored separately and the included based on conditionals. So much nicer than hunting through six different templates to make a tiny change in the html header; but along with power comes complexity. Might be daunting for newcomers. That being said, the old templates work just fine in MT, if that's how you want to roll.

Also, I've been wanting template packs ever since we started The Style Archive, and even though it's not in this release, Byrne assures me it's coming in 4.1.

## MT4: Satisfied?

I'm really pleased with Movable Type 4. It's made several large jumps forward in blogging. It's going to take some time to get used to the new workflow, so I may be able to give a better review then. It didn't solve all of my image handling concerns (nor has any online software out there, except Flickr). But the overall feel and functionality of the new MT makes it really fun to use; and with an open source release of it on the horizon, that settles it for me.