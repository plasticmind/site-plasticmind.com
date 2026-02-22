---
title: "Easy Audio Output Toggle Using AppleScript, Growl and Quicksilver"
date: 2008-12-30 15:59:44
archive: true
excerpt: 
subtitle: 
slug: audio-output-toggle-applescript
featured_image_url: 
alt_text: 
primary_category: "Code"
categories: ["Code"]
tags: ["applescript", "growl", "quicksilver"]
meta_description: 
context: professional
fix: false
hits: 13701
---


			

<img src="https://farm4.static.flickr.com/3082/3151750763_90882b726b.jpg" alt="Growl Notification" title="" />





Necessity is the mother of invention, and with <a href="https://www.flickr.com/photos/plasticmind/2909312556/">Ethan crying frequently</a>, I needed **a quick and easy way to switch between my headphones and desktop speakers**.  So I put together this simple AppleScript that toggles between two audio output sources and assigned it to a Quicksilver hotkey.  Here it is in a nutshell.



			<!--more-->

(If you've not used AppleScript before, the quick explanation is that you should copy and paste the code below into the **Script Editor** application.  For a more detailed understanding of it, check out <a href="https://developer.apple.com/applescript/">Apple's developer guide for AppleScript</a>.)





First, we activate the System Preferences and the sound preferences pane:



<pre><code>tell application "System Preferences"
    activate
    set current pane to pane "com.apple.preference.sound"
end tell
</code></pre>



This next part is a bit confusing, but it's important to understand as you may want to customize it.  First, we're targeting the Output tab (make sure &#8220;Enable Assistive Devices&#8221; is checked in the &#8220;Universal Access&#8221; preference pane) then we do a simple conditional statement.  If the second row on your sound output list (my Line Out) is currently selected, this tells your Mac to select the first row (my Headphones).  If not, it selects the second row.  You can easily customize this part to fit your specific needs.



<pre><code>tell application "System Events"
    tell application process "System Preferences"
    tell tab group 1 of window "Sound"
        click radio button "Output"
        if (selected of row 2 of table 1 of scroll area 1) then
            set selected of row 1 of table 1 of scroll area 1 to true
            set deviceselected to "Headphones"
        else
            set selected of row 2 of table 1 of scroll area 1 to true
            set deviceselected to "Line Out"
        end if
    end tell
    end tell
end tell
</code></pre>



Then we close out the System Preferences window:



<pre><code>tell application "System Preferences" to quit
</code></pre>



Next comes the Growl notification magic:



<pre><code>tell application "GrowlHelperApp"
    set the allNotificationsList to {"Sound Notification"}
    set the enabledNotificationsList to {"Sound Notification"}

    register as application "Toggle Sound Output" all notifications allNotificationsList default notifications enabledNotificationsList icon of application "Script Editor"

    notify with name "Sound Notification" title "Audio Output" description deviceselected application name "Toggle Sound Output"

end tell
</code></pre>



In this last bit we're <a href="https://growl.info/documentation/applescript-support.php">registering our AppleScript with Growl</a> and then passing along a notification we built from the variable we set up in the conditional statement (deviceselected).  And that's it!





<a href="https://plasticmind.com/assets/Toggle_Sound_Output.zip" class="download-link">Download the full script here.</a>





The last bit of magic is to save the script and <a href="https://leafraker.com/2007/09/17/how-to-create-a-quicksilver-trigger/">assign it to a Quicksilver trigger</a>.  Now, every time I press Command-, my audio output toggles and I get a handy Growl notification telling me which is now active.





<a href="https://www.flickr.com/photos/plasticmind/3152577082/"><img src="https://farm4.static.flickr.com/3256/3152577082_e5d2472b3d.jpg" alt="Assign the AppleScript to a Quicksilver trigger." title="" /></a>





Looking for more handy Quicksilver triggers?  Check out LifeHacker's <a href="https://lifehacker.com/software/hack-attack/nine-time+saving-quicksilver-triggers-291520.php">Nine Time-Saving Quicksilver Triggers</a>  How about sharpening your AppleScript-fu?  Be sure to stop by <a href="https://macscripter.net/">https://macscripter.net/</a>.



		