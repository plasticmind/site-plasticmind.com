---
title: "Are You Being Crawled?"
date: 2005-02-15 06:07:55
archive: true
excerpt: 
subtitle: 
slug: are-you-being-c
featured_image_url: 
alt_text: 
primary_category: "Blogging"
categories: ["Blogging"]
tags: []
meta_description: 
context: professional
fix: false
hits: 90
---


			

I've noticed that much of my web traffic has come from Google and MSN bots crawling my site - they count for almost fifty percent of my traffic!





So I found <a href="https://www.phphacks.com/">this interesting script</a> that you can include on your site that will email you a notification everytime a googlebot crawls your site:


			<!--more--><pre><code>if(eregi("googlebot",$HTTP_USER_AGENT)) {
	if ($QUERY_STRING != "")
		{$url = "https://".$SERVER_NAME.$PHP_SELF.'?'.$QUERY_STRING;}
	else
		{$url = "https://".$SERVER_NAME.$PHP_SELF;}
	$today = date("F j, Y, g:i a");
	mail("you@youremail.com", "Googlebot detected on https://$SERVER_NAME", "$today - Google crawled $url");
}</code></pre>
		