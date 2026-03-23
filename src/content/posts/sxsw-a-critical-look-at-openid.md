---
title: "SXSW: A Critical Look At OpenID"
date: 2008-03-10 09:46:05
archive: true
excerpt: 
subtitle: 
slug: sxsw-a-critical-look-at-openid
featured_image_url: 
alt_text: 
primary_category: "Journeys"
categories: ["Journeys", "Social Media & SEO"]
tags: ["sxsw"]
meta_description: 
context: professional
fix: false
hits: 258
---


			

Arguably one of the more interesting panels here at SXSW, *A Critical Look at OpenID* gave people the chance to ask a lot of question that as a non-developer I found relevant.





The panel opened with a helpful comparison of OpenID to email.  Your email address tells people something about you.  (@gmail.com tells people you use Gmail, @sun.com tells people you're a Sun employee.)  You can also use external services for email (Hotmail, Gmail, etc.) or you can run your own mail server.  Email is also essentially a single-sign on point of failure; if people get access to your email address, the can essentially use “Send a password reminder” emails and get access to your accounts. 





There are some business risks around OpenID.  People can create a virtually unlimited number of OpenID accounts; the solution seems to be around shared whitelisting.  For example, your blog could be set to allow only people with Twitter, Yahoo or AOL OpenID accounts.  You would be essentially saying, “I trust only Twitter, Yahoo and AOL logins.”  I'm still not sure that this is within the decentralized spirit of the protocol, but it's a realistic solution.





The sites that will currently benefit from OpenID: smaller sites that don't want to become trust providers.  Smaller companies shouldn't take on the hassle of being OpenID providers, because of the privacy liabilities that come along with storing people's information.  OpenID makes it simple for people to get started using your application without needing to create *yet another* login.  For instance, let's say your site gets featured by TechCrunch.  Suddenly you've got ten thousand people hitting your site.  If they have to create an account, they're probably not going to stick around; but if they can use their OpenID login to start using your application immediately, you're more likely to get people to stick around.





A good question from the audience: What about revocation?  If you give a site the authority to represent you, what happens when you want to revoke that authority?  This comes back to the issue of trust.  You probably shouldn't use a fly-by-night organization that may recycle usernames as your OpenID provider.





What's keeping people in the room from implementing OpenID?  David asked for a show of hands: Is it security, familiarity, usability or technology?  Most hands raised at usability.





So, the million dollar question for bloggers: Will OpenID help fight comment spam?  Yes and no.  Spammers can create as many OpenIDs as they want.  Shared whitelists of OpenID providers, however, seems to be the best workable solution.



			<!--more-->

		