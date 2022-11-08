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

let r; // radius of circle in scene 2
let horizX, horizY; // horizontal x and y for the spikes
let circHeight; // Determines the height of our circle
let fallingHeight; // Our falling height
let timeFade; // Time to fade variable
let opacity; // Opacity variable
let looptime = 0; // Helps us loop
let timer = 0; // Timer


// Explosion of balls (bits)
let angle = -180; // Starts the angle at -180 degrees for scene 1
let bits = [] // array that holds the bit objects
let positions = [] // holds the position of the bits
let velocities = [] // holds the velocity of the bits
let accelerations = [] // holds the acceleration of the bits

// Sinusoidal orbs eminating
let particles = [] // creates our particle waves
let particlePos = [] // creates our particlePos

// Class Definitions:

class Waves {
  constructor(position, offset) { // Constructor
    this.position = position;
    this.offset = offset;
  }

  display(r, g, b, o) { // Display Function
    translate(this.position.x, this.position.y);
    noFill();
    stroke(r, g, b);
    beginShape();
      for (let i = 0; i < 359; i++) { // Makes them fluctuate at random intervals
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
    if ((timer - looptime) < 30000) {
      if (this.position.x < 400 && this.position.x > 200)  {
        this.position.add(createVector(-.3, -.75));
      } else if (this.position.x > 400 && this.position.x < 600){
        this.position.add(createVector(.3, -.75));
      }
    } 
    else if ((timer - looptime) > 30000 && r < 1800) { // Moves them after a timer when the ball starts shaking
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
  update() { // Updates our location
    let result;
    if (this.y > 400) {
      result = this.y - 0.5;
    } else if ((timer - looptime) > 39000 && r == 100) { // Scene two condition
      result = this.y + 0.5;
    }
    return result; // returns this offset change
  }
}

// Creates spikes on the bottom and the saw object for scene three
class SceneThreeSpikes {  // Sets our spikes for scene three
  constructor(x, y, lowerY) { // Constructor
    this.x = x;
    this.y = y;
    this.lowerY = lowerY;x
  }
  display() {
    background(0);
    const context = canvas.getContext('2d'); // create a new context
    // random stroke and fill color
    context.fillStyle = "#"+((1<<24)*Math.random()|0).toString(16);
    context.strokeStyle = "#"+((1<<24)*Math.random()|0).toString(16);

    for (let i = 0; i < 14; i++) { // top spikes (don't fully show)
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
    
    for (let i = 0; i < 14; i++) { // bottom Spikes
      if (i < 4 || i > 9) {
        context.beginPath();
        context.moveTo(this.x, this.lowerY);
        context.lineTo(this.x + 30, this.lowerY - 150 - this.offset);
        context.lineTo(this.x + 60, this.lowerY);
        context.fill();
      }
      this.x += 60;
    }
    horizX = 0;
    horizY = 0;
    for (let i = 0; i < 14; i++) { // Side Spikes
      context.beginPath();
      context.moveTo(horizX, horizY);
      context.lineTo(horizX + 150, horizY + 30);
      context.lineTo(horizX, horizY + 60)
      context.fill();
      context.closePath();
      horizX = width; // Does right side now
      context.beginPath();
      context.moveTo(horizX, horizY);
      context.lineTo(horizX - 150, horizY + 30);
      context.lineTo(horizX, horizY + 60)
      context.fill();
      context.closePath();
      horizX = 0;
      horizY += 60;
    }
    stroke(random(255), random(255), random(255));
    fill(random(255), random(255), random(255));
    // Creates a saw with random color
    ellipse(400, 800, 300, 300);
  }
}

//Function Definitions:

// Does the code for scene three
function sceneThree() { 
  spikes.display(); // Sets our spikes
  if (fallingHeight < 600) { // Checks if it has fallen onto the saw, if not move the circle down
    fill('red');
    stroke(0);
    circle(400, fallingHeight, 100);
    lineFlurry(20, 0, width, 0, height, 400, fallingHeight);
    fallingHeight += 5;
  } else { // If on the saw
    let opacity = random(200, 255); // fluctuate opacity
    stroke(255, 0, 0, opacity); // sets stroke
    fill(255, 0, 0, opacity); // sets fill
    if ((timer - looptime) < 53000) { // Until 53000 total millis() we will shake and shoot lines
      ellipse(400, 600, 100, 100);
      lineFlurry(10, 200, 600, 300, 600, 400, 650);
    } else if ((timer - looptime) < 56000 && (timer - looptime) > 53000) {
      ellipse(400 + (random(-10, 10)), 600 + random(-10, 10), 100, 100);
      lineFlurry(10, 200, 600, 300, 600, 400, 650);
    } else if ((timer - looptime) > 56000 && (timer - looptime) < 61000) { // We will burst into our bits and the person will be cut up
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
  } else if ((timer - looptime) < 30000) {
    stroke('red');
    fill('red');
    ellipse(400 + (random(-10, 10)), 400 + random(-10, 10), 100, 100); // sphere begins to shake
  } else if ((timer - looptime) < 35000) {
    stroke('red');
    fill('red');
    ellipse(400 + (random(-10, 10)), 400 + random(-10, 10), 100, 100);
    if (r >= 100 && r <= 500) {
      lineFlurry(10, 0, r/2, 0, r/2, 400, 400);
      drawCircle();
    } else {
      r = 100;
    }
  } else if ((timer - looptime) < 35050 && r > 100 && (timer - looptime) > 35000) {
    r = 100;
  } else if ((timer - looptime) > 35000 && r < 1800 && (timer - looptime) < 39000){
    ellipse(400 + (random(-10, 10)), 400 + random(-10, 10), 100, 100);
    drawCircle();
  } else if ((timer - looptime) > 39000 && r != 100) {
    drawCircle();
  } else {
    fill('red');
    circle(400, circHeight, 100);
    lineFlurry(20, 0, width, 0, height, 400, circHeight);
    circHeight += 1;
  }
}

// Code for scene one
function sceneOne() { 
  background(random(30));
  if ((timer - looptime) < 13000) {
    fill(255, 0, 0, 255);
    circle(400, 400, 100);
    if ((timer - looptime) - 1000 > timeFade) {
      timeFade += 1000;
    }
    for (let i = 0; i < 100; i++) {
      if (random(0, 50) < 25) {
        noFill();
      } else {
        fill(random(255), random(255), random(255), random((opacity - 30 - (timeFade/100 * 2)), opacity - (timeFade/100 * 2)));
      }
      triangle(random(width), random(height), random(width), random(height), random(width), random(height));
    }
  }
}



// Moves the object in the circle no matter what object it is
// passed any object with a display fucntion 
// No Longer used in project
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
  ctx.lineWidth = 5;
  // set line stroke and line width
  if (r == 100) { // Determines if we want random colors
    ctx.strokeStyle = "#"+((1<<24)*Math.random()|0).toString(16);
      
    // draw a random color line
    for (let i = 0; i < amount; i++) {
      ctx.beginPath();
      ctx.moveTo(locationX, locationY);
      ctx.lineTo(random(xMin, xMax), random(yMin, yMax));
      ctx.stroke();
      ctx.closePath();
    }
  } else { // Just red lines for scene two
    ctx.strokeStyle = 'red';
    for (let i = 0; i < amount; i++) {
      ctx.beginPath();
      ctx.moveTo(locationX, locationY);
      ctx.lineTo(random(locationX - r/2, locationX + r/2), random(locationY - r/2, locationY + r/2));
      ctx.stroke();
      ctx.closePath();
    }
  }
}

function drawCircle() { // Draws a circle and exapnds its width
  stroke(255, 0, 0); // Sets our red color stroke
  if ((timer - looptime) < 35050) { // Determines whether to fill or not to fill the circle
    noFill();
  }
  else {
    fill('red'); 
  }
  circle(400, 400, r);
  if ((timer - looptime) < 39500) {  // Expands or shrinks the r value
    r += 4;
  } else {
    r -= 4;
  }
}

// resets our variables for the loop
function resetVars() {
  // Sets our initialized Values for our global variables to make our functions work correctly
  r = 100;
  circHeight = 400;
  fallingHeight = 0;
  fade = 255;
  timeFade = 0;
  opacity = 255;
  stroke(0,120);
  // End setting constants
  const c = canvas.getContext('2d'); // Gets a 2d context to reset our line width
  c.lineWidth = 1;

  // Reset our class objects
  // Globally initialized Objects for scene 1
  person = new Person(100, 100, 100);
  spikes = new SceneThreeSpikes(-25, -50, 850);
  
  // Person for scene 2;
  abrasivePerson = new Person(400, 800, 100);
  
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
}

// Setup function
function setup() { 
  createCanvas(800, 800); // Canvas size is 800 x 800
  angleMode(DEGREES); // Sets our angles to degrees for easier math
  background(0);
  resetVars();
}

//Draw loop of the project
function draw() { 
  timer = millis();
  if (timer - looptime < 13000) {
    sceneOne(); // Calls Scene One
  } else if ((timer - looptime) > 13000 && circHeight != 800) {
    sceneTwo(); // Calls Scene Two
  } else if (circHeight == 800 && (timer - looptime) < 61500) {
    sceneThree(); // Calls Scene Three
  } else { // Loops back through
    resetVars(); // Resets our variables
    looptime += 61550; // Changes our loop time to work with the loop
  }
}