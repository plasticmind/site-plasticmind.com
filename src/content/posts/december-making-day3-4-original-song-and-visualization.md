---
title: "31 Days of Making, Day 3/4: Original Song and Visualization"
date: 2019-12-05 08:39:47
archive: false
excerpt: 
subtitle: 
slug: december-making-day3-4-original-song-and-visualization
featured_image_url: https://plasticmind.com/wp-content/uploads/2019/12/frame-001929.png
alt_text: ""
primary_category: "30 Day Challenge"
categories: ["30 Day Challenge"]
tags: []
meta_description: 
context: personal
fix: false
hits: 130
---

*This is day 3 and 4 of <a href="https://plasticmind.com/30-day-challenge/december-challenge-make-something-every-day/">my 31 days of making</a>.*

https://www.youtube.com/watch?v=sfxd-d8lWmU

This is a two-parter. On day 3, I created an original song in Logic using homemade sine wave and 808 patches. On day 4, I used Processing and the Minim audio library to create a dynamic visualization for the song.

## The Song


I came up with the idea for this song while teaching my 11-year-old son about dial tones (he had no idea what they were!) We created a simple sine wave patch and found the tones for a dial tone, busy signal, and "off the hook" sound... and that experimentation turned into this song. I also had a blast creating my own custom <a href="https://en.wikipedia.org/wiki/Roland_TR-808">808 patch</a> for that killer bass.

## The Visualization


Ever since I saw <a href="https://vimeo.com/347609052">Joshua Davis present at Dribbble Hangtime NYC</a>, I've been wanting to create something with <a href="https://processing.org/">Processing</a>.  I literally turned to the person I was sitting next to and said, "I might just quit my job and do this for a living." I've been enamored with audio visualization since the days of <a href="https://www.youtube.com/watch?v=17Bl4xf1BAg">Future Crew's killer demos</a> — this project did not disappoint!

A lot of what you see here is cobbled together from tutorials and demo files.  I'm pulling in an audio file and grouping the high, medium, and low bands so I can evaluate their individual intensity and pass that as a value to the various graphical functions. For example, the number of cubes is based on the # of individual bands. The height, color, and z-index of the spectral analyzer is based on the intensity of the high, medium, and low band groups. The speed we fly through the tunnel is based on the overall intensity (set with a global intensity variable) of the music. The color, height/width, and rotation of the cubes is based on the intensity of that cube's particular band.

A quick technical aside: I had a really difficult time turning this into a recording because any programmatic recording I tried (Processing's saveFrame() function and a few other video exporting libraries) brought the frame rate *way* down. Normally, you can just run an export and the frames will all be rendered despite the real-time lag, but I couldn't do that in this case because the visualization is tied to the audio which has to run in real time. I should have ended up with 2700 frames for 1:30 of audio, but I instead ended up with 300-400 frames, which was, of course, out of sync then with the audio. I ended up using <a href="https://www.telestream.net/screenflow/">ScreenFlow</a> to capture the fullscreen output, which was passable, but I'd still like to find a more reliable way to output higher resolutions (like 4k) without sync issues.

Lots of fun. Looking forward to playing more with audio/visualizations in Processing.

<div style="display: none;"></div>

<div style="display: none;"></div>

<div style="display: none;"></div>

<div style="display: none;"></div>