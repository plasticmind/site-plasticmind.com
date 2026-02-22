---
title: "Automated Style Sheets"
date: 2006-06-28 13:29:05
archive: true
excerpt: 
subtitle: 
slug: automated-style-sheets-1
featured_image_url: 
alt_text: 
primary_category: "Movable Type"
categories: ["Movable Type"]
tags: []
meta_description: 
context: professional
fix: false
hits: 178
---

I've always used Movable Type to manage my style sheets. I'm a WebDev Extension junkie, so I typically tweak my CSS there and then copy/paste it into my style sheet template, save and rebuild. I've actually found this to be alot faster and easier (and far more dangerous) than saving it to a local file and ftp'ing it up to the server.

But I've actually come up with a simple technique that lets MT power your CSS, not just publish it. With the addition of some MT tags in your style sheet, you can let MT handle automation just like it does in your html files.

#### The Basics: Why?


To best explain how it's done, let's talk about the why first. I wanted to allow a client to upload an image for a product that would be used on the individual entry archive. Now, the traditional way of doing this is to either use the "Upload File Popup" and include it in the entry or to have them FTP an image and put the path in one of the extra fields on the entry page. Then the image would either appear as part of the entry body or you'd specify the image source with "These are both fine ways to place tags on a page.

But I didn't need an tag. I needed this image to be the background image for a div. I wanted to be able to put a hyperlinked "Purchase This" over the image as well as some other dynamic text. Essentially, I needed to be able to supply this background image in the edit entry screen, but still have the ability to use it in my stylesheet. Instead of manually adding a CSS id every time I added a product, I decided to automate it.

#### First Things First: Get RightFields


There are other ways to associate an image with a specific entry, but by far the easiest and most straightforward is <a href="https://www.staggernation.com/mtplugins/RightFields">Kevin Shay's RightFields plugin</a>. RightFields is an internal plugin that allows you to change the look and functionality of the entry screen. What we're going to use it for in this example is to change our Extended Entry field into a "Product Image" upload field. This will allow us to select an image for this particular product. Instructions for plugin installation can be found <a href="https://www.staggernation.com/mtplugins/RightFields#Installing">at Staggernation, Kevin's website</a>.

At the RightFields plugin settings screen, choose the blog you'll be working with. (Keep in mind, this changes the entry screen for the entire blog, so it's best to setup a blog specifically for products and make these changes to that.) We're not adding a whole host of fields, so we can just edit the "Extended Entry" label to read "Product Image". We'll set the type to "File", and specify the upload path. Keep in mind, this is the upload path, much like the path entered in your blog's publishing settings, so it will probably look something like "/home/yourusername/public_html/images/". I've chosen images because that's the path that I want the images to be uploaded to. The url path is what the public would see, for instance "https://www.mydomain.com/images/". Let's set the filenames to "dirify" and check "Uploads overwrite existing files" (though you can handle this however you'd like). While you're in here, you may want to change the

Now save the changes and create a new entry. You'll notice that the fields have now been customized, and you can easily choose an image for this Product.

#### Next Stop: CSS and the General DIV Class


In this example, we're going to use the uploaded image as a background image for our div. To keep the size of our style sheet down, lets divide up the styling of our "Product" div. All of the general styling will be put in a single class, while the background image definitions will be specific id's.

So our general css class would define the shared properties of our "Product" div:

<pre><code>.product {    
    width: 400px;    
    height: 300px;    
}</code></pre>

We can also define the shared properties of any nested html elements (season to taste):

<pre><code>&lt;div class="contentbox"&gt;&lt;code&gt;.product p {
font-weight: bold;
color: #ff0;
margin: 100px 15px 15px 150px;
}
.product a {
color: #ff0;
text-decoration: none;
}
.product a:hover {
text-decoration: underline;
}&lt;/code&gt;&lt;/div&gt;</code></pre>

We will assign this .product class to our "Product" div in just a moment.

#### Moving On: Getting Specific With It


This next part is where the magin happens. Since Movable Type is publishing the style sheets along with the rest of the entries, we can make them talk the same language. We'll use the &lt;$MTEntryID$&gt; as the title of our #id. Normally, I avoid the entry ID like the plague because it's ugly and hard to remember; but it really doesn't matter now because MT is creating the style sheet as well as the pages that will be calling to it. So we'll let MT handle the dirty work.

Let's put this in our style sheet:

<pre><code>/* Product Image Replacement  */    
&lt;MTEntries category="Products"&gt;
#product-&lt;$MTEntryID$&gt; {
background: url(/images/&lt;$MTEntryMore$&gt;);
}
&lt;/MTEntries&gt;</code></pre>

It's simple. Movable Type will loop through and create a unique ID for each product we've added to our "Product" category, complete with the background image that was uploaded. (You can add alignment or repeat functions to the end if it's applicable.)

#### The Grand Finale: Getting Your Templates on the Same Page


Now, all that's left is to set up the html in your templates correctly. We'll set up our id the same way we did in our style sheet to ensure correct match-up:

<pre><code>&lt;div class="product" id="product-&lt;$MTEntryID$&gt;"&gt;
    &lt;p&gt;&lt;a href="buyme.cgi" title="Buy &lt;$MTEntryTitle$&gt;"&gt;Buy Me!&lt;/a&gt;&lt;/p&gt;
&lt;/div&gt;</code></pre>

If all is well, (be sure you've put this code in either the context of an MTEntries loop or on an individual entry archive page!) you should see your text laid out against the image you supplied for that specific entry.

Tune in next time for an article about using RightFields, MTImageEmbed, SlideShowPro and MT to create an out-of-the-park photoblog.

#### Two Important Asides


Use included CSS. One of the first things that annoyed me about this approach was I kept copying and pasting CSS over my MT template code. The solution is simple... create a new index template with just the MT generated CSS in it. Then include it in your current stylesheet. Not only do you avoid the hassle of copy/paste errors, you also speed up rebuilds since MT doesn't have to rebuild your entire CSS file. (Thanks to <a href="https://www.thenorwoodhome.com">Mark</a> for the suggestion!)

Regarding varying image sizes. This example only works with the same size images for each product. This allows you to specify a fixed height and width in your product class and just supply the image in your id. If you do want variable image sizes in your stylesheets, you'll need to specify them in your id, and you'll have to use <a href="https://www.bradchoate.com/weblog/2002/08/07/mtembedimage">Brad Choate's MTEmbedImage plugin</a> to get the height and width of the image.