---
title: "Get An Email List of All Authors On Your System"
date: 2008-03-13 09:08:45
archive: true
excerpt: 
subtitle: 
slug: email-list-of-all-authors
featured_image_url: 
alt_text: 
primary_category: "Blogging & CMS"
categories: ["Blogging & CMS"]
tags: []
meta_description: 
context: professional
fix: false
hits: 146
---


			

This little snip of code will dump out a list of all the users and their email addresses on your install in a comma-delimited format that you can easily import into your email client.  It's particularly useful on larger installs:



<pre><code>&lt;mt:Authors include_blogs="all"&gt;
    &lt;mt:IfNonEmpty tag="AuthorEmail"&gt;
        &lt;mt:IfNonEmpty tag="AuthorDisplayName"&gt;"&lt;mt:AuthorDisplayName /&gt;" &lt;/mt:IfNonEmpty&gt;
        &amp;lt;&lt;mt:AuthorEmail /&gt;&amp;gt;,
    &lt;/mt:IfNonEmpty&gt;
&lt;/mt:Authors&gt;
</code></pre>



And the <a href="https://www.movabletype.org/documentation/appendices/tags/authors.html">Authors tag</a> allows for all sorts of cool filtering attributes so you can get at any group of authors in the system, ordered however you like:



<ul>
<li>display_name: Specifies a particular author to select.</li>
<li>lastn: Limits the selection of authors to the specified number.</li>
<li>sort*by: Supported values: display*name, name, created_on.</li>
<li>sort_order: Supported values: ascend, descend.</li>
<li>roles: comma separated list of values. eg “Author, Commenter”</li>
<li>need_entry: 1 | 0 (default is 1)</li>
<li>status: Supported values: enabled, disabled. Default is enabled.</li>
</ul>



**Note:** Some people have asked about creating an email list of all the commenters on the system, and it's very simple.  The code stays the same, but you just need to specify roles=”Commenter” and need_entry=”0” (since most commenters won't have written an entry).  Here's the code to do it:



<pre><code> &lt;mt:Authors include_blogs="all" roles="Commenter" need_entry="0" sort_by="display_name"&gt;&lt;mt:IfNonEmpty tag="AuthorEmail"&gt;&lt;mt:IfNonEmpty tag="AuthorDisplayName"&gt;"&lt;mt:AuthorDisplayName /&gt;" &lt;/mt:IfNonEmpty&gt;&amp;lt;&lt;mt:AuthorEmail /&gt;&amp;gt;, &lt;/mt:IfNonEmpty&gt;
 &lt;/mt:Authors&gt;
</code></pre>



Notice the code is much more compressed than the code given previously.  If you tried the previous code, you probably noticed that the spacing is crazy because of all the hard returns and spaces we have in there.  This second set of code I posted will give you a highly compact list of email addresses than can literally be copied and pasted into an email client.





**Just make sure you use this for good, not evil.**



			<!--more-->

		