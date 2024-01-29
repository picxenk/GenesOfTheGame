let board;
let tileMoved = true;
let sTilePos = [];
let eTilePos = [];

function setup() {
  createCanvas(400, 400);
  board = new Board(50, 50);
}

function draw() {
  background(220);

  board.show();

  if (tileMoved) {
    board.match();
    tileMoved = false;
  }
}

// function mouseClicked() {
//   tileMoved = true;
//   print(board.map)
// }

function mousePressed() {
  sTilePos = board.getTilePos(mouseX, mouseY);
}

function mouseReleased() {
  eTilePos = board.getTilePos(mouseX, mouseY);
  
  board.moveTile(sTilePos, eTilePos);
  tileMoved = true;
}
