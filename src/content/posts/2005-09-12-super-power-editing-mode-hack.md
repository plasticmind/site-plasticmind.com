---
title: "Super Power Editing Mode Hack"
date: 2005-09-12 01:26:56
archive: true
excerpt: 
subtitle: 
slug: super-power-editing-mode-hack
featured_image_url: 
alt_text: 
primary_category: "Web Development"
categories: ["Web Development"]
tags: ["cms"]
meta_description: 
context: professional
fix: false
hits: 190
---


			

**Note: This hack is outdated with Movable Type 4.x.  Your best bet is to move on…**





Movable Type gives you an amazing amount of control over your content, but one of the things that it sorely lacks is the ability to make massive changes to *all* of your entries at once.  Oh sure, you can edit the basics in power editing mode—categories, authors, dates and titles—but we want more.  Being able to make massive changes to the extended, excerpt and keyword fields can become almost a necessity if, like me, you're using those fields for something other than their original purpose.





For instance—Customer A is using MT to store course listings.  The extended entry field contains the dates offered, the excerpt field holds the price and the keywords field stores the length of the class in days.  Now, admitedly, the data could be altered using SQL, but MT's biggest draw is its usability.  So we need a hack that will list those fields for editing in our power editing list.  





**<span class="red">NOTE, PART THE FIRST:</span> The following is a hack and will call for changes in core MT components.  Make sure you've made the appropriate backups before trying this one out.  Also, realize that if you upgrade your MT installation, these changes will be lost.  (Which is a bad thing if your customer relies on this functionality.)  Best suggestion is to add a AltTemplatePath ./alttmpl to your mt-config.cgi, create a /mt/alttmpl/cms directory and put your edited tempalte modules there.  But then, you already knew that if you're making drastic changes, right?**





**<span class="red">NOTE, PART DUEX:</span> This specific hack will not work versions of MT previous to 3.2 (probably guessed that with the mt-config.cgi instruction).  It's doable with the older versions, but I'm not going to take time here explaining it when you really should have upgraded.  Please <a href="mailto:jesse@plasticmind.com">email me</a> if you really need help with the older versions.  The major difference is that MT 3.2 moves all the power-editing functionality to a new template module called ‘entry*table.tmpl', whereas before, the power-editing form was integrated with ‘list*entries.tmpl'. The separation of it into its own template module makes perfect sense.**





**<span class="red">NOTE, PART THE LAST: </span>Hopefully after all these caveats you've realized that this hack really needs to be tailored to your own use.  I'm going to explain how I used it, but you're big boys and girls—you can make adjustments as necessary.**



#### Step 1: Changing the Entry Form: Editing ‘entry_table.tmpl'




As stated before, MT 3.2 moved the power-editing mode into the ‘entry*table.tmpl' (located in /mt/tmpl/cms/) instead of previous versions where it was integrated with ‘list*entries.tmpl'.  It makes much more sense now, considering we're not just ‘listing', we're editing as well.





In your ‘entry_table.tmpl', find the part where your table headers are defined—somewhere around line 23.  Scroll down until you find:



<pre><code>&lt;th id="en-category"&gt;&lt;MT_TRANS phrase="Category"&gt;&lt;/th&gt;
&lt;th id="en-date"&gt;&lt;MT_TRANS phrase="Date"&gt;&lt;/th&gt;
</code></pre>



Right after this code (and before the </tr>) insert the following lines:



<pre><code>&lt;th id="en-text_more"&gt;&lt;MT_TRANS phrase="Extended Entry"&gt;&lt;/th&gt;
&lt;th id="en-excerpt"&gt;&lt;MT_TRANS phrase="Excerpt"&gt;&lt;/th&gt;
&lt;th id="en-keywords"&gt;&lt;MT_TRANS phrase="Keywords"&gt;
</code></pre>



This will add three columns after your date column any place your entries are listed.  If I were creating this for my example site using MT to list courses offered, I could change the <code><MT_TRANS phrase="Extended Entry"></code> to simply “Dates Offered” (no quotes).  Keep in mind, this will hurt accesibility because the MT_TRANS tag is inserting translatable titles, allowing multi-language support.  Chances are though that if you're customizing this screen you're probably not too worried about that.





Next, we need to populate the columns with either editable input fields or the actual values themselves, depending on whether or not the list is being pulled from power-editing mode.  In your ‘entry_table.tmpl”, look for the following (around line 118):



<pre><code>&lt;td&gt;&lt;TMPL_IF NAME=IS_EDITABLE&gt;&lt;input name="created_on_&lt;TMPL_VAR NAME=ID&gt;" value="&lt;TMPL_VAR NAME=CREATED_ON_TIME_FORMATTED&gt;" /&gt;&lt;TMPL_ELSE&gt;&lt;span title="&lt;TMPL_VAR NAME=CREATED_ON_TIME_FORMATTED&gt;"&gt;&lt;TMPL_IF NAME=CREATED_ON_RELATIVE&gt;&lt;TMPL_IF NAME=DATES_RELATIVE&gt;&lt;TMPL_VAR NAME=CREATED_ON_RELATIVE&gt;&lt;TMPL_ELSE&gt;&lt;TMPL_VAR NAME=CREATED_ON_FORMATTED&gt;&lt;/TMPL_IF&gt;&lt;TMPL_ELSE&gt;&lt;TMPL_VAR NAME=CREATED_ON_FORMATTED&gt;&lt;/TMPL_IF&gt;&lt;/span&gt;&lt;/TMPL_IF&gt;&lt;/td&gt;
</code></pre>



