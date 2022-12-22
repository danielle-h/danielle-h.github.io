

  
  var vines = new Array();
  var flowers = new Array()
  var leaves = new Array()
  let spawnTime = 500;//ms
  var prevTime = 0;
  var currTime = 0;
  var numVines = 1;
  let maxVines = 15;

  var w = window.innerWidth;
  var h = window.innerHeight; 
  
  
  function setup(){
    let params = getURLParams();
    if (params.fullscreen != "true"){
      w = 400;
      h = 400;
    }
    if (params.maxVines){
      maxVines = params.maxVines;
    }
    console.log(params);
    const canvas = createCanvas(w, h);
    canvas.parent('sketch-holder')
    vines.push(Vine.fromPosAndAngle(random(10, width-10), float(height-30), random(-HALF_PI/3, HALF_PI/3)));
    background(0)
  }
  
  function draw(){
    currTime = millis()
    vines.forEach(function(vine) {vine.draw()})
    if (currTime - prevTime > spawnTime){
      prevTime = currTime
      if (vines.length>0) {
        t = vines[0].spawn();
        if (t!=null) {//t is null if parent branch is too small
          vines.push(t);
        }
      }
  
    }
    //remove vines that have stopped growing or out of the screen
    for (i = vines.length-1; i >= 0; i--) {
      t = vines[i];
  
      if (t.done()) {//draw flower or leaf at the end of the vine
        if (random(-1, 1) > 0) {
          flowers.push(new Flower(t.x, t.y, 10.0));
        } else {
          leaves.push(new Leaf(t.x, t.y, t.dir.heading(), random(0.7, 1.2), color(0, t.g, t.b)));
        }
        vines.splice(i,1);
        break;//no need to remove it again below...
      }
      if (t.x < -20 || t.x > width + 20 || t.y < -20 || t.y > height + 20) {
        vines.splice(i,1);
      }
    }
    //console.log(vines.length)
    if (vines.length == 0){
      vines.push(Vine.fromPosAndAngle(random(10, width-10), float(height-30), random(-HALF_PI/3, HALF_PI/3)));
      numVines = numVines +1;
      if (numVines >= maxVines){
        background(0)
        numVines = 1
      }
    }

    flowers.forEach(function (flower) {
      flower.draw()
    })

    leaves.forEach(function (leaf) {
      leaf.draw()
    })
  
  }