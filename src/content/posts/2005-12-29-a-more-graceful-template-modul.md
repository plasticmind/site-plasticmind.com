---
title: "A More Graceful Template Module"
date: 2005-12-29 03:30:52
archive: true
excerpt: 
subtitle: 
slug: a-more-graceful-template-modul
featured_image_url: 
alt_text: 
primary_category: "Blogging & CMS"
categories: ["Blogging & CMS"]
tags: []
meta_description: 
context: professional
fix: false
hits: 256
---


			

In <a href="https://www.movabletweak.com/templates/powering_your_whole_site_with.php">a previous article</a> I spent a good deal of time working through the concept of powering an entire site with Movable Type, and one of the biggest questions we dealt with was "what do I do with content that is shared across multiple template (and even blogs)?"  After working at length with <a href="https://www.movalog.com">Arvind</a> and <a href="https://www.everitz.com/">Chad</a> on a few projects, I've come to realize that one of the most graceful solutions includes a nice blend of MT's functionality and PHP basics.



#### The PHP Solution




First, create an new index template (a template module won't process MT tags, unlike an index template, which can be set to rebuild every time an entry is saved... you decide which best works for your situation) with the content that you'll use again in other templates or blogs on the same installation.  It's good practice to precede the title with "Module:" so they all get sorted together and it's easier to find and edit later.  I generally have a single header template that includes the &lt;body&gt; and &lt;html&gt; tags along with all of the &lt;head&gt; information, including the title, meta tags, javascript and any CSS needed.  You can even go so far as to put the code for your header and main menu in this template module - don't worry about customizing things like the &lt;title&gt;.  We can address this with PHP variables.  But I'm getting ahead of myself.  I also usually have a footer module, and depending on the nature of the site, a sidebar module.  All of these modules are then linked to files in a template directory (tmpl/header.html).  





Then you can use a:





<code>&lt;?php include "/home/user_name/www/tmpl/template.html" ?&gt;</code>





in any of your blogs and they will be updated as soon as you make changes to the module.  Be sure to replace the path with the appropriate path to root.  If you're unsure of this, you can find it under Settings -> Publishing -> Site Root from your MT main menu.  



#### A Caveat: .htaccess




The only prerequisite here is that you get your server processing your html files for chunks of php... all it takes is a little .htaccess magic:





<code>RemoveHandler .html .htm<br />
AddType application/x-httpd-php .php .htm .html</code>





Drop that in the first line of your .htaccess in the root of your site (be careful to leave the other stuff) and your server (as long as you're running Apache) should now handling html files as if they're PHP.



#### Variable Solutions




The beauty of this is that you can then even pass information via variables to those includes.  For example, say you put this include in a category archive template and lets say you needed to pass the name of the category to the include.  We'll also pass the blog name in a variable in case you're using this include in a separate blog and want to preserve the naming.  You can do this:





<code>&lt;?php $category = &lt;$MTCategoryLabel$&gt;; $blogname = &lt;$MTBlogName$&gt;; include('/home/hrkennel/www/tmpl/header.html'); ?&gt;</code>





Then in your template module you can simply use a:





<code>&lt;?php echo $category; ?&gt;</code>





or





<code>&lt;?php echo $blogname; ?&gt;</code>





to fill in the contextual category or blogname.  If you want to be really snazzy and want to put code in there that might mess things up if the variable is empty, you can wrap it in a PHP if statement and check to see if the variable is empty:





<code>&lt;?php if($category) { echo ' | ' . $category; } ?&gt;</code>





The if($category) simply checks to see if the variable is filled, and if it is, it echoes the pipe and the variable.  This is much cleaner than:





<code>| &lt;?php echo $category; ?&gt;</code>





in your code because if for some reason a category doesn't get passed, you'd have a pipe sitting out there all alone cluttering up your page.  This method will help you share information and keep things consistent across multiple templates and even multiple blogs.



		