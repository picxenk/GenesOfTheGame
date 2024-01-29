let board = {};
let block = {};

function setup() {
  createCanvas(400, 400);

  board.x = 100;
  board.y = 100;
  board.w = 8;
  board.h = 12;
  board.unit = 20;
  board.map = [];
  
  block.i = 0;
  block.j = 0;
}

function setBoard() {
  let i = block.j*board.w + block.i;
  board.map[i] = 1;
}

function checkIsHit() {
  if (block.j >= board.h-1) return true;

  let m = board.map[(block.j+1)*board.w + block.i];
  if (m == 1) return true;

  return false;
}

function isFullLine(j) {
  let sum = 0
  for (let i=0; i<board.w; i++) {
    sum = sum + board.map[j*board.w + i];
  }
  if (sum >= board.w) return true;
  else return false;
}

function shiftDown() {
  stroke(255, 0, 0);
  for (let j=board.h-1; j>1; j--) {
    for (let i=0; i<board.w; i++) {
      let cIndex = j*board.w + i;
      let uIndex = (j-1)*board.w + i;
      board.map[cIndex] = board.map[uIndex];
    }
  }
}

function checkBreak() {
  for (let j=board.h-1; j>0; j--) {
    if (isFullLine(j)) {
      shiftDown();
    }
  }
}


function draw() {
  background(220);

  // draw board
  fill(255);
  for (let j=0; j<board.h; j++) {
    for (let i=0; i<board.w; i++) {
      let m = board.map[j*board.w + i];
      if (m == 1) {
        fill(100);
      } else {
        fill(255);
      }
      rect(board.x+i*board.unit, board.y+j*board.unit, board.unit, board.unit);
    }
  }

  // move block
  if (frameCount % 10 == 0) {
    
    if (!checkIsHit()) {
      block.j += 1;
    } else {
      setBoard();
      checkBreak();
      block.j = 0;
      block.i = 0;
    }
  }

  // draw block
  block.x = board.x + block.i*board.unit;
  block.y = board.y + block.j*board.unit;
  fill(100);
  rect(block.x, block.y, board.unit, board.unit);
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    if (block.i > 0)
      block.i -= 1;
  } 
  if (keyCode == RIGHT_ARROW) {
    if (block.i < board.w-1)
      block.i += 1;
  }
}
