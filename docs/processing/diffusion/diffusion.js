/**
 * Main script for showing simulating diffusion using random walk. optionally creates input fields.
 *
 * Copyright 2022 Danielle Honigstein. Free for commercial and personal use with attribution.
 */

//diffusing drops array
let dd;
//number of drops
let numDrops = 100;
//diffusion speed
let diffusionSpeed = 5;
//colors
let c1, c2;

//input fields
let speedSlider;
let restartButton;
let speedValue;
let numInput;
let colorPicker1;
let colorPicker2;
let randomCheckbox;

//fullscreen
let isFullScreen = true;
//width and height for fullscreen option
var w = window.innerWidth;
var h = window.innerHeight;

//timing
let runTime = 30000; //ms
let startTime = 0;
let currTime = 0;

function setup() {
  //get parameters from url if any
  let params = getURLParams();
  if (params.fullscreen != "true") {
    w = 400;
    h = 400;
    isFullScreen = false;
  }
  if (params.diffusionSpeed) {
    diffusionSpeed = params.diffusionSpeed;
  }
  if (params.numDrops) {
    numDrops = params.numDrops;
  }
  if (params.runTime) {
    runTime = params.runTime;
  }
  //create canvas and connect to html page
  const canvas = createCanvas(w, h);
  canvas.parent("sketch-diffusion");
  //start with random color that we can put in colorpicker
  c1 = getRandomColor();
  c2 = getRandomColor();
  //not fullscreen - need to add the input fields
  if (!isFullScreen) {
    //create slider for diffusionSpeed
    let sliderDiv = createDiv(); //containing div
    sliderDiv.id("slider-div");
    sliderDiv.parent("sketch-diffusion");

    let speedLabel = createSpan("Diffusion speed: "); //label
    speedLabel.parent("slider-div");
    speedValue = createSpan(diffusionSpeed); //value
    speedValue.parent("slider-div");
    createDiv().parent("slider-div");

    let minLabel = createSpan("1"); //left label - min
    minLabel.parent("slider-div");

    speedSlider = createSlider(1, 10, 5); //slider
    speedSlider.parent("slider-div");
    speedSlider.class("slider");
    speedSlider.input(updateSpeedValue);
    let maxLabel = createSpan("10"); //right label - max
    maxLabel.parent("slider-div");

    //number of drops
    let numDropDiv = createDiv().id("numdrop-div"); //containing div
    numDropDiv.parent("sketch-diffusion");
    let numDropLabel = createSpan("Number of drops: "); //label
    numDropLabel.parent("numdrop-div");
    numInput = createInput(numDrops.toString());
    numInput.parent("numdrop-div");

    //color
    let colorDiv = createDiv().id("color-div"); //containing div
    colorDiv.parent("sketch-diffusion");
    let colrLabel = createSpan("Colors: "); //label
    colrLabel.parent("color-div");
    colorPicker1 = createColorPicker(c1);
    colorPicker1.parent("color-div");
    colorPicker2 = createColorPicker(c2);
    colorPicker2.parent("color-div");
    randomCheckbox = createCheckbox("Use random", true);
    randomCheckbox.parent("color-div");

    //reset button
    restartButton = createButton("Reset");
    restartButton.mouseReleased(restartSketch);
    //restartButton.position(0, 0);
    restartButton.parent("sketch-diffusion");
    restartButton.class("reset-button btn btn--inverse");
  }
  //set colormode. HSL - for easy bright random colors, alpha 255 for ease of use with the colorpickers
  colorMode(HSL, 360, 100, 100, 255);
  restartSketch();
}

function draw() {
  //step and draw the drops
  for (let i = 0; i < numDrops; i++) {
    dd[i].step();
    dd[i].display();
  }
  //if in fullscreen mode, check if need to restart the sketch
  if (isFullScreen) {
    currTime = millis();
    if (currTime - startTime > runTime) {
      startTime = currTime;
      restartSketch();
    }
  }
  //my copyright
  fill(0, 0, 100);
  noStroke();
  text(
    String.fromCharCode(0x00a9) + " Danielle Honigstein",
    width - 130,
    height - 5
  );
}

//get random bright color
function getRandomColor() {
  return color(random(0, 360), 80, 50);
}

//update slider value indicator on slider change
function updateSpeedValue() {
  speedValue.html(speedSlider.value());
}
//convert color to hex string
function colorToHexString(c) {
  return (
    "#" +
    hex(round(red(c)), 2) +
    hex(round(green(c)), 2) +
    hex(round(blue(c)), 2)
  );
}
//restart the sketch
function restartSketch() {
  background(0);
  let useRandom = true;
  if (!isFullScreen) {
    //get values from input if exist
    diffusionSpeed = speedSlider.value();
    numDrops = Number(numInput.value());
    useRandom = randomCheckbox.checked();
  }
  c1 = useRandom ? getRandomColor() : colorPicker1.color();
  c2 = useRandom ? getRandomColor() : colorPicker2.color();
  //set alpha, if alpha too high looses all the effect
  c1.setAlpha(10);
  c2.setAlpha(10);
  //update colorpicker values if random
  if (!isFullScreen && useRandom) {
    colorPicker1.value(colorToHexString(c1));
    colorPicker2.value(colorToHexString(c2));
  }
  //create diffusing drop array
  dd = new Array(numDrops);
  for (let i = 0; i < numDrops; i++) {
    //set the color
    let c;
    if (random(2) < 1) {
      c = c1;
    } else {
      c = c2;
    }
    //create each drop
    dd[i] = new DiffusingDrop(
      50,
      new Point(random(width), random(height)),
      c,
      diffusionSpeed
    );
    //draw the drops
    dd[i].display();
  }
}
