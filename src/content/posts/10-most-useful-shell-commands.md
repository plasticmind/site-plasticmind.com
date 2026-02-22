---
title: "My 10 Most Useful Shell Commands"
date: 2012-08-22 03:09:08
archive: false
excerpt: 
subtitle: "I use most of these commands on a regular basis, so I thought I'd pass them along in the hope that others find them useful."
slug: 10-most-useful-shell-commands
featured_image_url: https://plasticmind.com/wp-content/uploads/2012/08/shell.jpg
alt_text: ""
primary_category: "Code"
categories: ["Code"]
tags: []
meta_description: 
context: professional
fix: false
hits: 6597
---

### Find Text In Files, List Only Filenames


<pre><code>grep -ril "TEXT TO FIND" /path/to/search
</code></pre>

This is recursive, which means it will search in all directories beneath the one which you target.***Key:*** -r = recursive, -i = case-insensitive, -l = list filenames

### List Files With Specific Modified Date


<pre><code>ls -Rlh | grep YYYY-MM-DD | sort -k 5,6
</code></pre>

Helpful when looking for exploits. Replace YYYY-MM-DD with the date you’re searching for. It’s recursive as well.***Key:*** -R = recursive, -l = long format, -h = human readable units

### Show Largest Files


<pre><code>du -h | grep M | sort -nr | head -15
</code></pre>

Good for cleaning up disk space. Evaluates all files in current folder and subfolders, sorts them by size and displays the top 15 results. Warning: this can take a long time to run, depending on how many files and directories are being processed.***Key:*** -h = human readable, -n = numeric sort, -r = reverse results, 15 = only show top 15 results

### Show Total Directory Size


<pre><code>du -ch | grep total
</code></pre>

Extremely handy. Counts up the file sizes for current folder and all subfolders and delivers a grand total.***Key:*** -c = display grand total, -h = human readable

### Count Files


<pre><code>ls -1 | wc -l
</code></pre>

Count all files and display just the total number of files. Add the -R flag to the ls command (e.g. <code>ls -1R</code>) to count subdirectories as well.***Key:*** -1 = force display to one line per file, -l = count lines

### Recursively Fix Directory Permissions


<pre><code>find . -type d -exec chmod 755 {} ;
</code></pre>

Most (not all, see warning below) folder permissions in secure setups should be set to **755** (translation: readable, writeable and executable by the owner; readable and executable by group members and the world). Unfortunately, many people have scores of folders with permissions set to 777, which means your files are vulnerable to being modified. This will find all folders in the current folder and subfolders with insecure permissions (777) and change them to something a bit more secure (755).***Key:*** . = current folder, -type d = find only directories, -exec = run the following command on the results

**Warning: Be careful running this as it could potentially makes mass changes to your system.** Some systems require certain folders to be world writable (like the WordPress <code>wp-uploads</code> folder or some cache folders). It’s safer to run this in specific folders where you’re sure there aren’t any exemptions than to run it in a root folder.

### Recursively Fix File Permissions


<pre><code>find . -type f -exec chmod 644 {} ;
</code></pre>

Similar to the previous command, except setting permissions for files to 644 (files generally don’t need the “execute” bit set; folders usually do).***Key:*** . = current folder, -type f = find only files, -exec = run the following command on the results

**The same warning applies: if you’re not sure what you’re doing, don’t run this command.**

In fact, if you’re unsure of what folders or files would impacted by the previous commands, it might be a good idea to start with…

### List Only Directories


<pre><code>ls -l | grep ^d
</code></pre>

Add the <code>-R</code> flag to <code>ls</code> to show all subfolders.

### List Only Files


<pre><code>ls -l | grep ^-
</code></pre>

Add the <code>-R</code> flag to <code>ls</code> to show all files in subfolders.

### MySQL Dump


<pre><code>mysqldump -u username -h localhost -p database_name | gzip -9 &gt; backup_db.sql.gz
</code></pre>

An oldie but a goodie. Dump and zip a MySQL database. I use this so often, I’ve got it memorized. Replace <code>username</code>, <code>database_name</code> and <code>backup_db</code> with the values you’d like to use.***Key:*** -9 = compress

### CodeBox


<img class="mt-image-none" style="width: 100%;" src="https://plasticmind.com/i/Codebox%20Library.jpg" alt="Codebox Library.jpg" />

Since we’re talking code, I’d be remiss in not mentioning a super tool I use called <a href="https://www.shpakovski.com/codebox/">CodeBox</a>. It’s a Mac app for organizing code snippets. You can organize code snippets by folders, groups and tags, and you can attach assets and notes to each snippet. It’s even got code highlighting for over 100 syntaxes (and supports TextMate color themes). I save the CodeBox library file to Dropbox so I’ve got my code snippets on all of my machines. Incredibly handy.

### Yours?


I’m no hardcore developer, so I’m sure many people reading this have better recommendations. What are your most commonly used shell commands?

<!--more-->