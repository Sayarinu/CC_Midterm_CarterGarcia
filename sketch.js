/*
Requirements:
  Must have:
    Heavy use of variables ** INCLUDED **
    Custom functions passiong variables as parameters ** INCLUDED **
    loops ** INCLUDED ** 
    control structures ** INCLUDED **
    math or random ** INCLUDED **
    some use of interaction or change over time ** INCLUDED **
    movement, change, variety ** INCLUDED **
    conditionals ** INCLUDED **
    OOP - Methods + passing parameters ** INCLUDED **

    **SHOULD BE GREATER THAN 100 LINES** ** INCLUDED **

  Explore:
    Color, size, opacity ** INCLUDED **
    Collection of them are drawn, create patterns and textures ** INCLUDED **
  
  Sketch for this Drawing is in the PDF in the main of the project

  Sketch is in 3 different scenes that each tell a different part
*/

/*
Author: Carter Garcia
Creative Coding Midterm Project
Adjective: Abrasive
*/

// Globals:

let r;

// Explosion of balls (bits)
let angle = -180; // Starts the angle at -180 degrees for scene 1
let bits = [] // array that holds the bit objects
let positions = [] // holds the position of the bits
let velocities = [] // holds the velocity of the bits
let accelerations = [] // holds the acceleration of the bits

// Sinusoidal orbs eminating
let particles = []
let particlePos = []
let xPosWave;
let yPosWave;

// Class Definitions:

class Waves {
  constructor(position, offset) {
    this.position = position;
    this.offset = offset;
  }

  display(r, g, b, o) {
    translate(this.position.x, this.position.y);
    fill(r, g, b);
    stroke(r, g, b);
    beginShape();
      for (let i = 0; i < 359; i++) {
        let r1Min = map(sin(frameCount * this.offset), -1, 1, 10, 20 + 4 * this.offset);
        let r1Max = map(sin(frameCount * 2), -1, 1, 10, 0);

        let r2Min = map(sin(frameCount / this.offset), -1, 1, 20 + 4 * this.offset, 10);
        let r2Max = map(sin(frameCount), -1, 1, 0, 10);

        let r1 = map(sin(i * 3), -1, 1, r1Min, r1Max);
        let r2 = map(sin(i * 6 + 90), -1, 1, r2Min, r2Max);

        let r = r1 + r2;
        let x = r * cos(i);
        let y = r * sin(i);
        vertex(x, y);
      }
    endShape();
    translate(-1 * this.position.x, -1 * this.position.y);
  }

  update() { // add the velocity vector to create speed
    if (this.position.x < 400) {
      this.position.add(createVector(-.3, -.5));
    } else {
      this.position.add(createVector(.3, -.5));
    }
  }

}

// The bits that explode when the ball does
class Bit {
  constructor(position, velocity, acceleration) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration
  }

  display(red, green, blue) { // Display function passed colors to create the color of the image we want
    stroke(0);
    fill(red, green, blue); // fills in the passed colors
    if (this.position.y < 800) { // when they go off screen stop making them
      circle(this.position.x, this.position.y, 25);
    }
  }

  update() { // add the velocity vector to create speed
    this.position.add(this.velocity);
  }

  accelerate() { // accelerate as they go
    this.velocity.mult(1.1);
  }
}

// This will be the person in the drawing, they will have their dimensions set by the constructor
// They will be represented as a circle in the drawing in an almost balloon like feel
// Scared of being popped
class Person { // orb object in scene 1, will have functionality in some of the other scenes
  constructor(x, y, size) { // Constructor with size and position
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() { // Displays the ball (person in the context of the sketch)
    fill('red');
    stroke('red');
    ellipse(this.x, this.y, this.size);
  }
  update() {
    return this.y - 0.5;
  }
}











// Creates spikes on the bottom and the saw object for scene 1
class SceneOneSpikes { 
  constructor(x, y, lowerY, offset) {
    this.x = x;
    this.y = y;
    this.lowerY = lowerY;x
    this.offset = offset;
  }
  display() {
    const context = canvas.getContext('2d');
    context.fillStyle = '#AAA9AD';
    context.strokeStyle = '#AAA9AD';

    for (let i = 0; i < 14; i++) {
      if (i < 5 || i > 8) {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + 30, this.y + 150 + this.offset);
        context.lineTo(this.x + 60, this.y);
        context.fill();
      }
      this.x += 60;
    }

    this.x = -25;
    
