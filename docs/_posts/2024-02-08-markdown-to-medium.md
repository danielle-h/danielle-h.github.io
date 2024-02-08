---
layout: post
title: "Medium to Markdown or Markdown to Medium?"
categories: [blogging]
tags: [markdown, medium]
description: How to convert markdown to medium, and why it's better than the opposite
comments: true
---

<link rel="stylesheet" href="/css/images.css">

I [wrote before](https://danielle-honig.com/blogging/2024/01/17/medium-to-markdown.html) on how to convert Medium to Markdown. I showed some [nice shortcuts using VSCode](https://danielle-honig.com/blogging/2024/01/17/medium-to-markdown.html#step-2-image-captions). But as I noted in the end, it's still a tedious process.

One of the people who read the article asked me why I don't do the opposite - write in Markdown and import it into Medium. And really, why not?

{% include responsive-embed url="https://giphy.com/embed/l2SpKR1aR4FMBFQwE" ratio="16:9" %}

<!--more-->

## Import Story

1. Create the post in Markdown, and publish it

2. In Medium, go to Your Stories --> Import a story.
   ![Import story button in medium](/assets/images/2024-02-08-markdown-to-medium/import-story-medium.png)
3. Enter the link of your published post and press `Import`.
   ![second stage of process in Medium](/assets/images/2024-02-08-markdown-to-medium/import-story-medium-2.png)

## Fix story before publishing

#### Add missing elements

If your Jekyll theme, like mine, doesn't have **subtitles**, then you need to add it. In addition, **text dividers** are not imported - you'll need to manually add the Medium text divider.
![No divider in imported post](/assets/images/2024-02-08-markdown-to-medium/import-story-medium-no-divider-and-extra-line.png){: .align-center}

<h6 style="text-align: center;">No divider, and you can see the extra line as well</h6>
    
#### Re-embed media
GIFs from Giphy etc. are not imported, so you'll need to **re-embed the GIFs** in your Medium article.

![No gifs in imported article](/assets/images/2024-02-08-markdown-to-medium/import-story-medium-no-gifs.png){: .align-center}

<h6 style="text-align: center;">No gifs in imported article. And see the extra line?</h6>

Also, I need to copy and paste regular text into the **caption area** for images. My captions aren't HTML captions - maybe if they were, I wouldn't have to do this step (if anyone tries this and it works, I would love to hear it).

![No captions](/assets/images/2024-02-08-markdown-to-medium/import-story-medium-no-captions.png)

<h6 style="text-align: center;">No captions</h6>

#### Copy and paste missing content

There are some elements that aren't imported at all, such as **code blocks**.
![No code blocks](/assets/images/2024-02-08-markdown-to-medium/import-story-medium-no-code.png){: .align-center}

<h6 style="text-align: center;">No code blocks</h6>

Also, at the end of my articles, after a text divider, I have some additional info and links to my site etc. Medium removes this completely in favor of a simple `Originally published at <link> on <date>.` So you need to copy all your **footer text** if you have any.
![No footer](/assets/images/2024-02-08-markdown-to-medium/import-story-medium-no-footer.png){: .align-center}

<h6 style="text-align: center;">No footer</h6>

#### Remove extra lines

Medium sometimes **adds extra lines after titles** (see first image). I have no idea why, maybe it could be prevented somehow? In any case, currently I'm deleting them manually.

## Publish to Medium

Finally you can publish your story :)
{% include responsive-embed url="https://giphy.com/embed/pefM6KJ4vX9KkVIWeN" ratio="16:9" %}

## Summary

What can I say? Still pretty tedious.

On the plus side, **links**, **images** and **titles** are imported perfectly.
![Images are imported perfectly](/assets/images/2024-02-08-markdown-to-medium/import-story-medium-images-ok.png){: .align-center}

<h6 style="text-align: center;">See? Great images.</h6>

So what is your vote, Medium to Markdown or Markdown to Medium? Do you have any cool tricks? Please let me know in the comments.

<hr/>

[_124 days_](https://stories.bringthemhomenow.net/)_. Still waiting._ [_#BringThemHome_](https://www.facebook.com/bringhomenow/)_._

_Check out my free and open source online game_ [_Space Short_](https://danielle-honig.com/space-short)_. If you like my_ [_site_](https://danielle-honig.com/)_, you can also_ [_buy me a coffee_](https://www.buymeacoffee.com/369wkrttu6)_._
