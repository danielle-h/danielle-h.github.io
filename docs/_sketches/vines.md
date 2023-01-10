---
layout: embed-page
#permalink: /sketches/vines/?fullscreen=true
parameters:
   - name: maxVines
     description: "the maximum number of vines before restart"
   - name: fullscreen
     description: "if true fills the screen, otherwise 400 by 400"
---

<script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js"></script>
<script type="text/javascript" src="/processing/vines/vine.js"></script>
<script type="text/javascript" src="/processing/vines/flower.js"></script>
<script type="text/javascript" src="/processing/vines/leaf.js"></script>

<div id="sketch-holder">
<script type="text/javascript" src="/processing/vines/growing-vines.js"></script></div>