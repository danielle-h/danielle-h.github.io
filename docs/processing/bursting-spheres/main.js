let spheres = [];

//fullscreen
let isFullScreen = true;
//width and height for fullscreen option
var w = window.innerWidth;
var h = window.innerHeight;

function setup() {
  //get parameters from url if any
  let params = getURLParams();
  if (params.fullscreen != "true") {
    w = 400;
    h = 400;
    isFullScreen = false;
  }

  //create canvas and connect to html page
  const canvas = createCanvas(w, h, WEBGL);
  canvas.parent("sketch-spheres");

  //drawing variables
  ortho();
  noStroke();
  colorMode(HSB, 360, 100, 100);
  //create a burst at the beginning
  spheres.push(
    new BurstingSpheres(
      5,
      color(random(0, 360), random(20, 85), random(50, 70)),
      new p5.Vector(0, 0),
      -1
    )
  );
}
/**
 * Draw the bursting spheres
 */
function draw() {
  background(200, 30, 90);
  for (let i = spheres.length - 1; i > -1; i--) {
    //move existing spheres
    let tmp = spheres[i];
    tmp.move();
    if (tmp.size() == 0) {
      //remove empty spheres
      spheres.splice(i, 1);
    }
  }
}
/**
 * create new on mouse click
 */
function mouseClicked() {
  let center = new p5.Vector(mouseX - width / 2, 0, mouseY);
  spheres.push(
    new BurstingSpheres(
      5,
      color(random(0, 360), random(20, 60), random(30, 60)),
      new p5.Vector(mouseX - width / 2, mouseY - height / 2),
      -1
    )
  );
}

