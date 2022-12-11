function setup() {
    const canvas = createCanvas(400, 400);
    canvas.parent('sketch-holder')
    noStroke();
    rectMode(CENTER);
    console.log("hi!");
  }
  
  function draw() {
    background(51);
    fill(255, 204);
    rect(mouseX, height/2, mouseY/2+10, mouseY/2+10);
    fill(255, 204);
    inverseX = width-mouseX;
    inverseY = height-mouseY;
    rect(inverseX, height/2, (inverseY/2)+10, (inverseY/2)+10);
  }