    for (let i = 0; i < 14; i++) {
      if (i < 4 || i > 9) {
        context.beginPath();
        context.moveTo(this.x, this.lowerY);
        context.lineTo(this.x + 30, this.lowerY - 150 - this.offset);
        context.lineTo(this.x + 60, this.lowerY);
        context.fill();
      }
      this.x += 60;
    }
    stroke(255, 255, 224);
    fill(255,255,224);
    ellipse(400, 800, 300, 300);
  }

  updateOffset(newOffset) {
    this.offset = newOffset;
  }

}

//Function Definitions:

// Does the code for scene one
function sceneOne() { 
  background(0);
  spikes.display();
  if (angle <= 44) {
    circularObject(person);
  } else {
    let opacity = random(200, 255);
    stroke(255, 0, 0, opacity);
    fill(255, 0, 0, opacity);
    if (millis() < 5000) {
      ellipse(400, 600, 100, 100);
      lineFlurry();
    } else if (millis() < 8000 && millis() > 5000) {
      ellipse(400 + (random(-10, 10)), 600 + random(-10, 10), 100, 100);
      lineFlurry();
    } else if (millis() > 8000 && millis() < 13000) {
      for (let i = 0; i < 50; i += 1)  {
        bits[i].update();
        bits[i].display(random(0, 255), random(0, 25), random(0,25));
      }
    }
  }
}

// Code for scene two
function sceneTwo() { 
  background(30);
  stroke(255);
  noFill();
  for (let i = 0; i <= 10; i++) {
    particles[i].update();
    particles[i].display(random(0, 255), random(0, 255), random(0,255), random(0, 255));
  }
  abrasivePerson.display();
  if (abrasivePerson.update() > 400) {
    abrasivePerson = new Person(400, abrasivePerson.update(), 100);
  } else if (millis() < 30000) {
    ellipse(400 + (random(-10, 10)), 400 + random(-10, 10), 100, 100);
  } else if (millis() < 35000) {
    ellipse(400 + (random(-10, 10)), 400 + random(-10, 10), 100, 100);
    if (r >= 100 && r <= 500) {
      drawCircle();
    } else {
      r = 100;
    }
  } else if (millis() < 35050 && r > 100 && millis() > 35000) {
    r = 100;
  } else {
    ellipse(400 + (random(-10, 10)), 400 + random(-10, 10), 100, 100);
    drawCircle();
  }
}

// Code for scene three
function sceneThree() { 
  background(255);
}

// Moves the object in the circle no matter what object it is   
//(passed any object with a display fucntion)
function circularObject(obj) { 
  translate(400, 470);
  stroke(255);
  rotate(angle);
  fill(255);
  obj.display();
  angle += 1;
}

function lineFlurry() { // Flurry of lines for scene 1
  const ctx = canvas.getContext('2d');
  // set line stroke and line width
  ctx.strokeStyle = "#"+((1<<24)*Math.random()|0).toString(16);
  ctx.lineWidth = 5;
  
  // draw a random color line
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(400, 650);
    ctx.lineTo(random(200, 600), random(300, 600));
    ctx.stroke();
    ctx.closePath();
  }
}

function drawCircle() {
  stroke(255, 0, 0);
  noFill();
  circle(400, 400, r);
  r += 4;
}

// Globally initialized Objects for scene 1
person = new Person(100, 100, 100);
spikes = new SceneOneSpikes(-25, -50, 850, 0);

// Person for scene 2;
abrasivePerson = new Person(400, 800, 100);

// Setup function
function setup() { 
  createCanvas(800, 800); // Canvas size is 800 x 800
  angleMode(DEGREES); // Sets our angles to degrees for easier math
  background(0);

  for (let i = 0; i <= 50; i++) { // Fills our arrays of bits
    positions[i] = createVector(400, 650); // Creates the spawn point of the balls
    velocities[i] = createVector(random(-1, 1), -random(2, 5)); // Makes them move upward in a cone
    // Creates the new bit object and stores it in the array
    bits[i] = new Bit(positions[i], velocities[i], accelerations[i], red, green, blue);
  }
  for (let i = 0; i <= 10; i++) {
    particlePos[i] = createVector(random(200, 600), random(600, 700));
    particles[i] = new Waves(particlePos[i], random(2, 12));
  }
  r = 100;
}

//Draw loop of the project
function draw() { 
  // Code for Scene 1 of the project
  if (millis() < 13000) {
    sceneOne(); // Calls Scene One
  } else if (millis() > 13000 && r < 1000) {
    sceneTwo();
  } else {
    sceneThree();
  }
}