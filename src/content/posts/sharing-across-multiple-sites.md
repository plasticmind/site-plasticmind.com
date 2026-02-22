---
title: "Sharing Resources Across Multiple Sites Using Movable Type"
date: 2009-04-16 05:43:03
archive: true
excerpt: 
subtitle: 
slug: sharing-across-multiple-sites
featured_image_url: 
alt_text: 
primary_category: "Movable Type"
categories: ["Movable Type"]
tags: ["htaccess", "movabletype", "multiblog"]
meta_description: 
context: professional
fix: false
hits: 495
---


### Problem:




**We have several different sites that are powered by one Movable Type install.  These sites have common elements that need to be shared across all of the blogs&#8212;something like services, staff or course descriptions.**  Unlike global template modules, these shared items have lots of meta (like categories, tags, etc) and really need the framework a blog provides.  Not every one of our sites have the same services, staff or courses, so they need to be able to specify which resources get pulled from the pool.





More importantly, perhaps, is the fact that each of these items in our shared library need to live within the chrome and the url structure of the individual sites.  In other words, the course that Site A is offering is the same as Site B, but we need to make sure the course description lives at <code>https://examplesite-a.com</code> and <code>https://examplesite-b.com</code> respectively along and has each site&#8217;s correspondent branding and layout.



### Solution:




**Here&#8217;s the gist of our solution.**  We create a shared blog and then pull those shared pages or entries into each individual blog using private tags as a filter.  They&#8217;re fed into a php switch statement that checks against a query string and serves up these shared resources based on which is identified in the url.  **The end result will look something like <code>https://examplesite-a.com/courses/?course=microsoft_word</code>.**  A little confusing at first, but it will make more sense as we start building it out.





<img src="https://farm4.static.flickr.com/3575/3448016872_acece35878.jpg?v=0" alt="Sharing Resources Across Multiple Sites" title="" />



			<!--more-->

First, create this &#8220;shared blog&#8221; within the system.  Make note of the blog&#8217;s id.  Publishing settings won&#8217;t matter too much because this is really just storing data for the other sites to pull from.  In fact, you can save yourself some unnecessary rebuilding and delete all the templates in this shared blog.





Go ahead and add some pages to this shared blog.  For this example, I&#8217;ll be creating a pool of courses, each with a course title (title), course description (entry body) and course category (category).





Next, in the individual blog where you&#8217;re pulling from this shared library, create an index template with the following code (obviously replacing the chrome header and footer with whatever standard code you&#8217;ve got before and after the main page content):



<pre><code>&lt;!-- CHROME HEADER --&gt;
&lt;mt:Var name="this_blog_tag" value="@sitea"&gt;
&lt;?php
    if (array_key_exists('course', $_GET)) {
        $coursename = $_GET[course];

        switch ($coursename) {
            &lt;mt:Pages blog_ids="###" tag="$this_blog_tag OR @ALL" no_folder="1" sort_by="title" sort_order="ascend"&gt;
            case "&lt;mt:PageBasename&gt;": ?&gt;
                &lt;div class="course"&gt;
                    &lt;h1 id="page-title" class="asset-name"&gt;&lt;mt:PageTitle&gt;&lt;/h1&gt;
                    &lt;mt:PageBody&gt;
                    &lt;mt:PageMore&gt;
                &lt;/div&gt;
            &lt;/mt:Pages&gt;
            &lt;?php
            default:
                echo "Not A Valid Course.";
        }
    } else {
        echo "No Course Selected.";
    }
?&gt;

&lt;!-- CHROME FOOTER --&gt;
</code></pre>



You can publish the output file whatever you want, but make sure it&#8217;s a .php file.  For this example, I&#8217;m using <code>courses/index.php</code>.  That will publish this file to https://examplesite-a.com/courses/index.php.





Now, let&#8217;s break down this script.  First, we&#8217;re creating a variable called <code>this_blog_tag</code>.  Setting a variable here lets us define this particular site&#8217;s private tag (more on that in a moment) in a module that gets included in the header of this particular blog.  That way the rest of the code can be moved into a global module if you want and it will still filter correctly on a per blog basis.  *If you don&#8217;t understand that part, don&#8217;t worry&#8212;you don&#8217;t need it to get this working.*





Next, we&#8217;re checking to see if any course was specified in the query string.  If not, the script dumps out a &#8220;No Course Selected&#8221; message, but that&#8217;s probably not likely to get seen because we&#8217;re going to let MT build the urls.  If something **is** specified in the query string, we run in through a PHP <code>switch</code> statement.





Essentially, MT is providing PHP with all of the different valid &#8220;cases&#8221; that this query string could be and filling out the content for each of those &#8220;pages&#8221;.  Notice the <code>mt:Pages</code> loop.  Every page from your shared blog (be sure to replace ### with the blog id of the shared blog) that is tagged with this site&#8217;s tag (e.g. @sitea) gets a case statement.  PHP compares the query string (e.g. ?course=microsoft_word) with the basename of the page.  If they match, that page&#8217;s content is served up; if not, an error message is displayed.





**Ok, the heavy code part done.  Let&#8217;s see what all this means practically.**  





We type in the url <code>https://examplesite-a.com/courses/?course=microsoft_word</code>.  The <code>index.php</code> page in our courses folder then checks to see if <code>microsoft_word</code> is a valid case.  Since the basename for our Microsoft Word page on the shared blog is <code>microsoft_word</code> and since we&#8217;ve tagged that page with @sitea, it works!  If that particular page wasn&#8217;t tagged with @sitea or @ALL, MT wouldn&#8217;t build in a case for it into this site&#8217;s PHP.





So how do we use this with our site?  I could, for instance, put a &#8220;Courses Offered&#8221; sidebar module that looked something like this:



<pre><code>&lt;h3 class="widget-header"&gt;Site A Courses Offered&lt;/h3&gt;
&lt;ul class="widget-list"&gt;
&lt;mt:Pages blog_ids="###" tag="@sitea OR @ALL" no_folder="1" sort_by="title" sort_order="ascend"&gt;
    &lt;li&gt;&lt;a href="&lt;mt:BlogURL&gt;courses/?course=&lt;mt:PageBasename&gt;"&gt;&lt;mt:PageTitle&gt;&lt;/a&gt;&lt;/li&gt;
&lt;/mt:Pages&gt;
&lt;/ul&gt;
</code></pre>



Notice the url we&#8217;re building: <code>&lt;mt:BlogURL&gt;courses/?course=&lt;mt:PageBasename&gt;</code>.  We&#8217;re just passing the basename to that one course page, and that PHP magic we created knows which to serve up.  Now we have one course (along with it&#8217;s description, title, category and whatever other custom fields we want to create) that can be pulled into as many sites as we want while still retaining that site&#8217;s url structure and branding.





**Note:** If you don&#8217;t like query strings, you can always put something like this in an .htaccess file to clean up your url:



<pre><code>RewriteCond %{REQUEST_URI}  ^/services
RewriteRule ^(.*)$ /services.php?service=$1 [L,QSA]
</code></pre>



That lets us use cleaner permalinks for our courses, like <code>&lt;mt:BlogURL&gt;courses/&lt;mt:PageBasename&gt;</code>.



		