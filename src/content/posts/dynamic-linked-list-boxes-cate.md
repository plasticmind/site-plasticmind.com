---
title: "Dynamic Linked List Boxes: Categories and Entries"
date: 2005-09-03 22:03:02
archive: true
excerpt: 
subtitle: 
slug: dynamic-linked-list-boxes-cate
featured_image_url: 
alt_text: 
primary_category: "Movable Type"
categories: ["Movable Type"]
tags: []
meta_description: 
context: professional
fix: false
hits: 558
---


			

Movable Type is being used to store a list of classes, and we need to make those class titles available in a form field (class registration) as a dynamically linked list box.  The user will be presented with two list boxes, the first with a list of categories, the second (which is disabled until a category is chosen) with a dynamically generated list of the titles in the selected category.



#### Ingredients




We&#8217;re going to need two important things here.  First, <a href="https://www.yxscripts.com/cs/chainedselects.html">a handy DHTML script from Xin Yang called **Chained Selects**</a> that&#8217;s going to power our linked list boxes.  The script that you&#8217;ll be dropping into your directory is called chainedselects.js.





Second, a javascript file that we&#8217;ll call to from our form for the list of categories and entry titles.  Movable Type will be generating this file.



#### Pros and Cons




Dealing with multidimensional data can sometimes be harrowing, especially if you&#8217;ve got alot of categories and entries, which we do in this example.  The beauty of this process is that once we create the basic structure of the data file, Movable Type will handle all the complexity.  Your users get a simple yet effective drop down menu.





There are some weaknesses to using DHTML, namely problems for those who don&#8217;t have javascript support; however, other options (that don&#8217;t involve massive programming skills) require all the data to be included in the HTML, which is really out of the question considering the amount of data we&#8217;re dealing with.  But we&#8217;ll deal with some of those concerns at the end of the article.



#### The JavaScript




Our first step is to <a href="https://www.yxscripts.com/cs/chainedselects.html">download the Chained Select script</a>.  The only file you&#8217;ll need from the .zip file (as mentioned before) is chainedselects.js.  Upload this to the same directory your form will be in.





Next, we&#8217;re going to use Movable Type to generate a javascript data file.  It&#8217;s easier than it sounds.  Log into your MT installation and create a new index template.  We&#8217;re going to name is &#8216;classes.js&#8217; because in our example it&#8217;s a list of classes.  You can name it whatever you want, just be sure it has a .js extension and remember the name later when you&#8217;re calling to it from the HTML.  





We&#8217;re not going to need HTML headers because this file is basically just going to be generating/populating our menus:



<pre><code>// var hide_empty_list=true; //uncomment this line to hide empty selection lists
var disable_empty_list=true; //uncomment this line to disable empty selection lists
addListGroup("titles", "cat");
addOption("cat", "Select a category", "", "", 1); //Empty starter option
&lt;MTCategories&gt;
    addList("cat", "&lt;$MTCategoryLabel encode_js="1"$&gt;", "&lt;$MTCategoryLabel encode_js="1"$&gt;", "&lt;$MTCategoryLabel encode_js="1"$&gt;");
&lt;/MTCategories&gt;

&lt;MTCategories&gt;
    addOption("&lt;$MTCategoryLabel encode_js="1"$&gt;", "Select class", "", "", 1); //Empty starter option
    &lt;MTEntries&gt;
        addOption("&lt;$MTCategoryLabel encode_js="1"$&gt;", "&lt;$MTEntryTitle encode_js="1"$&gt;", "&lt;$MTEntryTitle encode_js="1"$&gt;");
    &lt;/MTEntries&gt;
&lt;/MTCategories&gt;
</code></pre>



The two options at the beginning of the script var hide*empty*list=true; and disable*empty*list=true; allow you to hide or disable the second list (respectively) if a category has not been chosen.  I&#8217;ve simply disabled it, as a disappearing/reappearing form element can be confusing to users and a headache to designers.  A // starts a comment in a script file, so if we want the browser to recognize this line, we&#8217;ll just remove it.





