---
title: "Comment Highlighting: Static or Dynamic"
date: 2005-09-08 06:32:08
archive: true
excerpt: 
subtitle: 
slug: comment-highlighting-static-or
featured_image_url: 
alt_text: 
primary_category: "Web Development"
categories: ["Web Development"]
tags: ["cms"]
meta_description: 
context: professional
fix: false
hits: 101
---


			

You've seen it before.  An article gets hot and soon you have 50 to 60 comments attached to it.  Getting in on the tail end of the conversation can be annoying with that many posts to wade through.  So we create a handy little convention that will highlight (change the class of) the comments posted by the author of the post.





There are many, many ways this can be done (plugins, php, etc.) and even more ways to implement it (mutliple author highlighting, specific images for certain commenters, etc.), but we're going to look at two important facets: static and dynamic.



#### Static vs. Dynamic




This is a debate which we will leave to the professionals.  I will only go so far as to say that there are some static publishing options for this trick that you don't have with dynamic publishing.  For instance, I first tried using <a href="https://www.staggernation.com/mtplugins/CompareReadMe.html" class="extlink">Kevin Shay's MTCompare</a> to check the author's comment email with a preset string; this works fine with static publishing, but dynamic spits out an ugly smarty error that says it doesn't like playing with your tag.





So what we'll do here is outline two ways of accomplishing the same thing: one is clear and simple for static publshing (though it requires <a href="https://www.staggernation.com/mtplugins/CompareReadMe.html" class="extlink">Kevin's MTCompare plugin</a>) and the other is smaller though just a touch more complex (if you're a novice with PHP, as am I) and perfect for dynamic content. 



#### Option #1: MTCompare




First, if you have not done so, download and install <a href="https://www.staggernation.com/mtplugins/CompareReadMe.html" class="extlink">Kevin's MTCompare plugin</a>.  This will give you some extra tags like <code><MTIfEqual></code>, <code><MTIfNotEqual></code> and <code><MTIfBetween></code> that puts some conditional power in your hands.





Next, create a special class for your highlighted comments.  All of my comments are wrapped in a generic '.comments' class with a simple border and background color.  So I created a new class called '.mycomments' with a slightly different border and background color so they stand out from the rest.





Now, we'll need to make some changes to your Individual Entry Archive (or wherever your comments are posted).  Find the <code><MTComments></code> tag that starts your comment envelope.  If you haven't already done so, wrap your comments in a <code><div></code>.  We can than change it's class based on a conditional we're going to set up.  Here's what mine looks like so far:



<div class="contentbox">
<code>
# Comments:
<br />
<MTComments><br />
	<div class="comments"><br />
	<$MTCommentBody$><br />
### Shared by: <$MTCommentAuthorLink default_name="Visitor" spam_protect="1"$> <MTCommentAuthorIdentity> at <$MTCommentDate$>
<br />
	</div><br />
</MTComments>
</code>
</div>



What we need to do now is add a conditional to the <code><div></code>, specifically to it's class.  This is where you decide what the conditional will be.  Some have simply looked at the comment author's email address and highlighted the comment based on that, but the problems are obvious.  Anyone using my email address can post "as me".  Some have suggested using a password in the comment email form, but MT checks that field to be sure it's an email address.  So 'ilovejimmy' isn't going to work--MT will spit back an 'invalid email address' error.  We could disable the email check, but that's far to complicated a step for our purposes here.





Let's compromise.  Let's create a password in email form.  For instance, if you wanted to use 'foobar' as your password, lets just use 'foo@bar.com'.  It's just as easy to remember, and it has all the security you'd find in a password, without having to disable the email check.





Now that we've decided on a conditional, we need to put it into our template.  Let's replace that starting <code><div></code> with the following code:



<div class="contentbox">
<code>
<MTIfEqual a="[MTCommentEmail]" b="foo@bar.com"><br />
 <div class="mycomments"><br />
</MTIfEqual><br />
<MTIfNotEqual a="[MTCommentEmail]" b="foo@bar.com"><br />
 <div class="comments"><br />
</MTIfNotEqual>
</code>
</div>



Unfortunately, <code><MTCompare></code> doesn't have an else built into it, so we have to run another statement.  There are other ways around this (put the conditional in the class of the actual <code><div></code> to simply add "my" before comments if the password matches) but for the sake of clarity, we'll stick with this one.





What's happening is we're comparing a and b, a being the <code><MTCommentEmail></code> tag that MT passes along and b, your predefined password.  (<code><MTCompare></code> requires that any MT tags be passed to it with <code>[]</code> instead of <code><></code> and single quotes instead of double quotes.)  If they match, a <code><div></code> with the "mycomments" class is placed.  If they don't, a <code><div></code> with "comments" class is placed.





Save, rebuild and comment using your new 'password' in the email comment form.  Your comments should now stand out.





You can put anything else in these conditional statements (photos of contributing authors, additional text, scripts, etc.)  The possibilities are endless.



#### Option #2: Blessed PHP




In some ways this solution is a better one.  Though it's relatively more complex (programmatically), you don't have to rely on a plugin for functionality and it's not as semantically redundant.





First, realize that with dynamic publishing you can't put an MT template tag inside a PHP statement.  Why?  Consult the book of MT!



<div class="contentbox"><code>
Dynamic publishing translates Template Tags into PHP code, using Smarty. So, if you use this code:<br />
<br />
<?php include('<MTEntryAuthor dirify="1">.html'); ?><br />
<br />
it would translate to something like this:<br />
<br />
<?php include('<?php echo<br />
   smarty_modifier_dirify(smarty_function_Author()), "1"); ?>.html'); ?>
<br />
which makes no sense and would not compile.
</code>
</div>



Harumph.  It's a fine solution for our static friends.  All they need to do is compare the <code><MTCommentEmail></code> with the predefined email 'password' we talked about earlier.  A simple replacing of their opening <code><div></code> tag with the following code should suffice:



<div class="contentbox"><code>
<?php if ("<$MTCommentEmail$>" == "foo@bar.com") {echo "<div class="mycomment">";} else {echo "<div class="comment">"; }?>
</code>
</div>



Movable Type fills in that first part of the conditional and a simple check is performed against it.  If the email field had "foo@bar.com" in it, the class is "mycomment", if not, the class is "comment".  (Oh, don't forget to 'escape' your quotes (put a  before them) inside of the echo statements... you'll confuse PHP if you don't.  <a href="https://www.zend.com/zend/tut/using-strings.php?article=using-strings&kind=t&id=650&open=1&anc=0&view=1">Find out more here</a>.)





Sadly, as we mentioned before, this won't work for you if you're using dynamic publishing, because Smarty (MT's dynamic compiler) will try to compile those tags in the PHP statement and make a mess of things.  So what we must do to compensate is capture to value of the tag in a simple string and then make the comparison against that string:



<div class="contentbox">
<code>
<?php $commentemail = $this->tag('MTCommentEmail'); ?><br />
<?php if ($commentemail == "foo@bar.com") {echo "<div class="mycomment">";} else {echo "<div class="comment">"; }?>
</code>
</div>



What I've done is I've captured the MTCommentEmail tag data through PHP and compared that with my predefined passcode, 'foo@bar.com'  The final comment section in your Individual Archive Template should look something like this:



<div class="contentbox">
<code>
# Comments:
<br />
<MTComments><br />
	<?php $commentemail = $this->tag('MTCommentEmail'); ?><br />
	<?php if ($commentemail == "foo@bar.com") {echo "<div class="mycomment">";} else {echo "<div class="comment">"; }?><br />
	<$MTCommentBody$><br />
### Shared by: <$MTCommentAuthorLink default_name="Visitor" spam_protect="1"$> <MTCommentAuthorIdentity> at <$MTCommentDate$>
<br />
	</div><br />
</MTComments>
</code>
</div>



Now when you post comments to your own site, enter in your passcode in the comment email field and your comments ought to stand out!



#### Final Thoughts




Movable Type 3.2 has some very powerful global search and replace capabilities, giving you the option to search and replace specific fields in your comments.  You can choose comments > limit fields > comment email and perform a global search and replace of 'your@email.com' with the new passcode 'foo@bar.com'.  That way this comment highlighting is retroactice.





Only problem is the global search and replace hasn't seemed to work for me in the comments section.  I check the "Search & Replace" radio button, type in the new address, check all of the entries and click "Replace" -- and get a "No comments were found that match the given criteria." in red.  A basic search again and my old address is still there in all the entries.  I've tried it with other comment addresses and still no go.





It was worth a shot.


			
		