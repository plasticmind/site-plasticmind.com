---
title: "Sorting Categories Any Way You Please"
date: 2005-08-17 06:54:12
archive: true
excerpt: 
subtitle: 
slug: sorting-categories-any-way-you
featured_image_url: 
alt_text: 
primary_category: "Web Development"
categories: ["Web Development"]
tags: ["cms"]
meta_description: 
context: professional
fix: false
hits: 176
---


			

Strange adding a category called categories… but I digress.



### Two Roads Diverged…




I've been working on a new blog in which I want to sort the categories in order *other than* alphabetical.  Now, there is an quick and ugly solution, and there is a time-consuming and beautiful solution.  First, we'll look at the ugly way of sorting your categories of the U.S. Presidents:



### The Easy, Ugly Way




Create first category for Washington, only call it 01:Washington.  Create second category for Adams… name it 02:Adams.  So and so on through the U.S. Presidents.  When Movable Type builds your page, it catches those initial numbers and puts them in order by number.  A solution, but an ugly one, because you're list is uglied by those darn digit prefixes.



### The Difficult, Prettier and Ultimately More Rewarding Way




The second, cleaner solution requires you to install Brad Choate's <a href="https://bradchoate.com/weblog/2002/07/27/mtregex">MT-Regex plugin</a>.  It's a simple plugin that's oh-so-powerful because it gives you the ability to search and replace <a href="https://en.wikipedia.org/wiki/Regular_expression">using Unix-style regular expressions</a>.  In laymen's terms it's going to allow us to find the <span class="red">01:</span> before Washington and <span class="red">02:</span> before Adams and get rid of them.  “So why put them in there in the first place if they're just going to be deleted?”  Because it removes it *after* Movable Type has processed the category, meaning it sorts by the 01:, 02:, but erases them before they appear on the page, giving you the power to sort the way you like.





Now to the time-consuming (unless you copy-and-paste, which is really why you're here, right?) part.  First, you need to define the regular expression that will tell MT-Regex what you want taken off your categories:



<pre><code>&lt;MTRegexDefine name="patt2"&gt;s/..://gi&lt;/MTRegexDefine&gt;
</code></pre>



You'll probably want to put this right before your categories code on your page so it doesn't get lost. What you're doing is defining a pattern named “patt2”.  The ‘s' indicates that you are performing a search, after which you would place a forward slash (/) followed by your what you're searching for.  In this example, we want to search for two digits followed by a colon.  In regex, you can use a period (.) as a wildcard for any single digit.  So the ‘..' will find 01 as well as 99.  If you have more digits preceeding, just be sure to have one period for each digit.  Next we place another forward slash followed by it's replacement.  In this example we're just erasing them, so we have nothing, not even a space.  We close the replacement with a final forward slash followed by ‘gi',  indicating that we want the search to be global and case insensitive (neither of which really matter too much in this example).  Next we need to call to the search pattern in our template.  Let's use the front page category module for our example:



<pre><code>&lt;MTSubCategories&gt;
    &lt;MTIfNonZero tag="MTCategoryCount"&gt;
    &lt;MTIfMatches var="CategoryLabel" pattern="m/(..:)/i"&gt;
        &lt;a href="&lt;$MTCategoryArchiveLink$&gt;" title="&lt;$MTCategoryCount$&gt; Entries"&gt; &lt;MTCategoryLabel regex="patt2"&gt;&lt;/a&gt; |
    &lt;MTSubCatsRecurse max_depth="3"&gt;&lt;/MTIfMatches&gt;
    &lt;MTElse&gt;&lt;MTCategoryLabel regex="patt2"&gt; | &lt;/MTElse&gt;
    &lt;/MTIfNonZero&gt;&lt;MTSubCatsRecurse max_depth="3"&gt;
&lt;/MTSubCategories&gt;
</code></pre>



If you followed the explanation earlier, the code here should make sense.  We're using the <code>&lt;MTIfMatches&gt;</code> tag to make sure that the pattern is in the category label before we load the search-and-replace function.  If it exists, the pattern that we defined (patt2) is loaded and the numeric prefix is removed from the category, leaving us with a correctly sorted yet clean category list.





For more information about regex searches/syntax/possibilities, visit the <a href="https://www.perldoc.com/perl5.8.4/pod/perlop.html#Regexp-Quote-Like-Operators" target="_blank">Perl operators and precedence</a> page.



### Disclaimer




When your category directories are built, they will contain those first two digits. For example, your Washington directory would be <code>/01washington/</code> and your Adams directory would be <code>/02adams/</code>.  I've tried calling to the regex plugin in the archive file template, but it doesn't seem to work:



<pre><code>&lt;MTRegexDefine name="patt3"&gt;s/..://gi&lt;/MTRegexDefine&gt;&lt;MTIfMatches var="CategoryPath" pattern="m/(..:)/i"&gt;&lt;$MTCategoryPath lower_case="1" regex="patt3"$&gt;&lt;/MTIfMatches&gt;/&lt;$MTEntryTitle dirify="1"$&gt;.html
</code></pre>



All it does is take the entire category off and put the individual archives in the root directory.  If anyone else has had luck with this, please leave me a content and let me know the trick…



### Beta Build Issues




Also, with the new way that beta-4 handles archive file templates, I'm not sure that this old trick will work.  They've provided ‘pre-dirifeed' archive file path specifiers (see <a href="https://www.sixapart.com/movabletype/docs/3.2/e_archive_file_path_specifiers/">manual</a>) such as <code>%f</code> (archive filename with the specified extension) and <code>%c</code> (the entry's primary category/subcategory path passed through the dirify global filter).  I still haven't determined if mixing and matching these with normal MTTags is kosher…



			<!--more-->

		