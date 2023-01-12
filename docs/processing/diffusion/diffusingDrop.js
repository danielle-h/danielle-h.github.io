class DiffusingDrop {
    numPoints;
    points;
    pX = 0.5;
    pY = 0.5;
    delta;
    c;
    constructor(numPoints, startPoint, c, delta) {
        this.numPoints = numPoints;
        this.points = new Array(numPoints);
        for (let i = 0; i < numPoints; i++) {
            this.points[i] = new Point().copyFromPoint(startPoint);
        }
        this.c = c;
        this.delta = delta;
    }
    display() {
        stroke(this.c);
        for (let i = 0; i < this.numPoints; i++) {
            this.points[i].display();
        }
    }
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
            this.points[i].add(
                new Point(random(1) * deltaX, random(1) * deltaY)
            ); // points[i].add(new Point(random(2)-1,random(2)));
        }
    }
}
