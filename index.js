"use strict";
//canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

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

// true or false bool
var endGame;

//blocks with rotation
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
const blocks = [
  [oblock, "#FFFF00"],
  [lblock, "#00FFEB"],
  [jblock, "#0000FF"],
  [tblock, "#FF9300"],
  [sblock, "#39F100"],
  [iblock, "#8700F1"],
  [zblock, "#E30000"]
];

// class & constructor for game pieces
function Piece(block, colour) {
  this.block = block;
  this.colour = colour;
  this.blockN = 0;
  this.activeblock = this.block[this.blockN];
  this.x = 4;
  this.y = -2;
}

Piece.prototype.blockTemplate = function(colours) {
  for (let i = 0; i < this.activeblock.length; i++) {
    for (let j = 0; j < this.activeblock.length; j++) {
      if (this.activeblock[i][j])
        drawSquareAndPosition(this.x + i, this.y + j, colours);
    }
  }
};
Piece.prototype.drawBlock = function() {
  this.blockTemplate(this.colour);
};
Piece.prototype.deleteBlock = function() {
  this.blockTemplate(nullBlock);
};
Piece.prototype.moveDown = function() {
  if (!this.collision(0, 1, this.activeblock)) {
    this.deleteBlock();
    this.y++;
    this.drawBlock();
  } else {
    this.lock();
    p = randomPiece();
  }
};
Piece.prototype.moveLeft = function() {
  if (!this.collision(-1, 0, this.activeblock)) {
    this.deleteBlock();
    this.x--;
    this.drawBlock();
  }
};
Piece.prototype.moveRight = function() {
  if (!this.collision(1, 0, this.activeblock)) {
    this.deleteBlock();
    this.x++;
    this.drawBlock();
  }
};
Piece.prototype.rotate = function() {
  let nextBlock = this.block[(this.blockN + 1) % this.block.length];
  let kick = 0;
  if (this.collision(0, 0, nextBlock)) {
    if (this.x > col / 2) {
      kick = -1;
    } else {
      kick = -1;
    }
  }
  if (!this.collision(kick, 0, nextBlock)) {
    this.deleteBlock();
    this.x += kick;
    this.blockN = (this.blockN + 1) % this.block.length;
    this.activeblock = this.block[this.blockN];
    this.drawBlock();
  }
};
Piece.prototype.lock = function(colours) {
  for (let i = 0; i < this.activeblock.length; i++) {
    for (let j = 0; j < this.activeblock.length; j++) {
      if (!this.activeblock[i][j]) {
        continue;
      }
      if (this.y + j < 0) {
        alert("gameover");
        gameOver();
        break;
      }
      grid[this.y + i][this.x + j] = colours;
    }
  }
};
Piece.prototype.collision = function(x, y, piece) {
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece.length; j++) {
      // after piece is moved
      let newXLocation = this.x + i + x;
      let newYLocation = this.y + j + y;
      if (!piece[i][j]) {
        continue;
      }
      if (newXLocation < 0 || newXLocation >= col || newYLocation >= row) {
        return true;
      }
      if (newYLocation < 0) {
        continue;
      }
      if (grid[newYLocation][newXLocation] != nullBlock) {
        return true;
      }
    }
  }
  return false;
};

let p = randomPiece();

loadingScreen();
canvas.addEventListener("click", startGame);
canvas.addEventListener("click", () => {
  secondary.classList.remove("secondary-add");
});

// Initial setup for the game
function startGame() {
  canvas.removeEventListener("click", startGame);
  clearLoadingScreen();
  createGrid();
  endGame = false;
  runGame();
}

// Game Loop
function runGame() {
  document.addEventListener("keydown", moveKeys);
  drawBoard();
  dropBlock();
  pauseGame();
}

function dropBlock() {
  timer = setTimeout(() => {
    p.moveDown();
    dropBlock();
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
  const square = 30;
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
// function gameOver() {
//   startButton.addEventListener("click", startGame);
// }
function moveKeys(event) {
  if (event.keyCode == 65) {
    // 65 === a
    p.moveLeft();
  } else if (event.keyCode == 82) {
    // 82 === r
    p.rotate();
  } else if (event.keyCode == 68) {
    // 68 === d
    p.moveRight();
  } else if (event.keyCode == 83) {
    // 83 === s
    p.moveDown();
  }
}
function randomPiece() {
  let r = Math.floor(Math.random(6) * blocks.length);
  return new Piece(blocks[r][0], blocks[r][1]);
}
