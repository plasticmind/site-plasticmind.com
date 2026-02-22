---
title: "Migrating CustomFields to Movable Type Professional 4.1"
date: 2008-03-14 12:00:36
archive: true
excerpt: 
subtitle: 
slug: migrating-customfields-movable-type
featured_image_url: 
alt_text: 
primary_category: "Movable Type"
categories: ["Movable Type"]
tags: ["bugs", "customfields", "database", "upgrade"]
meta_description: 
context: professional
fix: false
hits: 186
---


			##### Installing CustomFields Upgrade Assistant




If you&#8217;re upgrading an MT 4.0 install that was using <a href="https://plugins.movalog.com/customfields/">Arvind&#8217;s CustomFields plugin</a> to <a href="https://www.movabletype.com/download/personal-use.html">MTP 4.1 which has CustomFields</a> built in, the first thing you need to know is that MTP will not automatically import your old CustomFields data.  You need to install the <a href="https://code.sixapart.com/trac/mtplugins/browser/trunk/CustomFieldsUpgradeAssistant/plugins/CustomFields?rev=464">CustomFields Upgrade Assistant plugin</a> to do the migration for you.  (Six Apart *please* get this out of Trac and into the Plugin Directory!)





A note about installing the upgrader: Arvind&#8217;s CustomFields plugin lives in the /plugins/ directory; the CustomFields that ships with MTP lives in the /addons/ directory.  You should remove the old CustomFields plugin when installing the CF Upgrade Assistant plugin.  Make sure that it&#8217;s actually *replacing* your old /plugins/CustomFields/ directory.  Leaving the old plugin code in there presents troubles because MT tries to use the old plugin code.  The final location for your CF Upgrade assistant should be /plugins/CustomFields/lib/CustomFieldsUpgrader/



##### Murphy&#8217;s Law




I tried logging into Movable Type, but I kept getting the following error: 



<blockquote>
  

A Error during upgrade: Can&#8217;t call method &#8220;can&#8221; on an undefined value at /var/www/dev/html/mt/addons/Commercial.pack/lib/CustomFields/Util.pm line 260


</blockquote>



I first thought that the MTP upgrade and the CF Upgrade Assistant could not be run at the same time.  However, it turns out that errors in the CF upgrade were keeping me stuck in the upgrade loop.  





**Important note for Safari users:**  *If the upgrade is throwing errors, you won&#8217;t see them if you&#8217;re using Safari.  I&#8217;m not sure why, but when the upgrade fails, it gives no feedback or error message in the log window, returns an &#8220;Upgrade Complete!&#8221; and throws you right back into an upgrade loop.  I suspect it has something to do with the javascript.*



##### Troubleshooting Orphans




Hopefully you didn&#8217;t read a space into the first word of that subtitle.





Anyhow, I was stuck in an upgrade loop.  <a href="https://tweezersedge.com/archives/stories/about_tweezerman.html">David Phillips</a>, God bless his soul, stepped in at this point with some heavy duty troubleshooting.  Turns out that the upgrade assistant chokes when it gets to orphaned custom field data.  What do I mean by orphaned data?  You can create custom fields for almost every object in the system (blog, entry, author).  However, the older version of CustomFields would not delete the custom field data even if the object associated with that custom field got deleted.  So if you had an entry with custom field data, and that entry was deleted, the custom field data would still live in the database, but you&#8217;d never see it in the UI.  The upgrade assistant would then find these objects, try to migrate them and then fail because the object they&#8217;re supposed to be associated with no longer exists.





Unfortunately, there&#8217;s no elegant solution.





At this point, the orphans can only be cleaned up through the database.  However, to help speed things up, I&#8217;m posting the queries I used to get rid of my orphaned data.  You can issue these fairly easily through something like phpMyAdmin or CocoaMySQL.  And the standard warning: **Make sure you back up your database before doing any type of massive database manipulations.**





To clean up orphaned custom fields data associated with **entries**, use the following SQL query:



<pre><code> DELETE FROM mt_plugindata WHERE
 LEFT( plugindata_key, 6 ) = 'entry_'
 AND plugindata_plugin = 'CustomFields'
 AND (SELECT entry_id FROM mt_entry
 WHERE LEFT( plugindata_key, 6 ) = 'entry_'
 AND plugindata_plugin = 'CustomFields'
 AND SUBSTRING( plugindata_key, 7 ) = entry_id) IS NULL;
</code></pre>



To clean up orphaned custom fields data associated with **authors**, use the following SQL query:



<pre><code> DELETE FROM mt_plugindata WHERE
 LEFT( plugindata_key, 1 ) = '_'
 AND plugindata_plugin = 'CustomFields'
 AND (SELECT author_id FROM mt_author
 WHERE LEFT( plugindata_key, 1 ) = '_'
 AND plugindata_plugin = 'CustomFields'
 AND SUBSTRING( plugindata_key, 2 ) = author_id) IS NULL;
</code></pre>

##### One Last Bug Squash




All your orphans should be gone.  But there&#8217;s a minor bug in CustomFields that we need to take care of.  If you tried running your upgrade at this point, you&#8217;d get this error message:



<blockquote>
  

Error during upgrade: Can&#8217;t call method &#8220;text&#8221; on an undefined value at /var/www/dev/html/mt/addons/Commercial.pack/lib/CustomFields/Util.pm line 322.


</blockquote>



You need to edit Util.pm.  If you open it up in a text browser, you&#8217;ll see this at line 322:



<pre><code> my $text = ($entry-&gt;text || '') . "n" . ($entry-&gt;text_more || '');
</code></pre>



Both occurrences of <code>$entry</code> need to be changed to <code>$obj</code>.  The final code should look like this:



<pre><code> my $text = ($obj-&gt;text || '') . "n" . ($obj-&gt;text_more || '');
</code></pre>

##### Upgrade!




**If you followed these somewhat complicated instructions carefully, the upgrade process should run through smoothly and your CF data should be migrated successfully.**





Please feel free to leave your comments or questions here.  Several people have told me that they&#8217;ve run into this; the more scenarios we can address, the more useful this article will be.  Thanks.



			<!--more-->

		