---
title: "Tinychat Pro Regrets"
date: 2009-09-25 06:22:43
archive: true
excerpt: 
subtitle: 
slug: tinychat-pro-regrets
featured_image_url: 
alt_text: 
primary_category: "Reviews"
categories: ["Reviews"]
tags: []
meta_description: 
context: professional
fix: false
hits: 2532
---


### Introduction




I started this post out as a fan of Tinychat.  Being able to create a virtual room with a button press felt a lot like what Twitter did for miniblogging—streamline and simplify an obvious need.





Sure, it has it's annoyances. The Flash-based text chat is slow, unresponsive, jumpy and hard-to-read, making it nearly impossible to effectively follow a conversation.  Lack of support for standard UTF-8 characters is annoying.  The room controls are sometimes unreliable (mute doesn't always mean mute, volume indicator frequently incorrect) and sometimes outright maddening (camera/sound selection wonkiness).  But the tagline for Tinychat is, “your own chatroom, simple and easy”—and that it does well.





So well, in fact, I use it constantly, despite it's flaws.  I've used Tinychat to forge new relationships and share ideas with designers and developers I respect.  I've even used it to organize family webcam gatherings.  It's been a useful tool for connection with other.





So today I decided to take the plunge and try out a pro account, specifically so I could play around with the API.  I went to the site to sign up—and this is where things start to go downhill…



			<!--more-->### Login Headaches




The link to a purchase pro account is far from obvious.  There's a “signup/login to pro” link that doesn't really scream “purchase” or “upgrade”, but since that's the only even slightly-related link on the front page, I clicked it.  It was asking me to create an account, which I attempted, but then was rejected because I was being told my email was already in use.  Ah yes, I went through this a few weeks back when I wanted to check on the price (let me save you the hassle: $14.95/month).





I tried logging in, but none of my passwords were working, so I requested a reminder email for my lost password.  I tried using plasticmind as the password, with no success.  Fortunately, I was able to enter my email address. To my surprise, the email I received told me my account username was “jesseplasticmindcom”.  Uh… I would never have willingly chosen that username.  I'm guessing that the @ and . were stripped from the email when I registered the first time around; how I would have known that is anybody's guess.  Oh, and almost forgot to mention: the password change screen instructed me to wait two minutes **after** changing my password to attempt a login (to let the database gnomes flip all the relevant switches I'm guessing).  I'm not making this up (well, except for the gnome part).





Finally, I was able to log in.  I purchased the Pro account pretty easily through Paypal (no other payment options available) and was then redirected back to my Membership Information page:





<a href="https://www.flickr.com/photos/plasticmind/3952701771/"><img src="https://farm4.static.flickr.com/3429/3952701771_4ec3eb16e2.jpg" alt="Membership Information Page" title="" /></a>



### Room Creation Headaches




What struck me as odd here was that I had two memberships—one free, one premium (the premium shows as cancelled because I took this after I had cancelled).  I didn't think much of it, so I went to the My Rooms section.  I was currently broadcasting at https://tinychat.com/awesome/ so I thought I'd try to claim that room.  The result was reminiscent of the infamous blue screen of death: 





<a href="https://www.flickr.com/photos/plasticmind/3953491230/"><img src="https://farm4.static.flickr.com/3487/3953491230_e4ebd1f26e.jpg" alt="TinyChat Fail" title="" /></a>





Nothing like having your MySQL hanging out for God and everyone to see.  I tried some harmless MySQL injections to test their security (white hat, I promise!), but it seems like they're at least using <code>mysql_real_escape_string()</code> to filter input.  I tried several other room names thinking it was a glitch, but I got this ugly error every time unless a room name already existed, in which case I just a nicely formatted note.





Next, I jumped over to the Misc. menu, thinking maybe I'd find something relevant there. Uh… test?





<a href="https://www.flickr.com/photos/plasticmind/3953504906/"><img src="https://farm4.static.flickr.com/3514/3953504906_345a83f681.jpg" alt="Test?" title="" /></a>



### More Login Headaches




Finally, I decided I'd just join a room and login with my pro account.  Maybe then I could take control from within the room.  Unfortunately, I couldn't log in.  I tried using my email address and password like it was asking me for.  Nothing.  So I though perhaps it wanted my disfigured username “jesseplasticmindcom”.  Still nothing.





I jumped back to my membership area and noticed that I was still logged in and still getting those unsightly MySQL errors.  I logged out and logged back in with my username and password.  The exact same password which did not work inside the room.  



### Support?




I looked for a support link, but the only relevant link I could find was to the Tinychat blog.  Frustrated, I thought, “Maybe they've at least got user feedback and company response there.”  What I saw was not reassuring:





<a href="https://tinychat.wordpress.com/"><img src="https://farm4.static.flickr.com/3463/3953532328_fcedbdec6d.jpg" alt="Unsightly?" title="" /></a>





Granted, the link in the footer of their standard site takes you to the new blog, but the member's area footer still points to the old, frightening blog.  Not very reassuring to users who are having problems.  When I did make it to the blog, I noticed the last real activity almost two months ago and even the most recent tweet was nearly three weeks ago.



### Conclusion




First, to be fair, I did not email support, so I can't speak to how quickly they respond to trouble tickets; though I never received any response to the tweet I sent to their <a href="https://twitter.com/tinychat/">@tinychat</a> Twitter account.





I'm going to keep using the free Tinychat; despite its frustrations, having a disposable, scalable, video chatroom at my disposal is handy.  But needless to say, I unsubscribed pretty quickly, and if my experiences are at all the norm, I'd say save yourself the $14.95 and avoid that pro membership until they get some of these issues straightened out.





Oh, and if anyone is looking to do what they're doing, only with css, html and javascript?  Let me know, it would be killer.



		