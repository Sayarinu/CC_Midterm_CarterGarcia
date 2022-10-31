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
let angle = -180; // Starts the angle at -180 degrees for scene 1

let bits = [] // array that holds the bit objects

let positions = [] // holds the position of the bits
let velocities = [] // holds the velocity of the bits
let accelerations = [] // holds the acceleration of the bits
/*
Class Definitions:
*/

// The bits that explode when the ball does
class Bit {
  constructor(position, velocity, acceleration) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration
    this.maxspeed = 10;
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
    this.velocity.limit(this.maxspeed);
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
}

// Class to define the spikes on the first scene (this does most of the work)
class SceneOneSpikes { // Creates spikes on the bottom and the saw object for scene 1
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

/*
Function Definitions:
*/

function sceneOne() { // Does the code for scene one
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
    } else {
      sceneTwo();
    }
  }
}

function sceneTwo() { // Code for scene two
  background(255);
}

function sceneThree() { // Code for scene three

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
  
  // draw a red line
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(400, 650);
    ctx.lineTo(random(200, 600), random(300, 600));
    ctx.stroke();
    ctx.closePath();
  }
}
// Globally initialized Objects for scene 1
person = new Person(100, 100, 100);
spikes = new SceneOneSpikes(-25, -50, 850, 0);

// Setup function
function setup() { 
  createCanvas(800, 800); // Canvas size is 800 x 800
  angleMode(DEGREES); // Sets our angles to degrees for easier math
  background(0);

  for (let i = 0; i <= 50; i += 1) { // Fills our arrays of bits
    positions[i] = createVector(400, 650); // Creates the spawn point of the balls
    velocities[i] = createVector(random(-1, 1), -random(2, 5)); // Makes them move upward in a cone
    // Creates the new bit object and stores it in the array
    bits[i] = new Bit(positions[i], velocities[i], accelerations[i], red, green, blue); 
  }
}


/*
Draw loop of the project
*/

function draw() { 
  // Code for Scene 1 of the project
  sceneOne(); // Calls Scene One
}
