---
title: "A Better System for Passwords"
date: 2012-08-20 11:34:06
archive: false
excerpt: 
subtitle: "No one likes talking about passwords.  No one wants to give away secrets to the bad guys, and no one wants people becoming lemmings and copying their system exactly.  I'm going out on a limb here and making some suggestions that will help you make your passwords more secure.  Don't be a lemming, please."
slug: better-passwords
featured_image_url: https://plasticmind.com/wp-content/uploads/2012/08/chain.jpg
alt_text: 
primary_category: "Users"
categories: ["Users"]
tags: []
meta_description: "A simple system for keeping passwords secure, unguessable, and most importantly, unique."
context: professional
fix: false
hits: 6120
---

For years I used passwords that were the real-world equivalent of hiding my wallet in my shoe at the beach. Passwords from favorite video games. My last name and the two digits of my birth year. The word “password” backwards. In the words of Seinfeld, “What kind of criminal mastermind would it take to break through that impenetrable fortress of security?”

Now I have a pretty simple system for keeping my passwords secure, unguessable, and most importantly, unique.

**It breaks down into three parts: a random key, context and a formula.**

<!--more-->

<h3>The System</h3>

I’ll break each part down, then I’ll give some examples. I think it goes without saying that this is not my exact method, but the principles apply.

**Start with a random key.** This can be anything, but make it something as unguessable as you can handle. You can also take <a href="https://xkcd.com/936/">the XKCD approach</a> and pick a string of nonsense words. Don’t worry too much about forgetting it. You’ll be using it everywhere and muscle memory will kick in shortly.

**Next, consider the URL.** What URL is this password is being generated for? If it isn’t for a web service, then pick whatever the dominate name in context is. For example, if this is for a game, use the name of the game. If it’s for wifi, you could use the SSID. If this is for your local computer, you can use the computer name or the name of your hard drive. If it’s for your email, you could use the domain name associated at the end of the email address (e.g. foo@yahoo.com, you’d use yahoo.com).

**Finally, the formula.** The secret here is to create a formula based on a combination of the random key and the primary name in context. You might choose to start with the first three letters of the name, then an underscore, followed by your random key. You might want to be a bit more obscure and take the first two and last two letters of the name and enter them in reverse order with the random key and three exclamation points appearing at the front. If you’d really like to keep things obscure, you could take the first three characters of the name and bump up their values by one, so ‘yah’ would become ‘zbi’. **The key here is to come up with your own formula.** This might sound complicated; but once you’ve memorized that random key and the formula becomes second nature, you’ll be a password machine.

The beauty of this system is that if someone hacks one of your accounts and gets your password, they’ll have a single, unique password that’s not useful anywhere else. And if you do need to go through and change your passwords (which you should do from time to time), you can either change the formula or change the key. This means that old passwords long forgotten are only a formula or random key away from being restored.

<h3>Examples</h3>

Let’s go through some examples so you can better envision what I’m talking about. **Please do not use these; they are only patterns.**

<h4>Example 1: A Simple Formula</h4>

Your random key is **stone13washed**. Your formula is to take last four characters of the name and split them on either side of your key with exclamation points.

<ul>
    <li>Creating a password for your Yahoo Mail (mail.yahoo.com). Final password: **ah!stone13washed!oo**</li>
    <li>Creating a password for your Adobe Creative Cloud account (www.adobe.com). Final password: **do!stone13washed!be**</li>
</ul>

<h4>Example 2: A Complex Formula</h4>

Your random key is **tbatstdg&amp;gitw** (first letters of the words in the first line of a famous poem, any guesses?). Your formula is to take the the first two letters of the name, add 1 to their value, enter those followed by two letters of the random key, then the last two letters of the name with the added values, followed by the rest of the key.

<ul>
    <li>Creating a password for your Gmail account (mail.google.com). Final password: **hptbmfatstdg&amp;gitw**</li>
    <li>Creating a password for your 9rules account (www.9rules.com). Final password: **0stbftatstdg&amp;gitw**</li>
</ul>

<h3>Provisos</h3>

Two notes and an important warning:

First, you’ll run into some older sites from time to time that limit the characters or length of your password. For example, you might use an ! in your formula, but your bank won’t allow that in passwords. I recommend coming up with a systematic way of dealing with these sites (e.g. swapping out exclamation points for the number 1 or removing them altogether).

Second, you may also run across sites like Gmail or Twitter where you might need multiple passwords for the same domain. In this case, I’ve taken to adding a another layer to the formula based on the account I’m creating (e.g. perhaps the first there letters of the Gmail account name or Twitter user name).

Finally, the major danger of this system is that **your vulnerability is your formula**. Don’t give away your formula and keep the formula obscure enough that it can’t be discovered by simply looking at a password (e.g. yahoo+randomkey = bad). I recommend using an entirely different formula for highly sensitive sites like your online bank or server root passwords.

<h3>Related Reading</h3>

<ul>
    <li><a href="https://gizmo.do/dQcOJ4f">Gizmodo: Why We’re Losing The Password War</a></li>
    <li><a href="https://arstechnica.com/security/2012/08/passwords-under-assault/">ARS Technica: Passwords Under Assault</a></li>
</ul>