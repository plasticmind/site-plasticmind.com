---
title: "Dynamic Comment Previewing"
date: 2006-08-23 08:22:29
archive: true
excerpt: 
subtitle: 
slug: dynamic-comment-previewing
featured_image_url: 
alt_text: 
primary_category: "Movable Type"
categories: ["Movable Type"]
tags: []
meta_description: 
context: professional
fix: false
hits: 119
---


			

(This article was cross-posted <a href="https://www.learningmovabletype.com/archives/001583dynamic_comment_previewing.php">here</a> at Learning Movable Type.)





I've never liked the idea of a seperate comment preview page. Besides being overkill, it often gets missed during upgrades and becomes just another bug to squash.





So after picking up some good ideas from Mike Industries, I decided to toss it to the curb and show our commenters just exactly what their comment will look like as they type.





I give you, dynamic comment previewing in three easy steps:


			<!--more--><h4>Step 1: Modify mt-site.js</h4>



Add the following code to the end of your mt-site.js and rebuild it:





<code>// Dynamic Comment Preview - Kudos to Mike Industries for the inspiration!&lt;br /&gt;<br /><br />
// D.C.P. - Comment Text&lt;br /&gt;<br /><br />
function ReloadTextDiv() {&lt;br /&gt;<br /><br />
&#160;&#160;&#160;&#160;document.getElementById('TextDisplay').innerHTML = '&lt;p&gt;'+document.getElementById('comment-text').value.replace(/(rn|n)/g,'&lt;br /&gt;').replace(/(&lt;br /&gt;){2,}/gi,'&lt;'+'/p&gt;&lt;p&gt;')+'&lt;'+'/p&gt;';&lt;br /&gt;<br /><br />
}&lt;br /&gt;<br /><br />
// D.C.P. - Comment Author&lt;br /&gt;<br /><br />
function ReloadNameDiv() {&lt;br /&gt;<br /><br />
document.getElementById('NameDisplay').innerHTML = document.comments_form.comment-author.value;&lt;br /&gt;<br /><br />
}&lt;br /&gt;<br /><br />
// End Dynamic Comment Preview</code>





This is the javascript that powers the live comment preview.  Our comment form will call to these functions while you're typing in the author field or the comment field and update the comment preview in realtime.



<h4>Step 2: Modify individual entry archives</h4>



We're now going to add the live preview "box" to your site.  Provided here is the HTML that will work with the standard Movable Type templates.  This should come directly after the closing </form> tag of your comment form.





<code>...&lt;/form&gt;&#160;&#160;&#160;&#160;<br /><br />
&lt;div class="comments-content" id="preview"&gt;&#160;&#160;&#160;&#160;<br /><br />
&#160;&#160;&#160;&#160;&lt;h3 class="comments-preview"&gt;Comment Preview&lt;/h3&gt;&#160;&#160;&#160;&#160;<br /><br />
&#160;&#160;&#160;&#160;&lt;div class="comment"&gt;&#160;&#160;&#160;&#160;<br /><br />
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&lt;div id="TextDisplay"&gt;&lt;/div&gt;&#160;&#160;&#160;&#160;<br /><br />
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&lt;p class="comment-footer"&gt;Posted by:&#160;&#160;&#160;&#160; <br /><br />
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&lt;span class="author"&gt;&lt;a href="#" id="NameDisplay"&gt;&#160;&#160;&#160;&#160;<br /><br />
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&lt;script language="Javascript" type="text/javascript"&gt;<br /><br />
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&lt;!--&#160;&#160;&#160;&#160;<br /><br />
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;var authname = getCookie("mtcmtauth");&#160;&#160;&#160;&#160; <br /><br />
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;document.write(authname);&#160;&#160;&#160;&#160;<br /><br />
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;//--&gt;&#160;&#160;&#160;&#160;<br /><br />
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&lt;/script&gt;&lt;/a&gt;&#160;&#160;&#160;&#160;<br /><br />
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&lt;/a&gt;&lt;/span&gt;&#160;&#160;&#160;&#160;<br /><br />
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&lt;/p&gt;&#160;&#160;&#160;&#160;<br /><br />
&#160;&#160;&#160;&#160;&lt;/div&gt;&#160;&#160;&#160;&#160;<br /><br />
&lt;/div&gt;</code>





You may need to modify the structure to fit your own style.  Essentially, whatever element has the id "TextDisplay" will be filled with the comment text and whatever element has the id "NameDisplay" gets filled with the author name.



<h4>Step 3: Modify IEA's once more</h4>



We need to "activate" our form fields, or set them up to call to the D.C.P. javascript we put in mt-site.js earlier.  Simply find the comment author field and add a call to the name reload function onkeyup.  It should look something like:





<code>&lt;input id="comment-author" name="author" size="30" onkeyup="ReloadNameDiv();" /&gt;</code>





Let's do the same thing for our comment text field.  This time we're calling to the text reload function.





<code>&lt;textarea id="comment-text" name="text" rows="10" cols="30" onkeyup="ReloadTextDiv();"&gt;&lt;/textarea&gt;</code>





Just be sure that the id's you use on there form elements match the id's in your mt-site.js or else you wont get any updating.





And finally, the moment we've all been waiting for.  Remove the preview button from your template.  It looks something like this: 





<code>&lt;input type="submit" accesskey="v" name="preview" id="comment-preview" value="Preview" /&gt;</code>





Rebuild and give it a try.  Gives commenting a whole new 'zing', doesn't it?


		