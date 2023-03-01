/**
 class representing spheres bursting from a given point. each sphere is a MovingSphere.
 */
class BurstingSpheres {
  /**
   create new BurstingSpheres, with 'numSphere's spheres, starting at point 'start', moving at speed 'speed'
   */
  constructor(numSpheres, c, start, speed) {
    this.numSpheres = numSpheres;
    this.spheres = [];
    let tmp;
    for (let i = 0; i < numSpheres; i++) {
      let dir = createVector(random(-1, 1), random(5, 1));//want them to burst upwards
      //console.log(dir);
      dir.mult(speed); //multiply by given speed
      tmp = new MovingSphere(new p5.Vector(start.x, start.y), dir, c);
      this.spheres.push(tmp);
    }
  } /**
   move all the spheres
   */
  move() {
    for (let i = this.numSpheres - 1; i >= 0; i--) {
      let tmp = this.spheres[i]; //console.log(tmp.toString());

      tmp.draw();
      tmp.move();
      if (!tmp.isVisible()) {
        //remove all spheres
        this.spheres.length = 0;
        return;
      }
    }
  } /**
   return the number of spheres in this BurstingSphere.
   */
  size() {
    return this.spheres.length;
  }
}
