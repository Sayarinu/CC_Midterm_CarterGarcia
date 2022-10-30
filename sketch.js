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
class Person {
  constructor(size, color) {
    this.size = size;
    this.color = color;
  }
}

// Sets up the spikes for our scene1
function sceneOneSpikes() {
  const context = canvas.getContext('2d');

  let y = -50;
  let x = -25;

  for (let i = 0; i < 14; i++) {
    context.beginPath();
    context.strokeStyle = 'white';
    context.moveTo(x, y);
    context.lineTo(x + 30, y + 150);
    context.lineTo(x + 60, y);
    context.fill();
    x += 60;
  }

  let lowerY = 850;
  x = -25;

  for (let i = 0; i < 14; i++) {
    context.beginPath();
    context.strokeStyle = 'white';
    context.moveTo(x, lowerY);
    context.lineTo(x + 30, lowerY - 150);
    context.lineTo(x + 60, lowerY);
    context.fill();
    x += 60;
  }
}

// Scene and sketch code
// Scenes will transition based on time
function setup() {
  createCanvas(800, 800);
  background(0);
  sceneOneSpikes();
}

function draw() {
 

}









