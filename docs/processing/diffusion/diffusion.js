var w = window.innerWidth;
var h = window.innerHeight;

let dd;
let numDrops = 100;

let diffusionSpeed = 5;
let c1, c2;
let isFullScreen = true;
//input fields
let speedSlider;
let restartButton;
let speedValue;
let numInput;
let colorPicker1;
let colorPicker2;
let randomCheckbox;

//timing
let runTime = 30000; //ms
let startTime = 0;
let currTime = 0;

function setup() {
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
  const canvas = createCanvas(w, h);
  canvas.parent("sketch-diffusion");
  console.log("isFullScreen " + isFullScreen);
  c1 = getRandomColor();
  c2 = getRandomColor();

  if (!isFullScreen) {
    //add custom css
    // var link = document.createElement( "link" );
    // link.href = "/processing/diffusion/diffusion.css";
    // link.type = "text/css";
    // link.rel = "stylesheet";
    // link.media = "screen,print";
    // document.getElementsByTagName( "head" )[0].appendChild( link );

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
  //stroke(204, 51, 153, 30); //color c1 = color(204,51,153,10);
  colorMode(HSL, 360, 100, 100, 255);
  //color c2 = color(51,51,200,10);
  restartSketch();
}

function getRandomColor() {
  //return color(random(125, 255), random(125, 255), random(125, 255), 10);
  return color(random(0, 360), 80, 50);
}

function updateSpeedValue() {
  speedValue.html(speedSlider.value());
}

function draw() {
  for (let i = 0; i < numDrops; i++) {
    dd[i].step();
    dd[i].display();
  }
  if (isFullScreen) {
    currTime = millis();
    if (currTime - startTime > runTime) {
      startTime = currTime;
      restartSketch();
    }
  }
  fill(0, 0, 100); 
  noStroke();
  text(
    String.fromCharCode(0x00a9) + " Danielle Honigstein",
    width - 130,
    height - 5
  );
}

function colorToHexString(c) {
  return (
    "#" +
    hex(round(red(c)), 2) +
    hex(round(green(c)), 2) +
    hex(round(blue(c)), 2)
  );
}
function restartSketch() {
  background(0);
  let useRandom = true;
  if (!isFullScreen) {
    diffusionSpeed = speedSlider.value();
    numDrops = Number(numInput.value());
    useRandom = randomCheckbox.checked();
  }

  c1 = useRandom ? getRandomColor() : colorPicker1.color();
  c2 = useRandom ? getRandomColor() : colorPicker2.color();
  //   if (c1.mode == 'hsl'){
  //   c1.setAlpha(10/255);
  //   c2.setAlpha(10/255);
  //   }
  //else {
  c1.setAlpha(10);
  c2.setAlpha(10);
  //}
  if (!isFullScreen && useRandom) {
    colorPicker1.value(colorToHexString(c1));
    colorPicker2.value(colorToHexString(c2));
  }
  dd = new Array(numDrops);
  for (let i = 0; i < numDrops; i++) {
    let c;
    if (random(2) < 1) {
      c = c1;
    } else {
      c = c2;
    }
    dd[i] = new DiffusingDrop(
      50,
      new Point(random(width), random(height)),
      c,
      diffusionSpeed
    );
    dd[i].display();
  }
}
