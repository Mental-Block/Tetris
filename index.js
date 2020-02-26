"use strict";
//canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const square = 30;

//buttons
var pauseButton = document.getElementById("pause");
var startButton = document.getElementById("start");
var secondary = document.getElementById("second");

//timer
var gameDifficulty = 1000;
var timer;

//grid
var grid = [];
const col = 10;
const row = 20;

//blocks in memory
const oblock = [
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ]
];
const lblock = [
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0]
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ]
];
const jblock = [
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1]
  ]
];
const iblock = [
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0]
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0]
  ]
];
const sblock = [
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1]
  ],
  [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0]
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0]
  ]
];
const tblock = [
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0]
  ]
];
const zblock = [
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0]
  ]
];

// blocks with colors
const nullBlock = "#FFFFFF";
const blocksColors = [
  [oblock, "#FFFF00"],
  [lblock, "#00FFEB"],
  [jblock, "#0000FF"],
  [iblock, "#FF9300"],
  [sblock, "#39F100"],
  [tblock, "#8700F1"],
  [zblock, "#E30000"]
];

// class & constructor for game pieces
function Piece(block, colour) {
  this.block = block;
  this.colour = colour;
  this.blockN = 0;
  this.activeblock = this.block[this.blockN];
  this.x = 3;
  this.y = 5;
}

Piece.prototype.blockTemplate = function() {
  for (let i = 0; i < this.activeblock.length; i++) {
    for (let j = 0; j < this.activeblock.length; j++) {
      if (this.activeblock[i][j])
        drawSquareAndPosition(this.x + i, this.y + j, this.colour);
    }
  }
};

Piece.prototype.drawBlock = function() {
  this.blockTemplate();
};

Piece.prototype.deleteBlock = function() {
  this.blockTemplate();
};

Piece.prototype.moveDown = function() {
  this.drawBlock();
  this.y++;
};

/* EVERYTHING ABOVE IS INITIALIZATION  */

//stuff that can be loaded pregame
loadingScreen();
canvas.addEventListener("click", startGame);
canvas.addEventListener("click", () => {
  secondary.classList.remove("secondary-add");
});

let p = new Piece(blocksColors[0][0], blocksColors[0][1]);

// Initial setup for the game
function startGame() {
  canvas.removeEventListener("click", startGame);
  clearLoadingScreen();
  createGrid();
  runGame();
}

// Game Loop
function runGame() {
  document.addEventListener("keydown", moveKeys);
  drawBoard();
  p.drawBlock();
  dropBlock();
  pauseGame();
}

function dropBlock() {
  timer = setTimeout(() => {
    p.moveDown();
    p.deleteBlock();
  }, gameDifficulty);
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
  canvas.height = 600;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function createGrid() {
  let whiteSpace = nullBlock;
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
function drawSquareAndPosition(x, y, colour) {
  ctx.fillStyle = colour;
  ctx.fillRect(x * square, y * square, square, square);
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(x * square, y * square, square, square);
}
function pauseGame() {
  pauseButton.addEventListener("click", () => {
    if (pauseButton.innerHTML === "Pause") {
      pauseButton.innerHTML = "Unpause";
      clearTimeout(timer);
    } else {
      dropBlock();
      pauseButton.innerHTML = "Pause";
    }
  });
}
function endGame() {
  startButton.addEventListener("click", startGame);
}
function moveKeys(event) {
  if (event.keyCode === 37 || 65) {
    p.moveDown();
  } else if (event.keyCode == 38 || 82) {
  } else if (event.keyCode == 39 || 68) {
  } else if (event.keyCode == 40 || 83) {
  } else if (event.keyCode == 80) {
    pauseGame();
  }
}
