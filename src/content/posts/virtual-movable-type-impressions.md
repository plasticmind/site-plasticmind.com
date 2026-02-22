---
title: "Virtual Movable Type, First Impressions"
date: 2008-09-19 18:08:44
archive: true
excerpt: 
subtitle: 
slug: virtual-movable-type-impressions
featured_image_url: 
alt_text: 
primary_category: "Blogging"
categories: ["Blogging", "Movable Type"]
tags: ["movabletype", "parallels", "virtualization"]
meta_description: 
context: professional
fix: false
hits: 396
---


### What Is It?




Ok, the first question that nearly everyone asks when they hear about **Virtual Movable Type** is: &#8220;What's the virtual part all about?&#8221;  From the readme file:



<blockquote>
  

JumpBox virtual appliances are the easiest path to running server based applications. A JumpBox bundles the operating system with the application and all its dependencies into a single ready to run bundle. This allows you to focus on working with the application while not having to worry about getting it installed. It also means that the application can be deployed on any x86 platform regardless of what platform the application is written for. All that is required is the JumpBox, some virtualization software like VMware, anetwork that assigns dynamic IP addresses (most do), and a computer with enough RAM and disk space.


</blockquote>



The long and short is that a pre-packaged version of Movable Type is bundled up and ready to run with any software that handles virtual appliances.  Some servers support this natively which turns running MT into drag-and-drop simplicity.  You can also use different desktop virtualization packages like <a href="https://www.parallels.com/">Parallels</a> or <a href="https://www.vmware.com/products/player/">VMware</a> (the VMware player is free).  I'll be talking about my experience with Virtual MT and Parallels in this article.



### Installation? Virtually Painless.




Ok, that subtitle sucks, but the installation sure didn't.





**1.** <a href="https://www.jumpbox.com/download-page?application=movabletype">Download Virtual Movable Type from Jumpbox.</a>  You don't even have to fill in any information to get at the file (which actually surprised me).





<a href="https://www.flickr.com/photos/plasticmind/2870831787/"><img src="https://farm4.static.flickr.com/3021/2870831787_ba929cc06c.jpg?v=0" alt="Download Virtual Movable Type" title="" /></a>





**2. Unzip the downloaded file.**  If you're running VMware, Parallels or some other virtualization software, <code>Jumpbox.pvs</code> should show up ready to run.  One click and Parallels booted up my new Virtual Movable Type server.





<a href="https://www.flickr.com/photos/plasticmind/2871669816/"><img src="https://farm3.static.flickr.com/2193/2871669816_9be1c13e83.jpg?v=0" alt="Jumpbox Admin Panel" title="" /></a>





**3. Log into the local Jumpbox panel from your browser.**  Once Parallels boots up, it will show you two IP addresses, one for accessing Movable Type and one managing the Jumpbox virtual server that's running.  Log into Jumpbox and you'll be able to set up your account as well as turn on features like SSH, SFTP and stats.





<a href="https://www.flickr.com/photos/plasticmind/2870840695/"><img src="https://farm4.static.flickr.com/3219/2870840695_399e4c8e69.jpg?v=0" alt="Virtual Movable Type, Dashboard" title="" /></a>





**4. Log into Virtual Movable Type.**  One thing they don't point on well enough in the docs is that **your username is &#8216;admin'** and **your password is your Jumpbox password**.  One you're in, everything should look familiar.  Now enjoy the new blog smell for a moment.



			<!--more-->### A Few Notes




**Security exception.**  When I first logged into Jumbox, it came up with a security certificate that I had to make an exception for.  I'm not sure if that's because I logged in via the IP address and not the server name it created.  The readme clarifies: 



<blockquote>
  

The initial JumpBox Configuration process is no longer encrypted.  After the setup process, however, the admin portal will still be encrypted. Your browser may show a warning or error when you try to access it. It is ok to accept the certificate.  For details, see: <a href="https://www.jumpbox.com/faq/sslwarning">https://www.jumpbox.com/faq/sslwarning</a>.


</blockquote>



**Can't remove default blog.**  And you can't change the default publishing path.  Well, you can, but it's difficult to fix if you do.  The title can be changed and additional blogs can be created (just be sure to use the default URL that's suggested).





**IP address issues.**  If you close the server and reconnect to Jumpbox through a different IP address, you may need to rebuild your site for links to work correctly.





<img src="https://farm4.static.flickr.com/3138/2871764132_b1dafc9917.jpg?v=0" alt="Virtual Movable Type" title="" />





**FastCGI and Memcache?**  Both <a href="https://www.movabletype.com/download/virtual-mt-faq.html">MovableType.com</a> and <a href="https://www.movabletype.org/documentation/virtual-movabletype.html">MovableType.org</a> say that Virtual MT comes with FastCGI and Memcache installed, but the release notes seem to differ:



<blockquote>
  

Sun Aug 24 12:57:19 MST 2008 - 1.1.3
  - Updated MovableType to 4.21. MT no longer uses memcached and FastCGI.



  

Mon Aug  4 17:19:37 MST 2008 - 1.1.1
  - Updated MovableType to 4.12. MT now uses memcached and FastCGI. Due to a problem in MT and FastCGI, the JumpBox must be rebooted after a restore rom an earlier version. Instructions will be provided during the restore process.


</blockquote>

### Overall Impression




I can see Virtual Movable Type being useful in many cases:





**Demoing Movable Type to clients.**  Sometimes you either don't have internet access or don't have a fresh install of MT set up when meeting with prospective clients.  Running MT as easily as a desktop app makes it much easier to show off.





**Sandboxing and development.**  Being able to create a virtual clean slate for testing is extremely valuable and far less risky than testing live (take it from someone who knows, right <a href="https://twitter.com/djacobs">@djacobs</a>?).  Couple that with Movable Type's powerful export feature and Jumpbox's powerful backup feature (Jumpbox provides a way for users to specify which files or directories get backed up with their backup tool).





Despite a few minor quirks, this is a **very** solid achievment by the Six Apart and Jumpbox team.  All of the freedom of having a dedicated server with Movable Type preinstalled and finely tuned and none of the pain of setting it up.



		