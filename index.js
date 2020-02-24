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
var timer;
var counter;
var gameDifficulty = 2000;

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
const nullBlock = "#FFFFFF";
const colors = [
  [oblock, "#FFFF00"],
  [lblock, "#00FFEB"],
  [jblock, "#0000FF"],
  [iblock, "#FF9300"],
  [sblock, "#39F100"],
  [tblock, "#8700F1"],
  [zblock, "#E30000"]
];

loadingScreen();
canvas.addEventListener("click", startGame);
canvas.addEventListener("click", () => {
  secondary.classList.remove("secondary-add");
});

let p = new Piece(colors[0][0], colors[0][1]);

function Piece(block, colour) {
  this.block = block;
  this.colour = colour;

  this.blockN = 0;
  this.activeblock = this.block[this.blockN];

  this.x = 3;
  this.y = -1;
}

Piece.prototype.drawBlock = function() {
  for (let i = 0; i < this.activeblock.length; i++) {
    for (let j = 0; j < this.activeblock.length; j++) {
      if (this.activeblock[i][j])
        drawSquareAndPosition(this.x + i, this.y + j, this.colour);
    }
  }
};

Piece.prototype.deleteBlock = function() {
  for (let i = 0; i < this.activeblock.length; i++) {
    for (let j = 0; j < this.activeblock.length; j++) {
      if (this.activeblock[i][j]) {
        drawSquareAndPosition(this.x + i, this.y + j, nullBlock);
      }
    }
  }
};

Piece.prototype.moveDown = function() {
  this.y++;
  this.drawBlock();
};

Piece.prototype.DropBlock = function() {
  this.y++;
  p.moveDown();
  requestAnimationFrame(this.DropBlock());
};

function startGame() {
  canvas.removeEventListener("click", startGame);
  clearLoadingScreen();
  gameCounter();
  runGame();
}
function runGame() {
  document.addEventListener("keydown", moveKeys);
  createGrid();
  drawBoard();
  p.drawBlock();
  p.DropBlock();

  //p.d

  pauseGame();
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
function gameCounter() {
  let count = 0;
  counter = () => {
    count++;
    timer = setTimeout(function() {
      counter();
    }, gameDifficulty);
  };
  counter();
}
function pauseGame() {
  let paused = true;
  pauseButton.addEventListener("click", () => {
    clearTimeout(timer);
    paused = !paused;
    pauseButton.innerHTML = "Unpause";
    if (!paused) {
      counter();
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
