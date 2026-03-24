---
title: "Protect from Contact Form Hijaacking"
date: 2006-01-30 04:45:50
archive: true
excerpt: 
subtitle: 
slug: protect-from-contact-form-hija
featured_image_url: 
alt_text: 
primary_category: "Blogging & CMS"
categories: ["Blogging & CMS"]
tags: []
meta_description: 
context: professional
fix: true
hits: 238
---


			

We've been spending some time on static publishing in Movable Type, because that's really not what it was "made" for per se, and it takes some extra doing to make static content easy to access.  In that spirit, I wanted to share my experiences with contact forms.  As part of the whole Movable-Type-as-my-CMS philosophy, I'm using a PHP powered contact form, with the PHP code as an actual index template so I can get at the code via MT whenever I so please.



#### Starting At The Beginning




Initially, I had written a very basic PHP mailer script that slurped the data passed from my contact form.  It looked something like this:





<code>&lt;?php    <br /><br />
    <br /><br />
$sender = Trim(stripslashes($_POST['Email']));    <br /><br />
$recipient = "jesse@plasticmind.com";    <br /><br />
$subject = Trim(stripslashes($_POST['Subject']));     <br /><br />
$message = Trim(stripslashes($_POST['Message']));     <br /><br />
    <br /><br />
$body = "PlasticMind Designn";    <br /><br />
$body .= "You have a new message from " . $recipient;    <br /><br />
$body .= "Message: " . $message;    <br /><br />
    <br /><br />
$success = mail($recipient, $subject, $body, "From: &lt;$sender&gt;");    <br /><br />
if ($success){    <br /><br />
    echo "&lt;meta http-equiv="refresh" content="0;URL=/"&gt;";    <br /><br />
}    <br /><br />
else{    <br /><br />
    die("Something bad happened!");    <br /><br />
}    <br /><br />
?&gt;</code> 





In my contact form (a separate page than this code you're looking at) I would post my data to this form with a simple &lt;form method="post" action="contact.php" name="contactform"&gt;.  When a user fills in the fields on your form and hits send, the data gets "posted" to the file "contact.php".  If you have have an input field on your form for a user to enter their email address (&lt;input type="text" name="email" /&gt;<br />
), the name attribute will then be what's posted to contact.php.  For instance, if someone typed     bob@plasticmind.com and pressed 'Send', the variable passed to contact.php would be email=bob@plasticmind.com.  Actually there might also be slashes passed, because some characters need to be escaped.  Don't worry too much about that, just know that the stripslashes command cleans them out.





So essentially what this simple script did was pull out the sender's email address (via $_POST['Email']), strip any slashes that may be in there, and assign it to a variable ($sender).  It does the same for the subject and the message.  The recipient is me, so that's fairly straightforward.





Then, we start putting together the actual body of the email in a variable we'll call $body.  For PHP newbies, the .= command isn't a typo, it's a concantenate (join) function.  And the n specifies a new line--this guy will actually be a big culprit later on.  But we'll get there.  Notice any text gets put in quotes, and variables are not.  Also, notice that period keeps popping up again.  We're using it to join things again.





Lastly, we run the mail function by assigning it to a variable.  If it runs, then $success is true and a &lt;meta http-equiv="refresh" content="0;URL=/"&gt; gets put in the document, which is essentially a redirect to your root directory.  If the mail doesn't send, we die with the message, "Something bad happened."



#### Simple Simon Met a Spammer




This code was functional, but customizing it was a pain, as well as it not being very helpful to users.  ("Wha?  Did my form go through?  What just happened?")





Worse yet, I found out that the evil SP-MMERS were trying to hijaack it by inserting false headers into the subject and sender fields and essentially use my contact form as a relay for their spam.  This is where the little 'n' varmint shows up again.  Obviously, they couldn't change the primary recipient of the email.  That is set up by the variable *$recipient* at the beginning of the code.  Ah, but let's not forget CC:, BCC:, etc.  In the email address field, for example, instead of entering *friendlyuser@plasticmind.com*, they'd enter *maliciousspammer@plasticmind.comnbcc:unsuspectingvictim@movabletweak.com*.  The new line character fooled my script into thinking we were sending the email to unsuspectingvictim@movabletweak.com as well as jesse@plasticmind.com.  Sometimes they'd even get elaborate and enter MIME types and other mail headers such as:<br />
    <br />
<code>Content-Type: text/plain; charset="us-ascii"    <br /><br />
MIME-Version: 1.0    <br /><br />
Content-Transfer-Encoding: 7bit    <br /><br />
Subject: scornfully tis foolish. iver    <br /><br />
bcc: charleslegbe@aol.com    <br /><br />
e3dfcabdd3ee3a1ac7f2668893284676</code>





**Problem.**





Then I remembered a sage web proverb:  *Never trust a user's input.*



#### Step 1:  Javascript Validation




We've got some serious PHP validation to do, but first things first.  Let's help our users out with a little javascript validation on the actual form page:<br />
  <br />
<code>&lt;script Language="JavaScript"&gt;    <br /><br />
    function CheckInput(contactform)    <br /><br />
    {    <br /><br />
        if ((contactform.Email.value == "")||(contactform.Subject.value == "")||(contactform.Subject.value == ""))    <br /><br />
        {    <br /><br />
            alert("You must fill in all required fields. (*)");    <br /><br />
            return false;    <br /><br />
        }    <br /><br />
    }    <br /><br />
&lt;/script&gt;</code>





This is a very basic form validator that simply checks to see if the mandatory fields are blank.  Make sure you've entered the name of the form in the parenthesis after the function name (contactform).  It also shows up at the beginning of each validation.  Also, be sure that the name of each field to be checked is included in this list.  (i.e. *formname.fieldname.value*).





While this is a functional script, I admit there's a lot more you can do.  For instance, this script doesn't check to see if it's a valid email address.  For more indepth ideas on validation scripts, check out the following articles:  <a href="https://www.codetoad.com/javascript_form_validation_script.asp">Code Toad - Versatile Form Validation Using the DOM</a> or <a href="https://javascript.internet.com/forms/email-address-validation.html">Javascript Source - Complex Email Validation</a>.



		