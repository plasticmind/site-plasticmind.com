---
title: "A Simple Translation Tool For Your Site"
date: 2007-10-15 22:30:00
archive: true
excerpt: 
subtitle: 
slug: simple-translation-tool
featured_image_url: 
alt_text: 
primary_category: "Web Development"
categories: ["Web Development"]
tags: ["google"]
meta_description: 
context: professional
fix: true
hits: 293
---


			

**File this under cool things you can do when your website is built properly.**  





Put this module on your sidebar to give your site international flair by letting your users choose to read your site in their own language (courtesy <a href="https://www.google.com/translate_t">Google Translate</a>).  The more real text you've got on the site (read: not images), the better this disembabelment works.  Now, keep in mind; this is only to help international readers get a gist of what you're talking about.  This does not replace real, human translation.  Launching a global enterprise site with this as your localization strategy is like applying for a job at Stanford and putting Jeopardy on your resume.





That being said, it's a whole lot of fun.  Here's the code:



<pre><code>&lt;form action="https://64.233.179.104/translate_c"&gt;
    &lt;input type="hidden" name="u" value="https://yoursite.com"&gt;
    &lt;label for="langpair"&gt;Translate this web site into:&lt;/label&gt;
    &lt;select name=langpair&gt;
        &lt;option value="en|de"&gt;German&lt;/option&gt;
        &lt;option value="en|es"&gt;Spanish&lt;/option&gt;
        &lt;option value="en|fr"&gt;French&lt;/option&gt;
        &lt;option value="en|it"&gt;Italian&lt;/option&gt;
        &lt;option value="en|pt"&gt;Portuguese&lt;/option&gt;
        &lt;option value="en|ja"&gt;Japanese&lt;/option&gt;
        &lt;option value="en|ko"&gt;Korean&lt;/option&gt;
        &lt;option value="en|zh-CN"&gt;Chinese&lt;/option&gt;
    &lt;/select&gt;
    &lt;input type="hidden" name="hl" value="en"&gt;
    &lt;input type="hidden" name="ie" value="UTF-8"&gt;
    &lt;input type="hidden" name="oe" value="UTF-8"&gt;
    &lt;input type="submit" value="Translate!"&gt;
&lt;/form&gt;
</code></pre>



You really don't have to do much beside replace “https://yoursite.com” with the page you want translated.  If you're especially keen on giving people the option to translate each page on your site, you could have your content management system fill in that field with an entry's permalink.





Go ahead, try it out.  Did I mention it's a whole lot of fun?  It'd probably be even more fun if could read something other than classical Greek and HTML.



<form action="https://64.233.179.104/translate_c" style="margin:10px;padding:20px;border:solid 1px #bbb; background:#e9e9e9;">
<input type="hidden" name="u" value="https://plasticmind.com/accessibility/simple-translation-tool/">
<label for="langpair">Translate this web site into:</label>
<select name=langpair>
<option value="en|de">German</option>
<option value="en|es">Spanish</option>
<option value="en|fr">French</option>
<option value="en|it">Italian</option>
<option value="en|pt">Portuguese</option>
<option value="en|ja">Japanese</option>
<option value="en|ko">Korean</option>
<option value="en|zh-CN">Chinese</option>
</select>
<input type="hidden" name="hl" value="en">
<input type="hidden" name="ie" value="UTF-8">
<input type="hidden" name="oe" value="UTF-8">
<input type="submit" value="Translate!">
</form>



Now, before you ask: **no**.  You can't seem link directly to a page without Google's top frame.  It must check the headers of the referrer, because if you send the form directly to that address, it routes it right back to the Google site with the frame up top.  However, if I enter the URL that the form sends me to directly into the address bar, it comes up without a frame.  Also, it worked without a frame when I tried it from my RSS reader.  I'd be interesting in finding out if anyone was able to accomplish it some other way.





**Note:** This doesn't play nice with Flash.  It *sort of* works with sIFR (Flash Replacement technique for headlines).  Google must catch the text before sending it to Flash because both the translated and untranslated text show up.  Also, it seems to have some issues with certain positioned elements; it seems to have made my logo go away.  I suspect it has something to do with the way it places it's translation hints that get revealed on hover.  (Confirmed: it breaks elements with “position: absolute”.)  Anyhow, consider yourself warned.



			<!--more-->

		