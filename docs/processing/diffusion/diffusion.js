let dd;
let numDrops = 150; //param4
let drawing = true;
let delta = 5; //param 1
//run time - param 5
function setup() {
    const canvas = createCanvas(400,400);
    canvas.parent('sketch-diffusion')
    background(0);
    stroke(204, 51, 153, 30); //color c1 = color(204,51,153,10);
    //color c2 = color(51,51,200,10);
    let c1 = color(random(50, 255), random(50, 255), random(50, 255), 10); //param 2 or random
    let c2 = color(random(50, 255), random(50, 255), random(50, 255), 10); //param 3 or random
    dd = new Array(numDrops);
    for (let i = 0; i < numDrops; i++) {
        let c;
        if (random(2) < 1) {
            c = c1;
        } else {
            c = c2;
        }
        dd[i] = new DiffusingDrop(
            50,
            new Point(random(width), random(height)),
            c,
            delta
        );
        dd[i].display();
    }
}
function draw() {
    for (let i = 0; i < numDrops; i++) {
        dd[i].step();
        dd[i].display();
    }
}
function keyPressed() {
    console.log("key pressed");
    if (drawing) {
        noLoop();
        drawing = false;
    } else {
        loop();
        drawing = true;
    }
}
