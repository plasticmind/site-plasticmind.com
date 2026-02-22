---
title: "Linux Disk Space Paradox"
date: 2013-07-31 09:59:35
archive: true
excerpt: 
subtitle: 
slug: linux-disk-space-paradox
featured_image_url: 
alt_text: 
primary_category: "Code"
categories: ["Code"]
tags: ["linux", "shell"]
meta_description: 
context: professional
fix: false
hits: 252
---


			

Our server crashed the other day because the disk was full.





I quickly discovered a rogue bandwidth log file not getting cleaned up was to blame, so I deleted it.  Strangely, running <code>df</code> after deleting the file showed that 100% of the disk was still in use even though I had gotten rid of the biggest space hog. Perhaps there was something else I was missing?  





I ran the following command as root to list top 25 largest files/directories:



<pre><code>du -a / | sort -n -r | head -n 25
</code></pre>



But nothing was even close to the size of that bandwidth file.





Thankfully, I came across <a href="https://serverfault.com/a/133004">this great Stack Exchange post</a> which cleared up the mystery.  If you delete a file while it's being written to, the file gets unlinked; but until the process that's writing to the file gets stopped, it doesn't actually get removed off the disk.  Which means that if you run <code>df</code>, the disk appears full; but if you try to find the file using <code>du</code>, it's nowhere to be found.  Thus to <code>df</code>/<code>du</code> paradox.





I used the following command to look for unlinked files that were still open:



<pre><code>$ lsof +L1
</code></pre>



Once I found the process, I killed it, and the file was actually removed from the disk and I got my space back.





Mystery solved.



			<!--more-->

		