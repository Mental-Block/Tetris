"use strict";
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "rgb(0, 0, 0)";

//standard grid
var row = 19; // + 1
var column = 9; // + 1
var grid = new Array();

for (let i = 0; i <= row; i++) {
  grid[i] = new Array();
  for (let j = 0; j <= column; j++) {
    grid[i][j] = 0;
  }
}

//game pieces in memory
const OBlock = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
];

const IBlock = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0]
];

const JBlock = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 1, 1],
  [0, 0, 0, 0]
];

const LBlock = [
  [0, 0, 0, 0],
  [0, 0, 1, 0],
  [1, 1, 1, 0],
  [0, 0, 0, 0]
];

const ZBlock = [
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
];

const SBlock = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [1, 1, 0, 0],
  [0, 0, 0, 0]
];

const TBlock = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 0, 0]
];

//game pieces UI overlay

//position in the array

//game piece init
function blockPosAndPrint(a, b, c, d, e, f, g, h) {
  let block = ctx.fillRect(30 * a, 30 * b, 30 * c, 30 * d);
  let block2 = ctx.fillRect(30 * e, 30 * f, 30 * g, 30 * h);
  return block && block2;
}

//const ODisplayBlock = blockPosAndPrint(1, 1, 2, 2, 0, 0, 0, 0);
//const IDisplayBlock = blockPosAndPrint(1, 1, 1, 4, 0, 0, 0, 0, 0);
//const JDisplayBlock = blockPosAndPrint(1, 1, 1, 1, 1, 2, 3, 1);
const LDisplayBlock = blockPosAndPrint(2, 0, 1, 1, 0, 1, 3, 1);
//const ZDisplayBlock = blockPosAndPrint(0, 0, 2, 1, 1, 1, 2, 1);
//const SDisplayBlock = blockPosAndPrint(1, 0, 2, 1, 0, 1, 2, 1);
//const TDisplayBlock = blockPosAndPrint(0, 1, 3, 1, 1, 0, 1, 2);

// get random piece
let curBlock;
let uiBlock;
switch (1 /*Math.floor(Math.random() * 7)*/) {
  case 0:
    curBlock = ZBlock;
    // uiBlock = ZDisplayBlock;
    break;
  case 1:
    curBlock = OBlock;
    //   uiBlock = ODisplayBlock;
    break;
  case 2:
    curBlock = IBlock;
    //  uiBlock = IDisplayBlock;
    break;
  case 3:
    curBlock = JBlock;
    //   uiBlock = JDisplayBlock;
    break;
  case 4:
    curBlock = LBlock;
    //   uiBlock = LDisplayBlock;
    break;
  case 5:
    curBlock = SBlock;
    //  uiBlock = SDisplayBlock;
    break;
  case 6:
    curBlock = TBlock;
    // uiBlock = TDisplayBlock;
    break;
  default:
    console.log("error curBlock issue");
}

//dropping the piece

// // rotate pieces
