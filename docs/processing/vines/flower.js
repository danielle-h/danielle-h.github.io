/**
 * sketch for showing a growing flower.
 *
 * Copyright 2022 Danielle Honigstein. Free for commercial and personal use with attribution.
 */
class Flower {
  //create new flower at position x,y. Size when done will be 'size' for each petal
  constructor(x, y, size) {
    //position of the flower
    this.x = x;
    this.y = y;
    //size of each petal. For this video I used 10 always but
    //you can play with it
    this.size = size;
    //start with 1/10 of the size and grow
    this.currScale = 0.1;
    //color of the flower
    //rate of growth

    this.delta = 0.03;
    //random pastel like color
    this.c = color(random(150, 255), random(150, 255), random(150, 255));
  }
  //draw, each time increasing the scale by delta until scale = 1;
  draw() {
    if (this.currScale <= 1) {
      //need to push and pop so scales and translations won't get mixed between all the leaves and flowers
      push();
      stroke(0);
      fill(this.c);
      translate(this.x, this.y);
      scale(this.currScale);
      // centre circle
      ellipse(0, 0, this.size, this.size);
      // draw 5 petals, rotating after each one
      for (i = 0; i < 5; i++) {
        ellipse(0, -this.size, this.size, this.size);
        rotate(radians(72));
      }
      pop();
      //update scale
      this.currScale += this.delta;
    }
  }
}
