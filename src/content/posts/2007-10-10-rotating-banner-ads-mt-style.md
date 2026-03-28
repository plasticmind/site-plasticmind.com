---
title: "Rotating Banner Ads MT Style"
date: 2007-10-10 11:29:43
archive: true
excerpt: 
subtitle: 
slug: rotating-banner-ads-mt-style
featured_image_url: 
alt_text: 
primary_category: "Web Development"
categories: ["Web Development"]
tags: ["cms"]
meta_description: 
context: professional
fix: false
hits: 290
---

**10/10/2007: Updated for Movable Type 4.x**

A recent customer asked me if they could have an easy to manage banner ad setup, with the ability to add advertisements and specify links and alternate text. All of this while being able to manage them easily. Sounds like a job for… Movable Type!

Despite the title, this little tip can be used for any ads—any images at all for that matter. There are four basic steps: upload the ad, create an entry for it, create the php file and include it in your template.

<!--more-->
#### The Ad Blog

First things first—let’s create a brand new blog called “Banner Ads”; you can call it something else, but you’ll need to remember it for later, so whatever it is, write it down.

To keep things organized, I’m going to set my publishing directory to /ads/. Once you decide on a directory, you’ll need to make note of it and upload all of the images in your rotation to the same directory. This isn’t *required*, but as we go on you’ll understand how it can make your job easier.

Go to **Design » Templates** and delete everything. Be sure to get the archive templates and template modules; no sense in having them sitting around taking up space. We’ll come back here in just a moment to create a new template, but first let’s create and upload our ad.
#### The Image

You’ll need to decide what size ads or images you’ll be using here. For sake of example, I’m going to create a banner in Photoshop using a standard banner ad size of 468x60 pixels.

Now, click **Create » Upload File**. Movable Type’s asset manager will walk you through the upload process. Once the file is uploaded, make note of its location. Now it’s time to create a new entry.
#### The Entry

In the title field, give your ad a name. This is going to be the TITLE text for your banner ad link. Next we’re going to use the Body field for your path and file name of your image. (To do it right, get Arvind’s Custom Fields plugin and set up an actual Image field. This saves from headaches down the road.) This filename can be relative to your site (i.e. /car*donate.gif) *or a full URI (https://plasticmind.com/images/header.jpg) The Keywords field will be the hyperlink (destination) that visitors will be taken to when they click your ad. This can be relative to your site* (i.e. /support/donate*your_car.html) or a full URL (i.e. https://plasticmind.com/). Ideally, this field should also be customized in RightField as well.

Save the entry.
#### The PHP File

Now let’s go to Templates and create a new index template called “Banner Ads”—this will be the PHP file that will generate the rotation and we can call to it from our other templates. We’ll set the output file to “banner.php”. Now let’s drop the following code into the template, save and rebuild it:
<pre><code>&lt;?php
    &lt;mt:Entries&gt;
        $ad[&lt;mt:EntryId /&gt;]['pic']='&lt;mt:EntryBody strip_linefeeds='1' encode_php='1' /&gt;';
        $ad[&lt;mt:EntryId /&gt;]['link']='&lt;mt:EntryKeywords strip_linefeeds='1' encode_php='1' /&gt;';
        $ad[&lt;mt:EntryId /&gt;]['title']='&lt;mt:EntryTitle encode_php='1' /&gt;';
    &lt;/MTEntries&gt;
    $rn = array_rand($ad);
    echo '&lt;a href="' . $ad[$rn]['link'] . '" title="' . $ad[$rn]['title'] . '"&gt;';
    echo '&lt;img src="'.$ad[$rn]['pic'] . '" alt="' . $ad[$rn]['title'] . '"&gt;&lt;/a&gt;';
?&gt;
</code></pre>
It looks complicated but isn’t. Basically, the <code>&lt;mt:Entries&gt;</code> container will loop through as many banner ad entries you have. For each one it will create a variable ($ad) with an array based on the entry id. In this array, we’re storing the ‘pic’ (file path), the ‘link’ (destination url) and the ‘title’ (ad title). We’re using the strip_linefeeds=’1’ attribute when building this to ensure that no stray <code>&lt;p&gt;</code> or <code>&lt;br /&gt;</code> tags get into your image path or your hyperlink. That causes weird things to happen.

Then we pull a random ad from the array and echo (or print) two lines of code. The first line is your hyperlink, with the href set to the ad’s ‘link’ (made up of <code>&lt;mt:EntryKeywords /&gt;</code>) and the title set to the ad’s ‘title’ (made up of … you guessed it! <code>&lt;mt:EntryTitle /&gt;</code>). The next line is the image, with the src set to the ad’s ‘pic’ (the file path stored in <code>&lt;mt:EntryBody /&gt;</code>) and for good measure we’ve set the alt to <code>&lt;mt:EntryTitle /&gt;</code>.

Save and rebuild and you’re ready to test it. Type in your domain and the file name you gave it (i.e. https://www.rideforlife.com/banner.php) to see it in action. You should get a random hyperlinked image. Almost done.
#### Including It In Your Templates

This is cake. Wherever you want your rotating banner ad to appear, simply include the banner.php file you created. The following code is an example:
<pre><code>&lt;div id="bannerad"&gt;
    &lt;?php include '/home/USERNAME/www/ads/banner.php' ?&gt;
&lt;/div&gt;
</code></pre>
You can pull a full URL in the include, but it’s much slower and causes considerably more work for the server. Best to include the full site path to your file.

Rebuild and test her out!
#### Troubleshooting

Something wrong?

If you ran your banner.php on its own and didn’t work, you probably aren’t running php. Sorry, this solution isn’t for you. Probably best to type ‘server side includes’ in Google and try your luck there.

If you ran banner.php on it’s own and it did work, but it’s not working in your template, you may have called to it incorrectly. If the php code itself is being displayed instead of the image, your server isn’t executing the php, and you need to read about <a href="/templates/a-more-graceful-template-modul/">my solution for that on this post</a>.

Not sure what your site path is? Well, MT has a tag for that. <code>&lt;mt:BlogSitePath /&gt;</code> or you can just look in your Publishing settings… it’s listed there as well.