There are three functions (defined in chainedselects.js) that we&#8217;re executing in this script: addListGroup, addList and addOption.  The addListGroup function creates the &#8220;root&#8221; group, almost like a root level directory.  In this example, we&#8217;ll only be using one, because we&#8217;re only creating one set of selection boxes.  The addList function defines lists so we can attach options to each list.  Think of this function as a &#8220;folder&#8221; into which we&#8217;ll place options.  The addOption function is then creating options to attach to each created list, much like &#8220;files&#8221; in a &#8220;folder&#8221;.





Don&#8217;t lose me.  Let&#8217;s get back to the code:  After the initial commented/uncommented options, we&#8217;re creating our &#8220;root&#8221; list.  This is essentialy a name for the list.  The function addListGroup(&#8220;titles&#8221;, &#8220;cat&#8221;); will create a list group called &#8216;titles&#8217; that we can call from the HTML and &#8216;cat&#8217; will be the name we&#8217;ll use for the primary list box.  Don&#8217;t get confused.  This isn&#8217;t the name we&#8217;re using in the HTML, this is what we&#8217;ll use to add options to that primary list box next.





Now we start to add options to our &#8216;cat&#8217; list:  addOption(&#8220;cat&#8221;, &#8220;Select a category&#8221;, &#8220;&#8221;, &#8220;&#8221;, 1); //Empty starter option.  This is just a dummy option that shows &#8220;Select a category&#8221; if they&#8217;ve not yet chosen one.



<pre><code>&lt;MTCategories&gt;
    addList("cat", "&lt;$MTCategoryLabel encode_js="1"$&gt;", "&lt;$MTCategoryLabel encode_js="1"$&gt;", "&lt;$MTCategoryLabel encode_js="1"$&gt;");
&lt;/MTCategories&gt;
</code></pre>



If you&#8217;ve followed me this far, this bit of code should make sense.  We&#8217;re basically adding options (and in this case, because it&#8217;s the primary list, sub-lists) to the category (&#8216;cat&#8217;) list.  You&#8217;ll notice <code>&lt;$MTCategoryLabel encode_js="1"$&gt;</code> three times in a row.  Here&#8217;s the breakdown:  addList(&#8220;first-list-name&#8221;, &#8220;option text&#8221;, &#8220;option value&#8221;, &#8220;sub-list-name&#8221;, default-selected).  First, we identify that these options (all the categories from your blog generated by MT) all belong on the &#8216;cat&#8217; list.  Next, we use the <code>&lt;$MTCategoryLabel encode_js="1"$&gt;</code> tag to define our option text (what the user sees), the options value (what gets passed to your form) and the sub list name, for adding options later in the code.  <span class="red">Please be sure to use encode_js=&#8221;1&#8221; in your <code>&lt;$MTCategoryLabel$&gt;</code> tag!  Your entry titles and javascript don&#8217;t usually get along (especially if you like ampersands in your titles).</span>



<pre><code>&lt;MTCategories&gt;
    addOption("&lt;$MTCategoryLabel encode_js="1"$&gt;", "Select class", "", "", 1); //Empty starter option
    &lt;MTEntries&gt;
        addOption("&lt;$MTCategoryLabel encode_js="1"$&gt;", "&lt;$MTEntryTitle encode_js="1"$&gt;", "&lt;$MTEntryTitle encode_js="1"$&gt;");
    &lt;/MTEntries&gt;
&lt;/MTCategories&gt;
</code></pre>



This is probably the most confusing part, but really shouldn&#8217;t be.  We are using the <code>&lt;MTCategories&gt;</code> to create populate the second list, the one that&#8217;s dynamically linked to the first.  We first defined our sub lists, now we are adding options (notice the addOptions?) to those sub lists.  Please notice that we are adding *options* and not *lists*, because we&#8217;re done with sub lists.  This script is powerful enough to create more sub-lists, but for the sake of what we&#8217;re trying to accomplish, two levels is enough.





