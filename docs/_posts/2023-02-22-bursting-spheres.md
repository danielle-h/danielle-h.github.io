---
layout: post
title:  "Bursting Spheres"
categories: [p5js]
tags: [3d, interactive,gravity]
---


Click on the blue sky and watch the spheres burst!  <!--more-->
<script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js"></script>
<script type="text/javascript" src="/processing/bursting-spheres/movingSphere.js"></script>
<script type="text/javascript" src="/processing/bursting-spheres/burstingSpheres.js"></script>

<div id="sketch-spheres">
<script type="text/javascript" src="/processing/bursting-spheres/main.js"></script></div>

 The p5.js code for the sketch is available in the [site repository](https://github.com/danielle-h/danielle-h.github.io/tree/main/docs/processing/bursting-spheres). This is based on [Processing](https://processing.org/) code, which can be found [here](https://gitlab.com/dsavir/clouds-video). I used this code in conjunction with music processing software to create part of my video for my song [Clouds](https://www.youtube.com/watch?v=0BVqFYParRs). In the Processing code, the spheres burst on keystrokes, and fade away as they fall. This reflected the dreaminess of this part of the music for me.

 For the p5js code, I had to remove all the music and video processing code, convert the code, and basically rewrite practically everything as the 3D system and lighting is not exactly the same. It's not very different, but it still required some tweaking.

 Enjoy!