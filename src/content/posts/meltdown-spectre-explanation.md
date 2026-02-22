---
title: "A Simple Explanation of Meltdown and Spectre"
date: 2018-01-05 17:38:53
archive: true
excerpt: 
subtitle: 
slug: meltdown-spectre-explanation
featured_image_url: https://plasticmind.com/wp-content/uploads/2018/01/2018-01-05-at-5.38-PM.png
alt_text: ""
primary_category: "0's and 1's"
categories: ["0's and 1's"]
tags: []
meta_description: 
context: professional
fix: false
hits: 463
---

<p class="p1"><span class="s1">Ars Technica put together <a href="https://arstechnica.com/gadgets/2018/01/meltdown-and-spectre-every-modern-processor-has-unfixable-security-flaws/">a good breakdown</a> of the complexities behind the recent <a href="https://meltdownattack.com/">Meltdown and Spectre vulnerabilities</a> plaguing Intel chips (and possibly others). Here's an overly-simplistic explanation of what's happening:</span>



<p class="p1"><span class="s1">When code sends an operation to your computer's processor, the processor will run that operation at the same time that it's figuring out if the place where the code said to store the answer is valid. The processor does these two things at the same time to make everything go faster. It's called "speculative execution."</span>



<p class="p1"><span class="s1">Now, if the place where the code told your processor to store the answer *isn't* valid — for example, kernel memory (where a computer's core operational code lives) — the processor blocks it and throws away the result of the operation. Trouble is, with some really clever measuring of the timing of these blocks and the impact they has on performance, sensitive information can be inferred from kernel memory—information like passwords, which tabs or windows you have open, etc.</span>



<p class="p1"><span class="s1">There are fixes, but they're not without their drawbacks. </span>



<span class="s1">Operating systems are being patched to address this vulnerability, but they have to change the way this "speculative execution" works, which comes at a significant performance cost. You can tell the processor not to perform the operation until the target location is validated, but this change would impact every calculation and would have significant impact on performance.</span>

<span class="s1">The best fix is hardware related: keep kernel memory separate from other memory altogether. But that requires new chip architecture which will take time to manufacture and roll out.</span>