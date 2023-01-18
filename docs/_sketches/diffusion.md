---
layout: embed-page
#permalink: /sketches/vines/?fullscreen=true
parameters:
   - name: diffusionSpeed
     description: "the speed of the diffusion. Low looks like ink on paper. High looks like dust clouds."
   - name: runTime
     description: "the number of milliseconds the sketch runs before restarting"
   - name: numDrops
     description: "the number of diffusing drops"
   - name: fullscreen
     description: "if true fills the screen, otherwise 400 by 400"
---


<script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js"></script>
<script type="text/javascript" src="/processing/diffusion/diffusingDrop.js"></script>
<script type="text/javascript" src="/processing/diffusion/point.js"></script>
<link rel="stylesheet" href="/processing/diffusion/diffusion.css">

<div id="sketch-diffusion">
<script type="text/javascript" src="/processing/diffusion/diffusion.js"></script>
</div>
