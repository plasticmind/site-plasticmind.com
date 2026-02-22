---
title: "The Social Graph in Plain Language"
date: 2007-09-20 13:11:29
archive: true
excerpt: 
subtitle: 
slug: social-graph-defined
featured_image_url: 
alt_text: 
primary_category: "Social Networking"
categories: ["Social Networking"]
tags: ["facebook", "openid", "opensnap", "portability", "social graph", "social networking", "standards"]
meta_description: 
context: professional
fix: false
hits: 748
---

David Recordon over at Six Apart just published an article called <a href="https://www.sixapart.com/about/news/2007/09/were_opening_th.html">We Are Opening The Social Graph</a>. It explains the company’s goal of using OpenID and some other non-proprietary technologies to help make your “social graph” an open platform.

Have I lost you? Let’s start again.

**Let’s talk about how annoying it is to have to remember new login information and find your friends all over again for each new social network you join.**

<img src="https://plasticmind.com/assets/openid.png" alt="openid.png" width="508" height="276" />

<!--more-->
### OpenID: Own Your Identity

First, let’s start with <a href="https://openid.net/">OpenID</a>. With the rapid increase of sites that require you to login these days, it’s becoming difficult to keep track of login information. What’s particularly dangerous is that often people use the same user name and password for all of the different sites they log into (guilty). We’re human, it’s hard to remember this stuff. But what happens when you set up an account with InnocentLookingMaliciousIntent.com using the same user name and password as you use for your Gmail account? Suddenly, bad guys have access to your email account (and Paypal account, and Flickr account, ad nauseum).

Now, one solution is to use a different password for each site. That’s fine if you’re Rain Man. But the rest of us humans can’t remember 45 different logins. So what do we do? We use the same user name and password. “Oh, don’t worry,” you say, “my password is really long!” Doesn’t matter. Your password could be a string of 255 letters, numbers and symbols and it wouldn’t make a difference; if you’re using it for every new site you sign up with, you’re giving that password away. Every time you give that password away, you’re trusting someone with it. And as trustworthy as they may be, you never know when they might get hacked. Or have their records stolen. Or sell it to someone else. You get the picture.

Enter OpenID. Here’s how it works. You have a website that you trust with your user name and password. Let’s say it’s <a href="https://www.vox.com">Vox</a>. I have a Vox account that knows my user name and password. I want to comment on a friend’s blog, and this friend’s blogging software requires me to prove that I am who I say I am before I can post. Now, I’ve trusted Six Apart with those particular login details, but I really don’t want to create another login for my friend’s blog. So what do I do? Well, fortunately, his blogging software supports OpenID. All I have to do is put my Vox url in the box and behind the scenes his site talks to Vox and checks to make sure I am who I’m claiming to be. And it’s not just Vox. Any site that authenticates (makes you login) and supports OpenID can be used. You can even set up your own OpenID server. In fact, to make life even easier, you can simply point to the OpenID server of your choice in the header of your website (<a href="https://simonwillison.net/2006/Dec/19/openid/">Simon says</a>). Then you can just use your web address as your authenticating server. Simple.

Now, if only we could do that with all our social network information.

<img src="https://plasticmind.com/assets/opensnap.png" alt="opensnap.png" width="508" height="276" />
### OpenSNAP: Own Your Connections

Before I start, let me just say that since this technology doesn’t have a name, I’m picking one arbitrarily. OpenSNAP (Social Network Asset Portability) seems fitting, so I’ll go with that. Now, where were we?

Oh yes. First, what is your social graph? Put simply, it’s your connections online. Now, in real life, you’re in the middle and all of your connections are at the center. However, with all of the different social networking tools out there (Ringo, Flickr, Facebook, Twitter, Vox, IM, etc.), the graph looks a whole lot more broken up. You’ve got 238 friends on Facebook, 47 people that you follow in Twitter, 13 contacts in Flickr and 36 people in your Vox neighborhood. And some of those friends/followers/contacts/neighbors are the same people; but each time you join a new social network, you’ve got to try to find your friends all over again. What you need is something that will “glue” all of your data from multiple social networks together. Opening up your social graph is all about about social network portability—the ability to take your profile, data and connections with you wherever you go, using the same principles as OpenID. (Initial focus is primarily on your connections.)

Several months ago Mark Zuckerberg, the founder of Facebook, made <a href="https://blogs.zdnet.com/BTL/?p=5156">this sweeping statement</a>: “Today social networks are completely closed nets…today we are going to end that. With this [framework] any developer worldwide can build full applications on top of the social graph inside the Facebook Platform.” It sounds so booming and prophetic, you could almost imagine Charlton Heston pronouncing it over the Red Sea. But the problem is that Facebook isn’t open. Your connections belong to you so long as you’re within the confines of Facebook. As soon as you try to leave (you can’t leave, you’ve been bitten by a werewolf!), your gigantic social graph stays put. Blech. This movement is driven by the philosophy that you should control your social network.

How it works is fairly straightforward, though it can get complex when thinking about all of the connections (which is why you often hear the word “graph” used, even though it’s technically incorrect). First, there’s the glue that hold all of your social network information (profiles, friends, etc.) together. Just like OpenID needs some authenticating server to identify you as you, so this OpenGlue would need some system (like Facebook) to store your profile and connections. (The exact specifications are <a href="https://microformats.org/wiki/events/2007-07-28-portable-social-networks-meetup">still being discussed</a>.) Then, there’s the system’s ability to cross-reference your connections with it’s own library of users and let you add them and let them add you. All you’d need to do is specify your OpenGlue server and the social network handles the discovery and connections.

Why is this such a big deal? Well, first, it’s a real hassle to update profiles and add friends across a plethora of social networks; and it will be even more difficult as more emerge. Here’s a sign of the times. I recently got a dialog in Facebook asking me to hand over my Google login and password so they could find friends I might be missing. That’s a whole lot of trust, no matter how many ponies and kittens they give me. That’s my Adsense account, my Analytics account, my Gmail account. All to help me discover connections I should already have.

But perhaps even more importantly, **it’s *your* data**. It shouldn’t be locked up in a proprietary system, no matter how good an API they’ve got.

For more information on social network portability, keep an eye on these people: <a href="https://bradfitz.com/social-graph-problem/">Brad Fitzpatrick</a>, <a href="https://daveman692.livejournal.com/310424.html">David Recordon</a> and <a href="https://adactio.com/journal/1328">Jeremy Keith</a>. And if you’re feeling brave, join <a href="https://groups.google.com/group/social-network-portability">the Google Group discussion</a> or check out <a href="https://bradfitz.com/social-graph-problem/social-graph.pdf">Brad’s slideshow</a> on the matter.