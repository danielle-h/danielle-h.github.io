class Leaf {
    //position of start of leaf
    x;
    y; //angle of leaf in radians
    angle; //maximum scale to reach
    maxScale; //current scale when growing
    currScale; //rate of growth
    delta = 0.03; // variable defining the shape of the leaf
    pointShift; //color of the leaf
    c; // create new leaf at pos (x,y,) with given angle, scale and color
    constructor(x, y, angle, scale, c) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.maxScale = scale;
        this.currScale = 0.1;
        this.pointShift = random(-20, 20);
        this.c = c;
    } //draw leaf and update scale until it has finished "growing"
    draw() {
        // draw a leaf as follows
        if (this.currScale <= this.maxScale) {
            //need to push and pop otherwise gets mixed in all the leaves and flowers
            push();
            translate(this.x, this.y);
            rotate(this.angle);
            scale(this.currScale);
            fill(this.c);
            stroke(0); //for reasons that escape me, putting this in a pshape ruins the shape...
            beginShape(); // start to draw a shape
            vertex(0, 0); // begin at this point x, y
            bezierVertex(
                10,
                -15,
                40 + this.pointShift,
                -5 + this.pointShift / 2,
                50 + this.pointShift,
                0
            ); // make the pointy end of the leaf vary on the x axis (so the leaf gets longer or shorter) AND vary the y axis of the control points by the same amount. It should be possible to have 'normal' leaves, very short fat ones and very long thin ones.
            bezierVertex(40 + this.pointShift, 10, 10, 25, 0, 0); // draw the other half of the shape
            endShape();
            pop(); //update scale
            this.currScale += this.delta;
        }
    }
}
