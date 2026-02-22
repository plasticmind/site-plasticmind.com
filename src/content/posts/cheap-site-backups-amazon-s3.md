---
title: "Cheap Site Backups Using Amazon S3"
date: 2012-03-29 05:31:18
archive: true
excerpt: 
subtitle: "I created a PHP script that archives a specific folder and database then uploads the archives to an Amazon S3 bucket for safe keeping.  Here's how it works, hopefully it can help you get your backups in order."
slug: cheap-site-backups-amazon-s3
featured_image_url: 
alt_text: 
primary_category: "Code"
categories: ["Code"]
tags: ["amazon", "s3"]
meta_description: 
context: professional
fix: false
hits: 3321
---


			<h3>The Concept</h3>



I was looking for a way to automate the backup process of a big site I'm working on.  Currently, we were backing up the database and file system locally.  Better than nothing, but what good were those backups if our server's hard drive crashed?  We needed some kind of solution to backup the data remotely.





Amazon Web Services seemed like a perfect fit: all our data stored remotely and pricing based primarily on bandwidth out (the only time we'd be accessing this data was a failure).  However, my previous experience with AWS made me a bit nervous to go this route since their API model made it a bit different than traditional file systems and their pricing structure was variable.  Thankfully, the entire set up was painless thanks to their well-documented SDK.



			<!--more--><h3>The Process</h3>



Before I go into the process in detail, I should warn you that you'll need both FTP and shell access to your web server and some moderate familiarity with both Linux commands and PHP to get this set up.  However, I figured most of this stuff out by Google-ing around and doing lots of reading, so I'd say at least give it a try.



<h4>Create an S3 account</h4>



Setting up an S3 account is simple.  Visit <a href="https://aws.amazon.com/s3/">https://aws.amazon.com/s3/</a> and select the "Sign Up Now" button.  If you already have an Amazon account, you can log in with it, or you can just create a new account.  (There are <a href="https://www.youtube.com/watch?v=5Qfuq4TRRMg">plenty of resources</a> for creating an S3 account if you're having trouble.)





After logging in, you'll be given a list of prices.  At the time of my signing up, storage and data transfer out (no charge for data transfer in) was $0.12/gb for North American customers.  If you want a better estimate of what your costs might be, be sure to check out the <a href="https://calculator.s3.amazonaws.com/calc5.html">AWS Pricing Calculator</a>.





Here's a pretty realistic example: Let's say I'm backing up a 1Gb file system and 50Mb database nightly and storing the last 30 days of backups.  According to the calculator, **the monthly cost would be $3.88.**  That's not even factoring in the free usage tier they offer to new customers.





Once you've created your S3 account, visit <a href="https://aws-portal.amazon.com/gp/aws/securityCredentials">the AWS Access Credentials section</a> to get the Access Key ID and the Secret Access Key.  Be sure not to give out the Secret Access Key as that's essentially your password for your AWS account.  Keep these two on hand, you'll need them when we configure the backup script.



<h4>Download the code</h4>



<a href="https://github.com/downloads/plasticmind/S3-Site-Backups/S3%20Site%20Backups.zip" class="download-link">First, download the code.</a>





Note: You can also <a href="https://github.com/plasticmind/S3-Site-Backups">pull this directly from Github</a> if you're so inclined.  Also, the archive includes <a href="https://aws.amazon.com/sdkforphp/">the Amazon S3 SDK for PHP</a>; feel free to download and include the latest version if you're a fan of hacking around.





You'll need to decide where to install.  I recommend you put this somewhere *not* publicly accessible since I presume you don't want the world getting at your backups or your AWS credentials.  One level above your <code>public_html</code> folder should do fine.  Upload the contents of this archive there.



<h4>Configure the code</h4>



Next, you need to edit two files: 





**config.inc.php** - Here's where you'll place the AWS Access Key ID and Secret Access Key you made note of earlier.  You'll find this in the S3 folder.





**s3_backup.php** - There are several configuration options you'll need to set here:



<ul>
<li>**$bucket** - The S3 bucket (read: folder) we'll upload archive files into</li>
<li>**$archive_path** - The location on the local disk where backups will be stored</li>
<li>**$expire_days** - How long before a backup file should expire (Amazon will delete it after it's expired)</li>
<li>**$notify_email** - Comma-separated list of email address to mail when a backup is run successfully</li>
<li>**$notify_sitename** - Name to use for email notification subject line</li>
<li>**$path*to*archive** - Folder to archive</li>
<li>**$db_host** - Database host, defaults to localhost</li>
<li>**$db_name** - Database name</li>
<li>**$db_user** - Database username</li>
<li>**$db_pass** - Database password</li>
</ul>



Once you set these up, you should be able to run "php s3_backup.php" and after a minute or two (depending on the size of what you're backing up), a local archive of the file system and database should be created and uploaded to your S3 bucket.  More on how to get to these momentarily...



<h4>Set up the cron tasks</h4>



This backup magic is great, but what you really want is to "set it and forget it".  You want this backup happening nightly.  To do this, you'll need to edit your crontab by typing 'crontab -e' when logged into your server via shell.  What comes up might look a bit intimidating, but you'll basically want to add two lines:



<pre><code># Nightly local and AmazonS3 backups run (at 1am)
00 1 * * * cd /PATH/TO/HOME_DIR; php s3_backup.php
# Delete all local backups older than 3 weeks (at 2am)
00 2 * * * find /PATH/TO/HOME_DIR/backups/*.gz -ctime +21 -type f -print | xargs rm -f
</code></pre>



Two things are happening here.  First, the backup script is being run nightly at 1am.  Second, all backups in the backup directory that have a created on time older than 21 days will be deleted.





Be sure to edit the first path to point to the folder where you've uploaded the script.  The send path should point to the folder where you've set up your backups to get stored.  You can also adjust the number of days of backups to keep.  If you're tight on space, feel free to change it to 2 or 3 (instead of 21) since it's getting uploaded to Amazon S3 anyway.  





In case you've never done this (or used vi) before, press 'I' to switch to edit mode and use the arrow keys to add these lines.  Once you're done entering this, press 'Escape' and type ':wq' to save your changes and quit.





Check out this resource for more <a href="https://www.adminschoice.com/crontab-quick-reference">help with crontabs</a>.



<h3>Get to your backups</h3>



Now that the code is installed and it's being run nightly, your backup system is working!  An email should get sent out to you whenever the script is run successfully.





But how do you get to those remote backups?





There are several useful apps like <a href="https://panic.com/transmit/">Transmit</a> for the Mac and <a href="https://s3browser.com/">S3Browser</a> for the PC that will ask for you for your Access Key ID and Secret Access Key.  They'll let you browse your buckets in an FTP-like experience.  





However, Amazon provides a pretty powerful web interface for all of your AWS services.  Visit <a href="https://console.aws.amazon.com/console/home">the AWS Management Console</a> and you can browse all of your buckets, download files and even change the expiration rules for all of your backup files.



<h3>Rest easy</h3>



I know you don't believe me, and rightfully so.  Tomorrow, check the backup directory.  Check the S3 bucket.  Download your backups and unzip/restore to your heart's content and make sure all is as it should be.





Once you're satisfied everything is backing up correctly, you shift your attention toward other things, **like creating awesome stuff**.



		