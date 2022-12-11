class Vine {

    //create new Vine at position (x,y), growing at the given angle, with start radius of rad and color (0,green,blue)
    constructor( x,  y,  angle,  rad,  g,  b) {
      this.previousTime = 0;
      this.currTime = 0;
      this.delta = 50;//milliseconds -- play with this for growth speed, time in main for branching speed
        //growth direction - specifically for this point
  
      this.dir = new p5.Vector()
        //position of current circle
  
      this.x = x;
      this.y = y;
        //growth angle
  
      this.angle = angle;
    //radius of current circle
  
      this.rad =rad;
//      console.log(rad)
      //console.log(this.rad)
        //color of circle - green (g) and blue(b)
  
      this.g = g;
      this.b = b;
  
      //if using safeArea, decide if turning left or right
      let ran = random(-1, 1);
      if (ran>0) {
        this.turnLeft = true;
      }
    }
  
    //overloaded constructor with pos(x,y) , angle 0, rad = 20 and random color
    static fromPos( x,  y) {
      return new this(x, y, 0.0, 20, random(255), random(255));
    }
  
    //overloaded constructor with pos(x,y) , given angle, rad = 20 and random color
    static fromPosAndAngle( x,  y,  angle) {
      return new this(x, y, angle, 20, random(255), random(255));
    }
  
    //are we done growing? (radius too small)
    done() {
      return this.rad < 1;
    }
  
    //create new branch. Here branches are purpusefully small but you can play with these parameters
    spawn() {
        if (this.rad>5) {//don't create if too small, looks weird.
          if (this.x>0 && this.x<width && this.y>0 && this.y < height) {//don't create if out of screen
            //randomly create to the left or right
             let ran = random(-1, 1);
             var left = true;
            if (ran<0) {
              left = false;
            }
    
            if (left) {
              return new Vine(this.x, this.y, random(this.angle - HALF_PI/2, this.angle - HALF_PI/4), min(this.rad, 5), this.g, this.b);
            } else {
              return new Vine(this.x, this.y, random(this.angle  + HALF_PI/4, this.angle + HALF_PI/2), min(this.rad, 5), this.g, this.b);
            }
          }
        }
        return null;
      }

  //draw and update
   draw() {
    this.currTime = millis();
     //console.log(this.rad)
    if (this.currTime-this.previousTime>this.delta) {//draw if time passed
      this.previousTime = this.currTime;
      //update color
      this.g += random(-10, 10);
      this.g = constrain(this.g, 100, 255);

      this.b += random(-10, 10);
      this.b = constrain(this.b, 100, this.g);
      //draw new circle
      fill(0, this.g, this.b);
      stroke(0, this.g, this.b);
      //console.log(this)
      circle(this.x, this.y, this.rad);
      
      //calculate durection of next point
      //first assuming we are drawing a sine wave on the y axis
      this.dir = new p5.Vector( 2*sin(0.03*(this.y-height)), -this.rad/3);
      //and then rotate by the given angle
      this.dir.rotate(this.angle);

      
      
      //update position and radius of next circle
      this.x = this.x + this.dir.x;
      this.y = this.y + this.dir.y;
      this.rad = this.rad + random(-0.4, 0.2);
    }
  }
  
    //draw and update
     draw() {
      this.currTime = millis();
       //console.log(this.rad)
      if (this.currTime-this.previousTime>this.delta) {//draw if time passed
        this.previousTime = this.currTime;
        //update color
        this.g += random(-10, 10);
        this.g = constrain(this.g, 100, 255);
  
        this.b += random(-10, 10);
        this.b = constrain(this.b, 100, this.g);
        //draw new circle
        fill(0, this.g, this.b);
        stroke(0, this.g, this.b);
        //console.log(this)
        circle(this.x, this.y, this.rad);
        
        //calculate durection of next point
        //first assuming we are drawing a sine wave on the y axis
        this.dir = new p5.Vector( 2*sin(0.03*(this.y-height)), -this.rad/3);
        //and then rotate by the given angle
        this.dir.rotate(this.angle);
  
        
        
        //update position and radius of next circle
        this.x = this.x + this.dir.x;
        this.y = this.y + this.dir.y;
        this.rad = this.rad + random(-0.4, 0.2);
      }
    }
  }