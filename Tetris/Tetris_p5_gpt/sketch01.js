let grid;
let blockSize;
let block;

function setup() {
  createCanvas(400, 600);
  blockSize = width / 10;
  grid = createEmptyGrid(10, 20);
  block = new Block(width / 2, 0);

  console.log(grid);
}

function draw() {
  background(0);
  drawGrid();

  block.update();
  block.show();
}

function createEmptyGrid(cols, rows) {
  let emptyGrid = new Array(cols);
  for (let i = 0; i < cols; i++) {
    emptyGrid[i] = new Array(rows).fill(0);
  }
  return emptyGrid;
}

function drawGrid() {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      if (grid[col][row] === 1) {
        fill(255);
        rect(col * blockSize, row * blockSize, blockSize, blockSize);
      }
    }
  }
}

class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = blockSize;
  }
  
  update() {
    this.y += 1; // 블록을 아래로 하강시키는 속도
  }
  
  show() {
    fill(255);
    rect(this.x, this.y, this.size, this.size);
    // L 블록의 오른쪽 부분을 추가로 그립니다.
    rect(this.x, this.y + this.size, this.size, this.size);
    rect(this.x, this.y + this.size * 2, this.size, this.size);
    rect(this.x + this.size, this.y + this.size * 2, this.size, this.size);
  }
}

