"use strict";
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "rgb(0, 0, 0)";

var pauseButton = document.getElementById("pause");
var startButton = document.getElementById("start");

//standard grid
var row = 19; // + 1
var column = 9; // + 1
let x = 4;
let y = 0;

var grid = new Array();

for (let i = 0; i <= row; i++) {
  grid[i] = new Array();
  for (let j = 0; j <= column; j++) {
    grid[i][j] = 0;
  }
}

// declare blocks in memory and DOM
function blockPosAndPrint(a, b, c, d, e, f, g, h) {
  let block = ctx.fillRect(30 * a, 30 * b, 30 * c, 30 * d);
  let block2 = ctx.fillRect(30 * e, 30 * f, 30 * g, 30 * h);
  return block && block2;
}

class ODisplayBlock {
  ODisplayBlock = blockPosAndPrint(x + 1, y, 1, 2, x, y, 1, 2);
  OBlock = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ];
}
class IDisplayBlock {
  IDisplayBlock = blockPosAndPrint(x, y, 1, 4, 0, x, y, 0, 0);
  IBlock = [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ];
}
class JDisplayBlock {
  JDisplayBlock = blockPosAndPrint(x, y, 1, 1, x, y + 1, 3, 1);
  JBlock = [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 1],
    [0, 0, 0, 0]
  ];
}
class LDisplayBlock {
  LDisplayBlock = blockPosAndPrint(x, y, 1, 1, x, y + 1, 3, 1);
  LBlock = [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0]
  ];
}
class ZDisplayBlock {
  ZDisplayBlock = blockPosAndPrint(x + 1, y + 1, 2, 1, x, y, 2, 1);
  ZBlock = [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ];
}
class SDisplayBlock {
  SDisplayBlock = blockPosAndPrint(x - 1, y + 1, 2, 1, x, y, 2, 1);
  SBlock = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0]
  ];
}
class TDisplayBlock {
  TDisplayBlock = blockPosAndPrint(x + 1, y, 1, 3, x, y + 1, 1, 1);
  TBlock = [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0]
  ];
}

//PAUSE - OFF GAME LOOP ONTO TEMP LOOP
var c = 0;
var t;
var pause = 0;

function timedCount() {
  document.getElementById("txt").value = c;
  c = c + 1;
  t = setTimeout(timedCount, 1000);
}

function startCount() {
  if (!pause) {
    pause = 1;
    timedCount();
  }
}

function stopCount() {
  clearTimeout(t);
  pause = 0;
}

function mainGameLoop() {
  y++;
  switch (0 /*Math.floor(Math.random() * 7)*/) {
    case 0:
      new ODisplayBlock();
      break;
    case 1:
      new IDisplayBlock();
      break;
    case 2:
      new LDisplayBlock();
      break;
    case 3:
      new ZDisplayBlock();
      break;
    case 4:
      new SDisplayBlock();
      break;
    case 5:
      new TDisplayBlock();
      break;
    case 6:
      new JDisplayBlock();
      break;
    default:
      console.log("error curBlock issue");
  }
}
