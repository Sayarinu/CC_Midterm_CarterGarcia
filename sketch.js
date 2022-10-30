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
Class and Method Declarations:
*/


// This will be the person in the drawing, they will have their dimensions set by the constructor
// They will be represented as a circle in the drawing in an almost balloon like feel
// Scared of being popped

/*
Class Definitions:
*/

class Gear { 
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    const gearContext = canvas.getContext('2d');
    ellipse(this.x, this.y, this.size);
    noStroke();
    fill(255, 100, 100);
    gearContext.rect(this.x - 25 - this.size/2, this.y - 25, 50, 50);
    gearContext.rotate(45/180 * Math.PI);
    gearContext.rect(this.x - 25 - this.size/2, this.y - 25, 50, 50);
  }
}

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

  updatePosition(x, y) {
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
  }

  updateOffset(newOffset) {
    this.offset = newOffset;
  }

}

/*
Function Definitions:
*/

// Scene and sketch code
// Scenes will transition based on time

/*
Setup (Only used to create the canvas)
*/
function setup() {
  createCanvas(800, 800);
}

/*
Draw loop of the project
*/

function draw() {
  /*
  spikes = new SceneOneSpikes(-25, -50, 850, 0);
  balloon = new Person(60, 400, 75);

  background(0);
  balloon.display();
  balloon.updatePosition(2, 0);
  spikes.display();
  */
 
  background(0);
  gear = new Gear(800, 800, 800);
  fill(255, 255, 255);
  gear.display();
}