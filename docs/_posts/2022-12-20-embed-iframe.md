---
layout: post
title:  "How to embed content with an iFrame"
categories: utilities
tags: [embed, html]
---

<iframe src="/embed/vines/?fullscreen=true&maxVines=15" width="100%" height="400" style="border:1px solid black;">
</iframe>

The above growing vines p5.js sketch should be familiar to you, as it's on my home page :). However, in this page I didn't need to import all that tedious JavaScript. I simply embedded it into an iFrame <!--more-->, like this:

```html
<iframe src="/embed/vines/?fullscreen=true&maxVines=15" width="100%" height="400" style="border:1px solid black;">
</iframe>
```

- `src` - is the url of the content you want to embed. If you want to embed the  vines in your own website, use the full url and not a relative url.  
- `width` and `height` are optional - these are can be in pixels or in [percent](https://stackoverflow.com/questions/24299990/can-percentage-be-provided-in-iframe-tag-of-html5-tag-for-height-and-width).  
- `style` is also optional - you can add css to the iFrame itself. It is not possible to style the contents of an iFrame from the embedding site. For example, if you embed the vines in your site, you will not be able to style the internal `<body>` element in the vines page. This is standard, for security reasons. However, you can add a border to the iFrame, or make it centered, etc.