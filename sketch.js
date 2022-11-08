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
let horizX, horizY;
let circSize;
let circHeight;
let fallingHeight;
let fade;

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
    noFill();
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
    if (millis() < 30000) {
      if (this.position.x < 400 && this.position.x > 200)  {
        this.position.add(createVector(-.3, -.75));
      } else if (this.position.x > 400 && this.position.x < 600){
        this.position.add(createVector(.3, -.75));
      }
    } 
    else if (millis() > 30000 && r < 1800) {
      if (this.position.x < 400 && this.position.y < 400)  {
        this.position.add(createVector(-.4, -.5));        
      } else if (this.position.x < 400 && this.position.y > 400) {
        this.position.add(createVector(-.4, .5));
      } else if (this.position.x > 400 && this.position.y > 400) {
        this.position.add(createVector(.4, .5));
      } else {
        this.position.add(createVector(.4, -.5));
      }
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
    let result;
    if (this.y > 400) {
      result = this.y - 0.5;
    } else if (millis() > 39000 && r == 100) {
      result = this.y + 0.5;
    }
    return result;
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
function sceneThree() { 
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#AAA9AD';
  ctx.strokeStyle = '#AAA9AD';
  background(0);
  spikes.display();
  horizX = 0;
  horizY = 0;
  for (let i = 0; i < 14; i++) {
    ctx.beginPath();
    ctx.moveTo(horizX, horizY);
    ctx.lineTo(horizX + 150, horizY + 30);
    ctx.lineTo(horizX, horizY + 60)
    ctx.fill();
    ctx.closePath();
    horizX = 800;
    ctx.beginPath();
    ctx.moveTo(horizX, horizY);
    ctx.lineTo(horizX - 150, horizY + 30);
    ctx.lineTo(horizX, horizY + 60)
    ctx.fill();
    ctx.closePath();
    horizX = 0;
    horizY += 60;
  }
  if (fallingHeight < 600) {
    fill('red');
    stroke(0);
    circle(400, fallingHeight, 100);
    fallingHeight += 5;
  } else {
    let opacity = random(200, 255);
    stroke(255, 0, 0, opacity);
    fill(255, 0, 0, opacity);
    if (millis() < 53000) {
      ellipse(400, 600, 100, 100);
      lineFlurry(10, 200, 600, 300, 600, 400, 650);
    } else if (millis() < 56000 && millis() > 53000) {
      ellipse(400 + (random(-10, 10)), 600 + random(-10, 10), 100, 100);
      lineFlurry(10, 200, 600, 300, 600, 400, 650);
    } else if (millis() > 56000 && millis() < 61000) {
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
    particles[i].display(0, 0, random(0,255), random(0, 255));
  }
  if (abrasivePerson.update() > 400) {
    abrasivePerson.display();
    abrasivePerson = new Person(400, abrasivePerson.update(), 100);
  } else if (millis() < 30000) {
    ellipse(400 + (random(-10, 10)), 400 + random(-10, 10), 100, 100); // sphere begins to shake
  } else if (millis() < 35000) {
    ellipse(400 + (random(-10, 10)), 400 + random(-10, 10), 100, 100);
    if (r >= 100 && r <= 500) {
      drawCircle();
    } else {
      r = 100;
    }
  } else if (millis() < 35050 && r > 100 && millis() > 35000) {
    r = 100;
  } else if (millis() > 35000 && r < 1800 && millis() < 39000){
    ellipse(400 + (random(-10, 10)), 400 + random(-10, 10), 100, 100);
    drawCircle();
  } else if (millis() > 39000 && r != 100) {
    drawCircle();
  } else {
    fill('red');
    circle(400, circHeight, 100);
    lineFlurry(20, 0, width, 0, height, 400, circHeight);
    circHeight += 1;
  }
}

// Code for scene three
function sceneOne() { 
  background(random(30));
  if (millis() < 13000) {
    for (let i = 0; i < 100; i++) {
      if (random(0, 50) < 25) {
        noFill();
      } else {
        if (millis() < 9000) {
          fill(random(255), random(255), random(255));
        }
        else if (millis() < 11000) {
          fill(random(255), random(255), random(255), random(100, 200)); 
        } else if (millis() < 12500) {
          fill(random(255), random(255), random(255), random(0, 100)); 
        }
      }
      triangle(random(width), random(height), random(width), random(height), random(width), random(height));
    }
  }
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

function lineFlurry(amount, xMin, xMax, yMin, yMax, locationX, locationY) { // Flurry of lines for scene 1
  const ctx = canvas.getContext('2d');
  // set line stroke and line width
  ctx.strokeStyle = "#"+((1<<24)*Math.random()|0).toString(16);
  ctx.lineWidth = 5;
  
  // draw a random color line
  for (let i = 0; i < amount; i++) {
    ctx.beginPath();
    ctx.moveTo(locationX, locationY);
    ctx.lineTo(random(xMin, xMax), random(yMin, yMax));
    ctx.stroke();
    ctx.closePath();
  }
}

function drawCircle() {
  stroke(255, 0, 0);
  if (millis() < 35050) {
    noFill();
  }
  else {
    fill('red');
  }
  circle(400, 400, r);
  if (millis() < 39000) {
    r += 4;
  } else {
    r -= 4;
  }
}

// resets our variables for the loop
function resetVars() {
  r = 100;
  circHeight = 400;
  circSize = 100;
  fallingHeight = 0;
  fade = 255;
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
  resetVars();
}

//Draw loop of the project
function draw() { 
  // Code for Scene 1 of the project
  if (millis() < 13000) {
    sceneOne(); // Calls Scene One
  } else if (millis() > 13000 && circHeight != 800) {
    sceneTwo();
  } else if (circHeight == 800 && millis() < 65000) {
    sceneThree();
  }
}