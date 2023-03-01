class MovingSphere {
  /**
  Create a moving sphere at center 'center', moving in direction 'dir', of color 'c'
  */
  constructor(center, dir, c) {
    this.gravity = new p5.Vector(0, 0.2);
    this.center = center;
    this.dir = dir;
    this.c = c;
    this.radius = 20;
    this.radiusStep = 0.1;
  } /**
  draw the sphere.
  */
  draw() {
    directionalLight(
      hue(this.c),
      saturation(this.c),
      brightness(this.c),
      200,
      200,
      -200
    );

    emissiveMaterial(hue(this.c), saturation(this.c), brightness(this.c));
    translate(this.center.x, this.center.y);
    sphere(this.radius);
    translate(-this.center.x, -this.center.y);
  }
  /**
   * move the sphere and add gravity
   */
  move() {
    this.center.add(this.dir);
    //console.log(this.center);

    this.dir.add(this.gravity);
    this.radius = this.radius - this.radiusStep;
  }

  /**
  String representation of sphere for debug.
  */
  toString() {
    return "center: " + this.center + "dir: " + this.dir;
  }

  /**
  check if sphere is visible (in the screen, + 50 pixels padding).
  */
  isVisible() {
    return (
      this.center.x > -width / 2 - 50 &&
      this.center.x < width / 2 + 50 &&
      this.center.y > -height / 2 - 50 &&
      this.center.y < height / 2 + 50
    );
  }
}
