"use strict";
//canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//buttons
var pauseButton = document.getElementById("pause");
var startButton = document.getElementById("start");
var secondary = document.getElementById("second");

//timer
var timer;
var counter;
var gameDifficulty = 1000;

//grid
var grid = [];
const col = 10;
const row = 20;

const colors = {
  nullblock: "#FFFFFF",
  Oblock: "#FFFF00",
  Lblock: "#00FFEB",
  Jblock: "#0000FF",
  Lblock: "#FF9300",
  Sblock: "#39F100",
  Tblock: "#8700F1",
  Zblock: "#E30000"
};
canvas.addEventListener("click", () => {
  secondary.classList.remove("secondary-add");
});
canvas.addEventListener("click", startGame);
startButton.addEventListener("click", startGame);
loadingScreen();

function runGame() {
  createGrid();
  drawBoard();
  pauseButton.addEventListener("click", pauseGame);
}

function loadingScreen() {
  canvas.width = 350;
  canvas.height = 600;
  ctx.font = "36px Impact";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("PRESS TO START", 175, 425);
}
function clearLoadingScreen() {
  canvas.width = 300;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function createGrid() {
  let whiteSpace = colors.nullblock;
  for (let i = 0; i < row; i++) {
    grid[i] = [];
    for (let j = 0; j < col; j++) {
      grid[i][j] = whiteSpace;
    }
  }
}
function drawBoard() {
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      drawSquareAndPosition(i, j, grid[i][j]);
    }
  }
}
function drawSquareAndPosition(x, y, color) {
  const square = 30;
  ctx.fillStyle = color;
  ctx.fillRect(x * square, y * square, square, square);
  ctx.strokeStyle = "black";
  ctx.strokeRect(x * square, y * square, square, square);
}
function startGame() {
  let gameOn;
  if (!gameOn) {
    clearLoadingScreen();
  }
  if (gameOn === true) {
    return;
  } else {
    gameOn = true;
    runGame();
  }
}
function gameCounter() {
  let count = 0;
  counter = () => {
    count++;
    console.log(count);
    timer = setTimeout(function() {
      counter();
    }, gameDifficulty);
  };
  counter();
}
function pauseGame() {
  let paused = false;

  clearTimeout(timer);
  paused = !paused;
  pauseButton.innerHTML = "Unpause";
  if (!paused) {
    counter();
    pauseButton.innerHTML = "Pause";
  }
}
