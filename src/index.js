import { displayCanvas } from "./canvas.js";
import { Grid } from "./grid.js";

// Program area

// Variables for the code representation of the board
let boardWidth = 40,
  boardHeight = 40,
  treshold = 0.5, // Number of cells alive in the randomize array
  timeDelay = 1000;

// Reference to the buttons
const start = document.querySelector(".start");
const stop = document.querySelector(".stop");
const reset = document.querySelector(".reset");

// Reference to the canvas div
const canvasDiv = document.querySelector(".canvas-div");
// Reference to the canvas itself
let canvas, context, canvasWidth, canvasHeight;

// Used to store the reference the id of setInteval
let loop;

function displayNextState() {
  gameGrid.nextStep();
  displayCanvas(context, canvasWidth, canvasHeight, gameGrid.board);
}

// Initialize the grid
const gameGrid = new Grid(boardWidth, boardHeight);
gameGrid.randomize(treshold);

/*
 Main part of the rendering. There's maybe another way of doing it,
 but by doing it this way I'm sure I'll have the context of the canvas
 (if it is supported)
*/
window.addEventListener("load", () => {

  canvas = document.querySelector("#game-display");
  canvasWidth = canvas.width = canvasDiv.getBoundingClientRect().width;
  canvasHeight = canvas.height = canvasDiv.getBoundingClientRect().height;

  if (canvas.getContext) {
    context = canvas.getContext("2d");
    displayCanvas(context, canvasWidth, canvasHeight, gameGrid.board);
    
    // In case the window is resized
    window.addEventListener("resize", () => {
      canvasWidth = canvas.width = canvasDiv.getBoundingClientRect().width;
      canvasHeight = canvas.height = canvasDiv.getBoundingClientRect().height;
      // Needed because on window resize, the canvas get cleared
      displayCanvas(context, canvasWidth, canvasHeight, gameGrid.board);
    });

    start.addEventListener("click", () => {
      loop = setInterval(displayNextState, timeDelay);
      start.disabled = true;
    });
    
    stop.addEventListener("click", () => {
      clearInterval(loop);
      start.disabled = false;
    });
    
    reset.addEventListener("click", () => {
      clearInterval(loop);
      start.disabled = false;
    
      // reinitialise the the board with a new random array
      gameGrid.randomize(treshold);
      displayCanvas(context, canvasWidth, canvasHeight, gameGrid.board);
    });

  }
});
