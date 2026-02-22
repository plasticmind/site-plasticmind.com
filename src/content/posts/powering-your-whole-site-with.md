---
title: "Powering Your Whole Site with MT"
date: 2005-10-20 05:06:18
archive: true
excerpt: 
subtitle: 
slug: powering-your-whole-site-with
featured_image_url: 
alt_text: 
primary_category: "Movable Type"
categories: ["Movable Type"]
tags: []
meta_description: 
context: professional
fix: false
hits: 94
---


			

A question that is raised by serious professionals considering Movable Type for their CMS needs is &#8220;What about static page?&#8221;  Obviously MT was made for dynamic pages.  Turning a list of entries into well organized websites is what MT does best.  But it&#8217;s those individual, doesn&#8217;t-quite-fit-in-the-flow, static pages that can cause grief, consternation and if nothing else, confusion.





Our primary goal is to create pages that are both easy to manage and easy to update (so we&#8217;re not *quite* talking about static pages).  There are many ways to handle individual pages, I&#8217;ll deal with two:



#### via Archive Mapping




This only works well in certain situations, and you&#8217;ll see why as we go along.  First, let&#8217;s start a new blog from scratch.  In the archive (publishing) settings of this new blog, you&#8217;ll delete all but individual entry archives.  Then down where you can customize the output path of this individual entry archive, choose custom and use the following formula:  



<pre><code>&lt;$MTEntryCategory dirify="1"$&gt;&lt;MTIfNonEmpty tag="MTEntryCategory"&gt;/&lt;/MTIfNonEmpty&gt;&lt;$MTEntryKeywords dirify="1"$&gt;.html
</code></pre>



If your put the word &#8216;steakhouse&#8217; in the keywords field and set the category to portfolio, your entry would be saved in /portfolio/steakhouse.html &#8212; So just put your site &#8220;skeleton&#8221; in the individual entry archive template, the file name you want this page named in the keywords field and the category (directory) you want it placed in.  Obviously if you don&#8217;t specify a category, it will be published in the root.  So an entry with no category and &#8216;index&#8217; in the keywords field gets published as your front page.  This allows you to keep headers, footers and sidebars in the individual entry archive template and the content (whatever you deem that to be) as individual entries.  You can even be creative with the leftover fields and the &lt;MTIfNonEmpty> tag.  I&#8217;ve used the entry title as the page title, the extended entry as an additional part of the page.  Lots you can do here.





And also, as a side note, I usually create a blog for the main structure of the site using this method, then I create another blog for the additional information that would need to be added in the traditional MT way.  For example, a restaurant&#8217;s pages could be generated using this method. Then you could set up a second blog that would publish to the site&#8217;s /menu/ directory and use <a href="https://www.rayners.org/plugins/multiblog/">MultiBlog</a> to share modules, stylesheets, entries, etc.  I explain this in my article <a href="https://www.movabletweak.com/plugins/using_multiblog_to_share_more.php">Using MultiBlog to Share More</a>.





**Pros:**  The page is published automatically, because it&#8217;s considered an entry.  That means to rebuilding.  The pages are easy to change.





**Cons: ** You&#8217;re probably still going to need to include a bit of HTML in the entries themselves, but it will only be minimal (h1, h2, etc.)  You&#8217;re fairly limited with only one individual entry template, so most of your pages will look the same.  The pages are easy to change. 



#### Raynes&#8217; MTEntry Plugin




This isn&#8217;t quite as beautiful, but it sure is simple and can seriously cut back on HTML in your archives.  Download and install <a href="https://www.rayners.org/2003/05/mtentry.php">David <strike>Rayner&#8217;s</strike> Raynes&#8217; MTEntry Plugin</a>.  This allows you to use a &lt;MTEntry id=&#8221;###&#8221;&gt; container tag in place of &lt;MTEntries&gt;.  So it should then be obvious how to use it.  Create index pages for each of your &#8220;static&#8221; pages with just the structure (header, footer, sidebar, whatever) of that page.  Then create the content you want on that page in a new entry.  Save it and check the entry ID (you can usually find this in your URL bar at the top).  Now go back to the index page you just created and where you want your content to appear, just use a &lt;MTEntry&gt;&lt;/MTEntry&gt; container to include just like you would a &lt;MTEntries&gt; container.





You can be creative.  Your &lt;MTEntryTitle&gt; could be the &lt;h2&gt; on your page.  The &lt;MTExtendedEntry&gt; could be an additional picture.  Also, you don&#8217;t actually have to publish the entry for &lt;MTEntry&gt; to include it on your page.  &lt;MTEntry&gt; will pull unpublished and published entries.  This is nice because then these entries don&#8217;t have to show up in your list of published entries.  And if you don&#8217;t assign them a category, they won&#8217;t appear in your category archives either.  So essentially you have editable static pages without disrupting the flow of your normal entries.





**Pros:**  Much less HTML because your Templates can be much better customized and your &lt;MTEntry&gt; container can be placed more specifically.  Extremely versatile.





**Cons:**  Having the content listed with all of the other entries can get confusing for a user.  Also, if you&#8217;re not using dynamic publishing, your index pages need to be rebuild after an entry save to see any changes made.  Sometimes this is a headache for the users.  Additional static pages aren&#8217;t generated automatically.



#### Conclusion




Essentially, you&#8217;ll have to decide which option is best for the site you&#8217;re working on.  Breaking out of the core functionality of Movable Type always presents some issues, and you&#8217;ll need to weigh the complications with the benefits.  The key here is not just to make things work, it&#8217;s to make things work well and be sure that your customer (or *you*) will be able to quickly and easily make changes to the site.  If you have to go back through your entries each time to see how you formatted the last one, you should probably go back to the drawing board.



			<!--more-->

		