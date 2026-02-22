---
title: "T-Mobile Hotspot @ Home Troubles"
date: 2008-01-17 18:20:33
archive: false
excerpt: 
subtitle: 
slug: t-mobile-hotspot-home-troubles
featured_image_url: 
alt_text: 
primary_category: "Gadgets"
categories: ["Gadgets"]
tags: ["dd-wrt", "linksys", "t-mobile", "tomato", "troubleshooting", "uma", "wifi"]
meta_description: 
context: personal
fix: false
hits: 241
---


			

<img src="https://plasticmind.com/assets/tmobile.jpg" alt="" />





I spend **hours** at a time on conference calls, which can be problematic since I&#8217;ve only got a cell phone.  Those 3 hour support calls with clients can really gobble up those minutes.  I had been running Vonage, but that just didn&#8217;t work on <a href="https://plasticmind.com/miscellany/i-hate-verizon-vonage-and-comcast-or-erego-ergo-sum/">so many different levels</a>.  In fact, the only solution I&#8217;d found up until this point was just to keep upping my minute plans; only trouble was that it required a renewal of my contract.  Ugh.





Suddenly, I&#8217;m talking with my T-Mobile rep and he&#8217;s telling me about this <a href="https://www.theonlyphoneyouneed.com/">Hotspot @ Home service</a> that lets you make free, unlimited calls over a wireless network that will seamlessly transfer to cell towers when the wifi signal is gone.  **Pure genius.**  I dropped my minutes and signed up for this add-on service ($30/month more, comparable to the money saved by dropping minutes).





**All was well, until the router started dropping my calls.  Often.**  This was extremely puzzling and frustrating, especially since I&#8217;ve read nothing but <a href="https://gadgets.boingboing.net/2008/01/11/tmobile-hotspothome.html">rave reviews</a> for the service <a href="https://www.oreillynet.com/etel/blog/2007/08/review_tmobile_hotspothome_thu.html">all over the place</a>.  I&#8217;d answer the phone and I couldn&#8217;t hear the person on the other end, even though they could hear me.  I&#8217;d constantly have to the phone off and back on again.  Often it stated the security code was wrong even though it worked again 5 minutes later.  Sometimes, I&#8217;d even be in the middle of a phone call and it would just turn off completely, without warning&#8212;up to 7 or 8 times a day.  Completely unacceptable, especially with a business.





**At first, I thought my problems came from not getting their T-Mobile router.**  But most reviewers said that it wasn&#8217;t necessary.  After all, it can run on any wifi connection.  And I was running a Linksys wireless router that looked virtually the same as they one they were selling.





But after <a href="https://hardware.mcse.ms/message14506.html">a little research</a>, I discovered that I was running the Linksys WRK54G, an &#8220;economy&#8221; version of their famous blue-black router with a reduced chipset and less memory that&#8217;s prone to locking up and needing to be rebooted.  Turns out that you can&#8217;t even install third-party firmware (like <a href="https://www.polarcloud.com/tomato">Polarcloud&#8217;s Tomato</a>) onto it.  **In a nutshell, I had a lousy router.**





**So I went back to the T-Mobile store and picked up their router.**  I checked the product version on it: WRT54G-TM, which is actually just a custom T-Mobile off-shoot of their beefy WRT54G line.  In fact, a little forum diving revealed that <a href="https://www.dd-wrt.com/phpBB2/viewtopic.php?t=17817&amp;postdays=0&amp;postorder=asc&amp;start=0">most hackers are ga-ga over the new TM model</a> because it&#8217;s got a whopping 32MB of RAM and 8MB of flash ROM.  Unfortunately, it&#8217;s got built-in protection against third-party firmware&#8230; if you try to upload something like <a href="https://www.polarcloud.com/tomato">Tomato</a> or <a href="https://www.dd-wrt.com/dd-wrtv2/index.php">dd-wrt</a>, it pulls a backup from the flash memory and resets everything to defaults.  The only way to get around this and install your own custom firmware is to actually create a jtag cable that you solder in to clear the flash out to prevent it from reseting to the default (though there is <a href="https://www.dd-wrt.com/phpBB2/viewtopic.php?p=131424#131424">talk of a non-jtag solution</a>).





All of that to say, this is a much heftier router; there&#8217;s nothing magic about the fact that T-Mobile is offering it.  It simply automates the process of connecting to your phone instead of needing to set it up manually. However, I&#8217;ve not had any reset problems since buying the new router (which is basically free with a rebate from T-Mobile), and I suspect it has a lot to do with the fact that the WRT54GT line puts out a stronger signal and has much more reliable uptime.  The only trouble I had was forgetting to reboot my phone after setting it up with the network.





**In the end, the service wasn&#8217;t really to blame.  A router with a weak signal that couldn&#8217;t stay connected was the real culprit.**  Hopefully, this helps save some people time and frustration.  I&#8217;ll be sure to keep this entry updated if I discover anything more.



			<!--more-->

		