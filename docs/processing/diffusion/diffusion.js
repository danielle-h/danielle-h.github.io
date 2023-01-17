var w = window.innerWidth;
var h = window.innerHeight; 

let dd;
let numDrops = 150; //param4
let drawing = true;
let diffusionSpeed = 5; //param 1
let isFullScreen = true;
//input fields
let speedSlider;
let restartButton;
let speedValue;

//run time - param 5
function setup() {
    let params = getURLParams();
    if (params.fullscreen != "true"){
      w = 400;
      h = 400;
      isFullScreen = false;

    }
    const canvas = createCanvas(w,h);
    canvas.parent('sketch-diffusion')
    console.log("isFullScreen " + isFullScreen)

    if (!isFullScreen){
        //add custom css
        var link = document.createElement( "link" );
        link.href = "/processing/diffusion/diffusion.css";
        link.type = "text/css"; 
        link.rel = "stylesheet";
        link.media = "screen,print";
        document.getElementsByTagName( "head" )[0].appendChild( link );

        //create slider for diffusionSpeed
        let sliderDiv = createDiv();//containing div
        sliderDiv.id('slider-div');
        sliderDiv.parent('sketch-diffusion');
        
        let speedLabel = createSpan("Diffusion speed: "); //label
        speedLabel.parent('slider-div');
        speedValue = createSpan(diffusionSpeed); //value
        speedValue.parent('slider-div');
        createDiv().parent('slider-div');;

        let minLabel = createSpan("1"); //left label - min
        minLabel.parent('slider-div');

        speedSlider = createSlider(1,10,5); //slider
        speedSlider.parent('slider-div');
        speedSlider.class("slider");
        speedSlider.input(updateSpeedValue)
        let maxLabel = createSpan("10"); //right label - max
        maxLabel.parent('slider-div')

        //reset button
        restartButton = createButton("Reset");
        restartButton.mouseReleased(restartSketch);
        //restartButton.position(0, 0);
        restartButton.parent('sketch-diffusion');
        restartButton.class("reset-button btn btn--inverse");

    }
    stroke(204, 51, 153, 30); //color c1 = color(204,51,153,10);
    //color c2 = color(51,51,200,10);
    restartSketch();
    
}

function updateSpeedValue(){
    speedValue.html(speedSlider.value());
}


function draw() {
    for (let i = 0; i < numDrops; i++) {
        dd[i].step();
        dd[i].display();
    }
}

function restartSketch(){
    background(0);
    diffusionSpeed = speedSlider.value();
    console.log(diffusionSpeed);
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
            diffusionSpeed
        );
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
