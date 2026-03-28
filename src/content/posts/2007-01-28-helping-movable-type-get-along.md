---
title: "Movable Type and Slide Show Pro"
date: 2007-01-28 23:05:35
archive: true
excerpt: 
subtitle: 
slug: helping-movable-type-get-along
featured_image_url: 
alt_text: 
primary_category: "Design"
categories: ["Design", "Web Development"]
tags: ["cms"]
meta_description: 
context: professional
fix: false
hits: 416
---


			

Unfortunately, trying to create a photo album with Movable Type is less than simple.  Integrating photos into your blog feels like the days when dinosaurs roamed the earth.  One great solution is Byrne's <a href="https://www.majordojo.com/projects/photogallery.php">Photo Gallery Plugin</a>, but that's more of an 'out of the box' solution.  Here we'll walk you through some extremely useful techniques that give you complete control over what happens to your images and how Movable Type spits them out.


			<!--more-->#### Ingredients:




What you need to make the magic happen:



<ul>
<li><a href="https://www.staggernation.com/mtplugins/RightFields/">RightFields</a></li>
<li><a href="https://www.bradchoate.com/weblog/2002/08/07/mtembedimage">MTEmbedImage</a></li>
<li><a href="https://cpan.uwinnipeg.ca/module/Image::Magick">Image::Magick</a></li>
<li><a href="https://www.slideshowpro.net/">SlideshowPro</a> (optional for Flash slidedow)</li>
</ul>

#### The Concept




Let's first discuss what will be happening before we actually get started.  





First, we're going set up <a href="https://www.staggernation.com/mtplugins/RightFields/">RightFields</a> to allow photo uploads directly from the new entry screen, eliminating the need for the upload file popup.  We'll also be able to customize the fields specifically for our photos: photo title, photo caption, etc.  One of the frustrating things about <a href="https://www.staggernation.com/mtplugins/RightFields/">RightFields</a> is it's lack of ability to create thumbnails.  Once the photo is added to the entry, the automation magic is all handled by MTEmbedImage, a poorly documented but amazing little gem of a plugin by Brad Choate.  MTEmbedImage lets us specify a thumbnail size in our templates and then generates the thumbnail to spec via Image::Magick (if it doesn't already exist on the server).  We can then use the thumbnail wherever in our templates we'd like.





The final touch is then setting up MT to publish an XML file containing all the photos, captions and links that <a href="https://www.slideshowpro.net/">SlideshowPro</a> can parse.  The end result is a complete local slideshow solution with panache comparable to Flickr.



#### Step 1: <a href="https://www.staggernation.com/mtplugins/RightFields/">RightFields</a>




Our first order of business is setting up <a href="https://www.staggernation.com/mtplugins/RightFields/">RightFields</a> to make adding photos simple.  The instructions for RightFields are well written, so you shouldn't have much problem installing and setting it up.  Once you've got RightFields installed, simply go to the 'New Entry' screen and choose "RightFields settings: Standard Fields" at the very bottom of the page.  This will let you customize the standard fields to fit our photo album needs.





