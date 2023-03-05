let spheres = [];
let randomTime = false;
let burstTime = 0;
let lastBurstTime = 0;
let currBurstTime = 0;


//text
let pg;
let margin = 4;

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
  else{
    randomTime = true;
    burstTime = random(200,1000);
  }
  copyrightX = w-220;
  copyrightY = h -70;
  console.log("width: " + w +" height: " + h + " cX: " + copyrightX + " cY: " + copyrightY)

  //create canvas and connect to html page
  const canvas = createCanvas(w, h, WEBGL);
  pg = createGraphics(w-margin,h-margin);
  pg.fill(0)
  //stroke(0)
  pg.text(String.fromCharCode(0x00a9) + " Danielle Honigstein", w- margin - 130, h-margin - 10);
  canvas.parent("sketch-spheres");

  //drawing variables
  ortho();
  noStroke();
  colorMode(HSB, 360, 100, 100);
  //create a burst at the beginning
  pushSpheres(0,0);
  
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

  //random bursts
  if (randomTime){
    currBurstTime = millis();
    if (currBurstTime - lastBurstTime > burstTime){
      pushSpheres(random(-width/2,width/2),random(-height/2,height/2));
      burstTime = random(200,1000);
      lastBurstTime = currBurstTime;
    }
  }

  //my copyright
  //pass graphics as texture
  pg.fill(0);
  texture(pg);
  plane(w-margin,h-margin);

  console.log(spheres.length)
}
/**
 * create new on mouse click
 */
function mouseClicked() {
  pushSpheres(mouseX - width / 2, mouseY - height / 2);
  
}

/**
 * create new burstingSpheres at point x,y
 */
function pushSpheres(x,y){
  spheres.push(
    new BurstingSpheres(
      5,
      color(random(0, 360), random(20, 60), random(30, 60)),
      new p5.Vector(x, y),
      -1
    )
  );

}
