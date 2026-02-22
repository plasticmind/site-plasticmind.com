---
title: "Moving From Google Reader to Fever"
date: 2013-03-14 09:04:31
archive: true
excerpt: 
subtitle: "In case you were handcuffed to a pole in Jesse Pinkman's basement and missed the announcement, Google Reader is getting put out to pasture this July 1."
slug: from-google-reader-to-fever
featured_image_url: 
alt_text: 
primary_category: "App"
categories: ["App"]
tags: []
meta_description: 
context: professional
fix: false
hits: 860
---


			

I visit my RSS feeds rather faithfully, so I immediately started thinking about alternatives.  I've played with a lot of RSS readers, but I really like Shaun Inman's <a href="https://feedafever.com/">Fever</a> because it uses some clever analyzing of your feeds to bubble the really interesting stuff to the top.  And syncing isn't really an issue because you're accessing it one place on the web.





That's the big sticking point for most people though, I think&#8212;you have to host it yourself on your own server.  It may seem intimidating, but I put together a 7-minute long video that walks you through the whole process of setting up Fever on your server and moving all your feeds over from Google.  You could literally do it in 15 minutes&#8212;7 to watch the video and 8 to do it yourself.  (Before you do, be sure to read <a href="https://shauninman.com/archive/2013/03/14/fire">this note by Shaun</a>.)





For the visual learners, here's the video:



<iframe width="560" height="315" src="https://www.youtube.com/embed/1IrfHJgqbhA" frameborder="0" allowfullscreen></iframe>

### What You'll Need


<ul>
<li>A Unix-based server (most web servers)</li>
<li>A MySQL database (you'll need the username + password)</li>
<li>A Fever license ($30/domain)</li>
</ul>

### Installation


<ul>
<li>Create an account on <a href="https://feedafever.com/">feedafever.com</a></li>
<li>Download the <a href="https://www.feedafever.com/gateway/public/fever.zip">Fever Server Compatibility Suite</a></li>
<li>Copy the fever folder to your own server (make sure it's world writable, e.g. 777)</li>
<li>Run the Compatibility test by visiting *yourdomain.com/fever/boot.php* (be sure to enter in your MySQL credentials to test the database)</li>
<li>If all passes, purchase your Fever license</li>
<li>Enter the activation code into your Fever install</li>
<li>Export your feeds from Google Reader (Gear » Reader Settings » Import/Export tab » Download your data through Takeout » Create Archive)</li>
<li>Import subscriptions.xml in the Google archive into Fever (OPML)</li>
<li>Let Fever process your feeds</li>
<li>Adjust setting to fit your personal preferences</li>
</ul>



The upside to all of this is that once you've set it up, it just keeps updating your feeds 



			<!--more-->

		