The <code>&lt;MTCategories&gt;</code> envelope will loop through all of our categories, and the <code>&lt;MTEntries&gt;</code> envelope will loop through all the entries in each category.  We&#8217;ve put a addOption(&#8220;<code>&lt;$MTCategoryLabel encode_js="1"$&gt;</code>&#8221;, &#8220;Select class&#8221;, &#8220;&#8221;, &#8220;&#8221;, 1); //Empty starter option before the <code>&lt;MTEntries&gt;</code> envelope because we&#8217;re creating a dummy selector for each category.  Then we loop through all the entries in that category and add each class title as an option.  Note: If you recall the breakdown for our syntax, addOption(&#8220;first-list-name&#8221;, &#8220;option text&#8221;, &#8220;option value&#8221;, default-selected), you can fill in the option value with whatever MT tag you&#8217;d like, entry ID, keywords, predefined user field.  This gives you some real flexibility and power.



#### The HTML




Almost done, promise.





We need to do three important things to the HTML file we want the dynamic linked list boxes to appear in.  First, in the header of the HTML we need to simply call to the chainedselect.js file and our MT generated javascript file.  For instance, something like this should appear in the header of your code, where &#8216;classes.js&#8217; is the name of the MT index file you created earlier:



<pre><code>&lt;script language="javascript" src="/chainedselects.js"&gt;&lt;/script&gt;
&lt;script language="javascript" src="/classes.js"&gt;&lt;/script&gt;
</code></pre>



Next, we need to add an onLoad to the body tag so we can associate the data from our MT-generated script file with our menus when the page loads:



<pre><code>&lt;body onload="initListGroup('titles', document.forms[0].Category, document.forms[0].Course, 'cs')"&gt;
</code></pre>



First, you&#8217;ll notice &#8216;titles&#8217;.  This was the list group we created at the beginning of our script file.  Next, we&#8217;re initializing both of our list boxes.  If you&#8217;re creating deeper (third or fourth level) list heirarchies, you&#8217;ll have a document.forms[0].SelectNameGoesHere for each list box.  I&#8217;ve named the two I have &#8216;Category&#8217; and &#8216;Course&#8217;, but you can name them what you want; just make sure they match with the names of the list boxes in your form.  The &#8216;cs&#8217; is an additional feature of the chainedselects.js script that uses a small cookie to remember the last selected entry in case the user reloads the page.  Consult the documentation included with the .zip file for more information about that.





Lastly, we&#8217;re going to put our list boxes into our HTML:



<pre><code>&lt;label for="Category"&gt;Category:&lt;/label&gt;
&lt;select name="Category" value=""&gt;&lt;/select&gt;

&lt;label for="Course" class="mandat"&gt;Course:&lt;/label&gt;
&lt;select name="Course" value=""&gt;&lt;/select&gt;
</code></pre>



Don&#8217;t forget that these need to go inside a form.  What you do with them (pass data to an email, search form, URL jump, etc.) is completely up to you.



#### Caveats




As we said earlier, there are some weaknesses behind a form like this.  Someone who disables javascript will be faced without a second list box.  I&#8217;ve worked around that by allowing users to also register directly from an individual entry, in essence giving the users another way (though longer) to accomplish the same thing.  That&#8217;s why I can risk a form that doesn&#8217;t work.





The other option, as is outlined by <a href="https://www.alistapart.com/">A List Apart</a> in an article called <a href="https://www.alistapart.com/articles/complexdynamiclists/">Complex Dynamic Lists</a> gives a straight HTML solution, which may be more appropriate for pages with less data to incorporate (menus, etc.)  If anyone has comments/suggestions about integrating MT with the ALA menu structure or perhaps a better solution via PHP, please feel free to share.  It will bide my reader&#8217;s over until I can come up with an article about it.



#### Example In Action




You can see this in action at <a href="https://www.compvisions.com/register.php">https://www.compvisions.com/register.php</a> &#8212; the list boxes in the registration form filled dynamically with the most current class titles via Movable Type.



			<!--more-->

		