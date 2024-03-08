/**
 * Main script for showing growing vines with flowers and leaves.
 *
 * Copyright 2022 Danielle Honigstein. Free for commercial and personal use with attribution.
 */

//vines, flowers and leaves, oh my!
var vines = new Array();
var flowers = new Array();
var leaves = new Array();
//how often a secondary vine sprouts fromt eh main vine
let spawnTime = 500; //ms
//timeing
var prevTime = 0;
var currTime = 0;
//number of vines visible
var numVines = 1;
//maximum vines in the sketch before restarting
let maxVines = 15;

//size for fullscreen option
var w = window.innerWidth;
var h = window.innerHeight / 2; //for demo purposes

function setup() {
  //get parameters from url if any
  let params = getURLParams();
  // if (params.fullscreen != "true") {
  //   w = 400;
  //   h = 400;
  // }
  if (params.maxVines) {
    maxVines = params.maxVines;
  }
  //create canvas and connect to html page
  const canvas = createCanvas(w, h);
  canvas.parent("sketch-holder");
  //create first vine
  vines.push(
    Vine.fromPosAndAngle(
      random(10, width - 10),
      float(height - 30),
      random(-HALF_PI / 3, HALF_PI / 3)
    )
  );
  //general settings
  textFont("cursive");
  background(0);
}

function draw() {
  currTime = millis();
  //draw each vine in vine array
  vines.forEach(function (vine) {
    vine.draw();
  });
  //spawn, always from the main vine
  if (currTime - prevTime > spawnTime) {
    prevTime = currTime;
    if (vines.length > 0) {
      t = vines[0].spawn();
      if (t != null) {
        //t is null if parent branch is too small
        vines.push(t);
      }
    }
  }
  //remove vines that have stopped growing or out of the screen
  for (i = vines.length - 1; i >= 0; i--) {
    t = vines[i];

    if (t.done()) {
      //draw flower or leaf at the end of the vine
      if (random(-1, 1) > 0) {
        flowers.push(new Flower(t.x, t.y, 10.0));
      } else {
        leaves.push(
          new Leaf(
            t.x,
            t.y,
            t.dir.heading(),
            random(0.7, 1.2),
            color(0, t.g, t.b)
          )
        );
      }
      vines.splice(i, 1);
      break;
    }
    if (t.x < -20 || t.x > width + 20 || t.y < -20 || t.y > height + 20) {
      vines.splice(i, 1);
    }
  }
  //if main vine is done, start a new one
  if (vines.length == 0) {
    vines.push(
      Vine.fromPosAndAngle(
        random(10, width - 10),
        float(height - 30),
        random(-HALF_PI / 3, HALF_PI / 3)
      )
    );
    numVines = numVines + 1;
    if (numVines >= maxVines) {
      background(0);
      numVines = 1;
    }
  }
  //draw all the flowers
  flowers.forEach(function (flower) {
    flower.draw();
  });
  //draw all the leaves
  leaves.forEach(function (leaf) {
    leaf.draw();
  });
  //my copyright
  fill(255, 255, 255); //TODO move to function
  noStroke();
  text(
    String.fromCharCode(0x00a9) + " Danielle Honigstein",
    width - 130,
    height - 5
  );
}