(Note: You can also do this with RightFields Extra Fields settings, but Kevin's documented it well enough to figure that part out on your own.) 





Let's change the Title field to "Photo Title", the Entry Body field to "Photo Caption" and finally, the Keywords field to "Photo File".  Make sure you keep the type the same for the first two, but for the Photo File we're going to change the type to "File".  Several options will appear:





**Upload path** - This is the "site path" where you want the files uploaded.  (i.e. /home/username/public_html/photos/)  If you're not sure what this is, check out your Site Root under Settings &raquo; Publishing.  It's a good idea to make this a subdirectory (i.e. /photos/) so that all your uploaded photos don't get dumped into your site root; this makes maintenance later on much easier.





**URL path** - This is the full url of the directory where your files are uploaded.  (i.e. https://www.mydomain.com/photos/)  Again, a quick glance at your publishing settings will give you the starting point.





**Filenames** - Keep, dirify, id or basename; Keep leaves the name of the file you've chosen as is, dirify applies the standard MT dirification routines to it, id changes the name to the entry id number and basename uses the entry basename.  I prefer to keep it as close as possible to the name I've chosen, so I'm going to suggest dirify.





**Overwrite** - Self-explanatory; to reduce confusion I usually check this box.





Once you've make these changes, click "Save Changes".





(Note: RightFields appends each filename with the name of the field it was uploaded to in order to avoid naming conflicts.  Don't worry about it.)



#### Step 2: <a href="https://www.bradchoate.com/weblog/2002/08/07/mtembedimage">MTEmbedImage</a>




This part is the most crucial yet most difficult part, because the documentation on the <a href="https://www.bradchoate.com/weblog/2002/08/07/mtembedimage">MTEmbedImage</a> is sparse and it doesn't break with any usefull error messages, it just returns an empty spot in your file where the code was.  So be sure that you follow this part carefully; also, make sure you've got Image::Magick installed on your server (you can run mt-check.cgi to find out) or else you're just wasting your time reading this.





Let's start simple.  We'll create a stripped down block of code that you can put in any MTEntries container.  Here's the code:





<code>&lt;div class="entry"&gt;<br />
    &lt;h3&gt;&lt;a href="&lt;$MTEntryPermalink$&gt;"&gt;&lt;$MTEntryTitle$&gt;&lt;/a&gt;&lt;/h3&gt;<br />
    &lt;div class="entry-photo"&gt;<br />
        &lt;MTEmbedImage basename="[MTBlogName]photos/[MTEntryKeywords]" width="425" thumbsuffix="-425"&gt;<br />
        &lt;img src="&lt;$MTEmbedImageThumbFilename$&gt;" alt="&lt;$MTEntryTitle$&gt;" /&gt;<br />
        &lt;/MTEmbedImage&gt;<br />
    &lt;/div&gt;<br />
    &lt;$MTEntryBody$&gt;<br />
&lt;/div&gt;</code>





Let's look at what's happening here.  Everything's wrapped in an .entry div, and our entry title is placed in an h3.  Now we place our photo; we'll put it in a .entry-photo div for greater flexibility.  We open the MTEmbedImage tag with some important attributes: basename sets the file naming convention for our thumbnail.  In this example, we're telling the plugin that all thumbnails are to be placed in the photos directory and should be named using the MTEntryKeywords field.  The width attribute specifies the width to resize it to.  Setting only one dimension will cause it to resize to that measurement while keeping correct proportions.  Finally, the thumbsuffix is appended to the thumbnail after creation.  (Note: If a file already exists with this name, the plugin will just serve up the image, not recreate it.)  Finally, we put the caption (MTEntryBody) right below the picture.





Now, let's say you want to get a bit more complex and link the thumbnail to the original sized version of your image.  You could always put the thumbnail on the index and the original size on the individual entry archive using the pattern above.  But let's link directly to the original.  This is where remembering your setup becomes vital.  I'm just editing the code between my MTEmbedImage tags:





<code>&lt;a href="&lt;$MTBlogURL$&gt;photos/&lt;$MTEntryKeywords$&gt;" title="Full Image"&gt;&lt;img src="&lt;$MTEmbedImageThumbFilename$&gt;" alt="&lt;$MTEntryTitle$&gt;" /&gt;&lt;/a&gt;</code>





What's different here?  I've added an anchor and recreated my photo location here.  The original photo got uploaded to the photos directory (remember I specified that in the RightFields settings?) and it's name is stored in the Keywords field, so I'm simply linking the thumbnail to the full version.  If you'd like it to pop open a new window (though it's a bit of a faux pas) just add target="_blank" to your anchor.





I've also created sample code for placing a thumbnail like this in the default Movable Type template (this goes between the MTEntries tag).  You can find it here.



#### Step 3: <a href="https://www.slideshowpro.net/">SlideshowPro</a>




So far, we've managed to get MT creating thumbnails and placing them inside the default templates.  Let's take this power another step further and integrate it with one of the more powerful Flash-based slideshow programs out there, <a href="https://www.slideshowpro.net/">SlideshowPro</a>.  (The same principles should apply for other slideshow programs as well, comments are welcome.)





Essentially SlideShowPro pulls in an XML feed to find out all the information about the pictures; fortunately, MT can publish XML, no sweat.  Be aware that you do need Flash to configure SlideShowPro; the location of the XML file as well as look-and-feel customization are all set up in Flash.  But the specific picture information is fed to SlideShowPro via XML.  Here's an example of a full XML SlideShowPro image feed template for Movable Type:





<code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;<br />
&lt;gallery&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&lt;MTCategories&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&lt;album title="&lt;$MTCategoryLabel encode_xml='1'$&gt;" description="&lt;$MTCategoryDescription encode_xml='1'$&gt;" lgPath="/photos/images/"&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;MTEntries lastn="9999"&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;MTEmbedImage basename="[MTBlogName]photos/[MTEntryKeywords]" width="425" thumbsuffix="-425"&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;img src="&lt;$MTEmbedImageThumbFilename$&gt;" link="&lt;$MTEntryPermalink encode_xml="1"$&gt;" target="_self" title="&lt;$MTEntryTitle encode_xml='1'$&gt;" caption="&lt;$MTEntryBody encode_xml='1'$&gt;" /&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/MTEmbedImage&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/MTEntries&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/album&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/MTCategories&gt;<br />
&lt;/gallery&gt;</code>





The syntax is specific to SlideShowPro, but it's fairly straightforward.  Our MT categories become our SlideShowPro albums (with MT filling in the label and description).  Then we loop through our individual entries and pass on vital information to SlideShowPro through the specialized XML attributes for the img tag (link, target, title, caption).  You could choose to use the full-size photos in your slideshow, but since the slideshow isn't usually displayed more than 600px wide on any given site, it's usually just counterproductive and takes far longer to load.





If you'd like to use thumbnails, simply change the code that appears within the MTEntries tag to the following:





<code>&lt;img src="&lt;MTEmbedImage basename="[MTBlogName]photos/[MTEntryKeywords]" width="425" thumbsuffix="-425"&gt;&lt;$MTEmbedImageThumbFilename$&gt;&lt;/MTEmbedImage&gt;" link="&lt;$MTEntryPermalink encode_xml="1"$&gt;" target="_self" title="&lt;$MTEntryTitle encode_xml='1'$&gt;" caption="&lt;$MTEntryBody encode_xml='1'$&gt;" tn="&lt;MTEmbedImage basename="[MTBlogName]photos/[MTEntryKeywords]" width="50" thumbsuffix="-50"&gt;&lt;$MTEmbedImageThumbFilename$&gt;&lt;/MTEmbedImage&gt;" /&gt;</code><br />
			<br />
It's long and seems convoluted, but it's basically generating 425px wide images for the main display and 50px wide images for your thumbnail display.  It requires a considerable amount of resources on save, but it's generally worth the enhanced experience for your users.



#### Step Four: ???




There are many, many more things you can do with this powerful thumbnail capability.  You could create a masthead photo for your blog and then use conditionals to place it only when the field isn't empty.  You could create multiple views for a product you're selling online without having to create 4 different images.  You could allow users to upload background images and have MT populate the style sheet for true design flexibility.  The sky's the limit.    





We just scratched the surface here, but I think we've covered enough basics here to at least get you off in the right direction.  Please feel free to share your experiences in the comments.


		