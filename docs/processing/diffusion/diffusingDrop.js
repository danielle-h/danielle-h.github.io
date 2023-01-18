/**
 * Diffusing drop class. Each drop has a given number of Points who perform a 2D random walk.
 *
 * Copyright 2022 Danielle Honigstein. Free for commercial and personal use with attribution.
 */
class DiffusingDrop {
    //number of points
  numPoints;
  //array of Points
  points;
  //probability to go left/right and up/down
  pX = 0.5;
  pY = 0.5;
  //step size
  delta;
  //drop color
  c;
  //create new diffusing drop
  constructor(numPoints, startPoint, c, delta) {
    this.numPoints = numPoints;
    this.points = new Array(numPoints);
    for (let i = 0; i < numPoints; i++) {
      this.points[i] = new Point().copyFromPoint(startPoint);
    }
    this.c = c;
    this.delta = delta;
  }
  //draw all the points
  display() {
    stroke(this.c);
    for (let i = 0; i < this.numPoints; i++) {
      this.points[i].display();
    }
  }
  //move all the points one step on their random walk
  step() {
    for (let i = 0; i < this.numPoints; i++) {
      let deltaX = this.delta;
      if (random(1) < this.pX) {
        deltaX = -this.delta;
      }
      let deltaY = this.delta;
      if (random(1) < this.pY) {
        deltaY = -this.delta;
      }
      this.points[i].add(new Point(random(1) * deltaX, random(1) * deltaY)); // points[i].add(new Point(random(2)-1,random(2)));
    }
  }
}
