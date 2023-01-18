/**
 * 2D Point object, with x,y position.
 *
 * Copyright 2022 Danielle Honigstein. Free for commercial and personal use with attribution.
 */
class Point {
    x = 0;
    y = 0;
    //default constructor
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }
    //copy from another point
    copyFromPoint(other){
        this.x = other.x;
        this.y = other.y;
        return this;
       }
    //draw the point
    display() {
        point(this.x, this.y);
    }
    //add another point to this one
    add(other) {
        this.x += other.x;
        this.y += other.y;
    }
}
