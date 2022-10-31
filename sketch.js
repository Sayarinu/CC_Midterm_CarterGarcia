/*
Requirements:
  Must have:
    Heavy use of variables
    Custom functions passiong variables as parameters
    loops
    control sequences
    math or random
    some use of interaction or change over time
    movement, change, variety
    conditionals
    OOP - Methods + passing parameters

    **SHOULD BE GREATER THAN 100 LINES**

  Explore:
    Color, size, opacity
    Collection of them are drawn, create patterns and textures
  
  Sketch for this Drawing is in the PDF in the main of the project

  Sketch is in 3 different scenes that each tell a different part
*/

/*
Author: Carter Garcia
Creative Coding Midterm Project
Adjective: Abrasive
*/

/*
Globals:
*/
let angle = 0;
let explosion = [];
let explosionPos = [];
let explosionVel = [];
let explosionAcc = [];
/*
Class Definitions:
*/

/*
class Explosion {
  constructor(position, velocity, acceleration) {
    this.position = position; // Can do this.position.x or y to access values
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.maxspeed = 5;
  }

  display() {
    noStroke();
    fill('red');
    ellipse(this.position.x, this.position.y, 25, 25);
  }

  update() {
    this.position.add(this.velocity);
    if ((this.position.x > width) || (this.position.x < 0)) {
      this.velocity.x = -this.velocity.x;
    }
    if ((this.position.y > height) || (this.position.y < 0)) {
      this.velocity.y = -this.velocity.y;
    }
  }

  accelerate() {
    this.velocity.mult(1.01);
    this.velocity.limit(this.maxspeed);
  }
}
*/

class Saw { 
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    rect(this.x, this.y, this.size, this.size);
    rotate(Math.PI / 6);
  }
}

// This will be the person in the drawing, they will have their dimensions set by the constructor
// They will be represented as a circle in the drawing in an almost balloon like feel
// Scared of being popped

class Person {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    fill('red');
    stroke('red');
    ellipse(this.x, this.y, this.size);
    
  }

  update(x, y) {
    this.x += x;
    this.y += y;
  }
}

// Class to define the spikes on the first scene (this does most of the work)
class SceneOneSpikes {
  constructor(x, y, lowerY, offset) {
    this.x = x;
    this.y = y;
    this.lowerY = lowerY;
    this.offset = offset;
  }
  display() {
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';

    for (let i = 0; i < 14; i++) {
      context.beginPath();
      context.strokeStyle = 'white';
      context.moveTo(this.x, this.y);
      context.lineTo(this.x + 30, this.y + 150 + this.offset);
      context.lineTo(this.x + 60, this.y);
      context.fill();
      this.x += 60;
    }

    this.x = -25;
    
    for (let i = 0; i < 14; i++) {
      context.beginPath();
      context.strokeStyle = 'white';
      context.moveTo(this.x, this.lowerY);
      context.lineTo(this.x + 30, this.lowerY - 150 - this.offset);
      context.lineTo(this.x + 60, this.lowerY);
      context.fill();
      this.x += 60;
    }

    ellipse(400, 800, 300, 300);
  }

  updateOffset(newOffset) {
    this.offset = newOffset;
  }

}

/*
Function Definitions:
*/

function sceneOne() {
  background(0);
  spikes.display();
  if (millis() < 750) {
    circularObject(person);
  } else {
    fill(255, 0, 0, random(100, 200));
    ellipse(400, 650, 100, 100);
    lineFlurry();
  }
/*
  for (let i = 0; i < 100; i+= 1) {
    explosion[i].update();
    explosion[i].display();
  }
*/
}

function circularObject(obj) {
  translate(400, 470);
  stroke(255);
  rotate(angle);
  fill(255);
  obj.display();
  angle += 1;
}

function lineFlurry() {
  const ctx = canvas.getContext('2d');
  // set line stroke and line width
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;
  
      // draw a red line
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(400, 650);
    ctx.lineTo(random(200, 600), random(300, 600));
    ctx.stroke();
    ctx.closePath();
  }
}

/*
function drawLine(x1, y1, x2, y2, stroke, ctx) {
  ctx.strokeStyle = 'red';
  ctx.lineWidth = stroke;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawCircle(x1, y1, radius, stroke, ctx) {
  ctx.strokeStyle = 'red';
  ctx.lineWidth = stroke;
  ctx.beginPath();
  ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

function fillCircle(x, y, radius, ctx) {
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}
*/
person = new Person(100, 100, 100);
spikes = new SceneOneSpikes(-25, -50, 850, 0);


function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  background(0);
  /*
  for (let i = 0; i < 20; i++) {
    explosionPos[i] = createVector(0, 700);
    explosionVel[i] = createVector(random(-5, 5), random(0, 5));
    explosion[i] = new Explosion(explosionPos[i], explosionVel[i], explosionAcc[i]);
  }
  */
}


/*
Draw loop of the project
*/

function draw() {
  // Code for Scene 1 of the project
  /*
  background(0);
  spikes.display();
  circularObject(person);
  */
  sceneOne();
}