This is the code for the date column.  Lets insert the following codes between the code you just found and the &lt;/tr&gt; right after it:



<pre><code>&lt;td&gt;&lt;TMPL_IF NAME=IS_EDITABLE&gt;&lt;input name="text_more_&lt;TMPL_VAR NAME=ID&gt;" value="&lt;TMPL_VAR NAME=TEXT_MORE&gt;" /&gt;&lt;TMPL_ELSE&gt;&lt;span title="&lt;TMPL_VAR NAME=TEXT_MORE&gt;"&gt;&lt;TMPL_VAR NAME=TEXT_MORE&gt;&lt;/span&gt;&lt;/TMPL_IF&gt;&lt;/td&gt;
&lt;td&gt;&lt;TMPL_IF NAME=IS_EDITABLE&gt;&lt;input name="excerpt_&lt;TMPL_VAR NAME=ID&gt;" value="&lt;TMPL_VAR NAME=EXCERPT&gt;" /&gt;&lt;TMPL_ELSE&gt;&lt;span title="&lt;TMPL_VAR NAME=EXCERPT&gt;"&gt;&lt;TMPL_VAR NAME=EXCERPT&gt;&lt;/span&gt;&lt;/TMPL_IF&gt;&lt;/td&gt;
&lt;td&gt;&lt;TMPL_IF NAME=IS_EDITABLE&gt;&lt;input name="keywords_&lt;TMPL_VAR NAME=ID&gt;" value="&lt;TMPL_VAR NAME=KEYWORDS&gt;" /&gt;&lt;TMPL_ELSE&gt;&lt;span title="&lt;TMPL_VAR NAME=KEYWORDS&gt;"&gt;&lt;TMPL_VAR NAME=KEYWORDS&gt;&lt;/span&gt;&lt;/TMPL_IF&gt;&lt;/td&gt;
</code></pre>



Let's pause for a moment and look at what's happening here.  Three columns are being inserted (beneath the headers we just created). A <code>TMPL_IF</code> tag is inserted because if we're in power-editing mode, we want editable fields, if we're simply looking at the entry list or the system overview, we just want values, no input fields.  One important thing to note with our input fields—be sure to include the text*more* or keywords_ with the <code>&lt;TMPL_VAR NAME=ID&gt;</code> attached no matter what you've named the column.  This will be important for our next step because it's how we tell MT which field and which entry to save changes to.





Go ahead and save your ‘entry_table.tmpl' template module, preferable in your /mt/alttemplate/cms/ directory.



#### Step 2: Getting MT Ready to Save New Fields: Adding Variables to ‘CMS.pm'




Modifying core Perl modules should always be done carefully and with hesitation.  The changes we're making here aren't taking any functionality away or even changing current functionality, we're simply ADDING functionality.  If you remove the custom entry table template module we created earlier, MT will function the same way it always has.  At the very most, you'd notice a performance hit when saving via power editing mode, and if it matters enough to you you can just remove the following changes.





MT doesn't expect extended entry, excerpt or keyword data to be passed to it from the power-editing mode, so we need to change that by adding those variables to the save_entries subroutine of ‘cms.pm'.





Open ‘/mt/lib/MT/App/CMS.pm' and find the following lines (around line 5084):



<pre><code>sub save_entries {
    my $app = shift;
    my $perms = $app-&gt;{perms}
</code></pre>



That's the beginning of the subroutine.  Scroll down about 20 lines until you see the following:



<pre><code>    $entry-&gt;author_id($author_id ? $author_id : 0);
    $entry-&gt;status(scalar $q-&gt;param('status_' . $id));
    $entry-&gt;title(scalar $q-&gt;param('title_' . $id));
</code></pre>



We want to add those values we included on the new power-editing template to this list so MT will actually save the data entered in those fields:



<pre><code>    $entry-&gt;text_more(scalar $q-&gt;param('text_more_' . $id));
    $entry-&gt;excerpt(scalar $q-&gt;param('excerpt_' . $id));
    $entry-&gt;keywords(scalar $q-&gt;param('keywords_' . $id));
</code></pre>



Save, upload and give it a try.  Keep in mind, if your ‘Excerpt' field is blank and your site configuration is set to auto create an excerpt with the first 250 words of your entry, the power-editing form could get **LONG**.  For the example of my class, since I'm using the excerpt field for the price of the class, I've set the auto-excerpt to 0 words so if the field is left blank, it will stay blank.





As I mentioned earlier, this hack isn't for every situation, but it's perfect if you're pushing the MT envelope and need the ability to edit more fields than is customary.



			<!--more-->

		