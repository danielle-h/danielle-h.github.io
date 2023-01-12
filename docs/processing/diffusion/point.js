class Point {
    x = 0;
    y = 0;
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }
    copyFromPoint(other){
        this.x = other.x;
        this.y = other.y;
        return this;
       }
    
    display() {
        point(this.x, this.y);
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
    }
}
