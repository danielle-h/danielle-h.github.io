---
layout: post
title:  "Space clouds"
categories: [processing,p5js]
tags: [diffusion, input, interactive,random-walk]
---

<script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js"></script>
<script type="text/javascript" src="/processing/diffusion/diffusingDrop.js"></script>
<script type="text/javascript" src="/processing/diffusion/point.js"></script>
My original plan was to create a simulation of ink spreading in water (spoiler: I didn't succeed). I figured that I was looking at diffusion, so I used the following [model](https://www.compadre.org/nexusph/course/Diffusion_and_random_walks): start with 100 points at one position (a Diffusing Drop). Each of these points now execute a [random walk](https://en.wikipedia.org/wiki/Random_walk). What would it look like?
You can see the results below and play with the parameters. <!--more-->

When the `diffusion speed` (the size of the step each particle takes) is small, the result looks like diffusion of ink on paper (not water, unfortunately). When the speed is around 5, after a few seconds you get something similar to space clouds. When it is 10, you get colorful dust clouds. For the ink spreading in water effect I need to also simulate micro-currents etc. haven't gotten there yet :)

You can play with the speed, the number of drops, and the colors below. Each Diffusing Drop is color 1 with a probability of 0.5 and color 2 otherwise. The p5.js code for the sketch is available in the [site repository](https://github.com/danielle-h/danielle-h.github.io/tree/main/docs/processing/diffusion). You can also embed it in your site or web-screensaver by using this [link](/sketches/diffusion/?fullScreen=true) with the following optional parameters:
- `diffusionSpeed` the speed of the diffusion
- `numDrops` the number of diffusing drops
- `runTime` the amount of time (in ms) that the sketch will run before resetting.  
Here is an [example](/sketches/diffusion/?fullScreen=true&diffusionSpeed=1&numDrops=10&runTime=5000) with `diffusionSpeed` = 1, `numDrops` = 10 and `runTime` = 5 seconds.

All my sketches are free for commercial and personal use with attribution ([BSD 3-clause license](https://opensource.org/licenses/BSD-3-Clause)).


<div id="sketch-diffusion">
<script type="text/javascript" src="/processing/diffusion/diffusion.js"></script></div>

