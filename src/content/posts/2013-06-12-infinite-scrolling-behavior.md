---
title: "A Better Behaved Infinite Scroll"
date: 2013-06-12 09:11:58
archive: true
excerpt: 
subtitle: "After several days of trying to integrate the Infinite Scroll plugin into the Simply Recipes mobile site, I finally came up with a solution that works well."
slug: infinite-scrolling-behavior
featured_image_url: 
alt_text: 
primary_category: "Web Development"
categories: ["Web Development", "Javascript"]
tags: []
meta_description: 
context: professional
fix: false
hits: 8806
---


			

The default behavior for <a href="https://github.com/paulirish/infinite-scroll">the Infinite Scroll plugin</a> is to engage infinite scrolling automatically as soon as you start to scroll.  We liked the concept of infinite scrolling, especially for a mobile home page.  However, it presents some usability issues for people who want to get to the footer.  For us, that's where users switch to the full version of the site.  We imagined a user scrolling to the bottom of the page to switch to the full version of the site and right before they tapped the link, more content loads, pushing the link down and pushing them into a frustrated rage.





The Infinite Scroll plugin lets you define custom behaviors.  There's a <a href="https://github.com/paulirish/infinite-scroll/blob/master/behaviors/manual-trigger.js">Twitter-style behavior</a> that requires a manual trigger for every load.  There's a <a href="https://github.com/paulirish/infinite-scroll/issues/176#issuecomment-7521121">Facebook-style behavior</a> that will enable infinite scrolling for a set number of scrolls, after which it switches to manual triggering.  But I couldn't find any behavior that matched the experience we were looking for.





<img alt="A Better Infinite Scrolling Behavior" src="/assets/i/infinitescrollbehavior.png" width="670" height="377" class="mt-image-none" style="">





What we wanted was simple.  Present the user with a “more posts” button at the bottom of the page.  Once that's tapped, infinite scrolling engages and continues until there are either no more posts or until the max threshold is reached.  That way users who want to get to the footer are able to, and those who register their intention to read more posts are able to.





Here's the behavior code *(I've only tested it with 2.0+ version of the plugin)*:



<pre><code>/*
    --------------------------------
    Infinite Scroll Behavior
    Simply Recipes Mobile Style
    : First scroll requires manual trigger, then switch to auto
    --------------------------------
    by Jesse Gardner, https://plasticmind.com

*/

$.extend($.infinitescroll.prototype,{
    _setup_simplyrecipes: function infscr_setup_simplyrecipes () {
        var instance = this;
        var opts = this.options;

        this._binding('bind');
        this._numScrolls = 0; // Register a scroll counter

        this.options.loading.start = function (opts) {
            if(instance._numScrolls==0) { // First scroll requires manual trigger
                $(opts.navSelector).show();
                $(opts.nextSelector).bind('click', function(e) {
                    e.preventDefault();
                    $(opts.navSelector).fadeOut('fast');
                    opts.loading.msg.appendTo(opts.loading.selector).fadeIn('fast');
                    instance.beginAjax(opts);
                });
            } else { // All scrolls after that happens automatically
                $(opts.navSelector).hide();
                opts.loading.msg.appendTo(opts.loading.selector).show(opts.loading.speed);
                instance.beginAjax(opts);
            }
        }
        this.options.loading.finished = function() {
            opts.loading.msg.fadeOut('fast');
            instance._numScrolls++;
        }
        return false;
    }
});
</code></pre>



To use this behavior, save this code as a file and include this in your site header just after you're including the Infinite Scroll script.  For example:



<pre><code>&lt;script type="text/javascript" src="https://www.example.com/js/jquery.infinitescroll.min.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" src="https://www.example.com/js/jquery.infinitescroll.sr.js"&gt;&lt;/script&gt;
</code></pre>



Then, wherever you're initializing Infinite Scroll (probably in your document ready function), set the behavior option to “simplyrecipes”.  Something like this:



<pre><code>try {
    $('#content').infinitescroll({
        navSelector: ".paging-navigation",
        nextSelector: ".nav-previous a:first",
        itemSelector: ".entry",
        behavior:'simplyrecipes'
    });
} catch (exception) {
    console.log(exception);
}
</code></pre>



Don't forget to style your pagination links.  We styled ours like a big button beneath the content to help communicate that that tapping the link will load more entries beneath it.





<img alt="more-button.jpg" src="/assets/i/more-button.jpg" width="347" height="357" class="mt-image-none" style="">



### Google Analytics Protip




With just a little extra code you can use Google Analytics events to better evaluate how users are interacting with your infinite scroll functionality.





We've added two Google Analytics event pushes to the code, one inside the <code>options.loading.start</code> function and one inside the <code>options.loading.finished</code> function.  The idea is that we want to send GA an event the first time infinite scroll is engaged (which is why we're binding it to the initial click event) and another event each time a new page is loaded automatically by the plugin.  I'm assigning the label “Mobile” to these events, but you can use whatever makes sense for your GA set up.





Here's the complete code, with events included.  Be sure your GA code is already being loaded on the page somewhere:



<pre><code>/*
    --------------------------------
    Infinite Scroll Behavior
    Simply Recipes Mobile Style
    : First scroll requires manual trigger, then switch to auto
    --------------------------------
    by Jesse Gardner, https://plasticmind.com

*/

$.extend($.infinitescroll.prototype,{
    _setup_simplyrecipes: function infscr_setup_simplyrecipes () {
        var instance = this;
        var opts = this.options;

        this._binding('bind');
        this._numScrolls = 0; // Register a scroll counter

        this.options.loading.start = function (opts) {
            if(instance._numScrolls==0) { // First scroll requires manual trigger
                $(opts.navSelector).show();
                $(opts.nextSelector).bind('click', function(e) {
                    e.preventDefault();
                    $(opts.navSelector).fadeOut('fast');
                    opts.loading.msg.appendTo(opts.loading.selector).fadeIn('fast');
                    _gaq.push(['_trackEvent', 'Mobile', 'Infinite Scroll Engaged']);
                    instance.beginAjax(opts);
                });
            } else { // All scrolls after that happens automatically
                $(opts.navSelector).hide();
                opts.loading.msg.appendTo(opts.loading.selector).show(opts.loading.speed);
                instance.beginAjax(opts);
            }
        }
        this.options.loading.finished = function() {
            opts.loading.msg.fadeOut('fast');
            instance._numScrolls++;
            _gaq.push(['_trackEvent', 'Mobile', 'Infinite Scroll Fired']);
        }
        return false;
    }
});
</code></pre>

			<!--more-->

		