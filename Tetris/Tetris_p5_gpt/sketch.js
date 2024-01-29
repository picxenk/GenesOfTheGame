let grid;
let blockSize = 30;
let currentBlock;

function setup() {
  createCanvas(300, 600);
  grid = createEmptyGrid(width / blockSize, height / blockSize);
  currentBlock = new Block();

  frameRate(3);
}

function draw() {
  background(0);
  
  currentBlock.update();
  currentBlock.show();
  drawGrid();
  checkAndRemoveRows();
}


function checkAndRemoveRows() {
    for (let row = grid[0].length - 1; row >= 0; row--) {
      if (isRowFull(row)) {
        removeRow(row);
        moveBlocksDown(row);
      }
    }
  }
  
  function isRowFull(row) {
    for (let col = 0; col < grid.length; col++) {
      if (grid[col][row] !== 1) {
        return false;
      }
    }
    return true;
  }
  
  function removeRow(row) {
    for (let col = 0; col < grid.length; col++) {
      grid[col].splice(row, 1);
      grid[col].unshift(0);
    }
  }
  
  function moveBlocksDown(row) {
    for (let col = 0; col < grid.length; col++) {
      for (let r = row - 1; r >= 0; r--) {
        if (grid[col][r] === 1) {
          grid[col][r + 1] = 1;
          grid[col][r] = 0;
        }
      }
    }
  }


function keyPressed() {
    if (keyCode === UP_ARROW) {
      currentBlock.rotate();
    } else if (keyCode === LEFT_ARROW) {
      currentBlock.move(-1); // 왼쪽으로 이동
    } else if (keyCode === RIGHT_ARROW) {
      currentBlock.move(1); // 오른쪽으로 이동
    }
  }

  class Block {
    constructor() {
      this.x = floor(grid.length / 2); // 가운데 열에서 시작
      this.y = 0;
      this.size = blockSize;
      this.shapeIndex = 0; // 블록의 모양 인덱스 (0: 네모, 1-4: L 모양)
    }
    
    update() {
      if (this.canMoveDown()) {
        this.y += 1; // 아래로 하강
      } else if (this.y === 0) {
        this.shapeIndex = floor(random(1, 5)); // 천장에 닿으면 L 모양으로 변경
      } else {
        // 블록을 고정하고 새로운 블록 생성
        this.addToGrid();
        currentBlock = new Block();
      }
    }
    
    show() {
      fill(255);
      let layout = blockLayouts[this.shapeIndex];
      for (let i = 0; i < 4; i++) {
        rect((this.x + layout[i][0]) * this.size, (this.y + layout[i][1]) * this.size, this.size, this.size);
      }
    }
  
    canMoveDown() {
      let layout = blockLayouts[this.shapeIndex];
      for (let i = 0; i < 4; i++) {
        let nextX = this.x + layout[i][0];
        let nextY = this.y + layout[i][1] + 1;
        if (nextY >= grid[0].length || grid[nextX][nextY] === 1) {
          return false;
        }
      }
      return true;
    }
  
    addToGrid() {
      let layout = blockLayouts[this.shapeIndex];
      for (let i = 0; i < 4; i++) {
        let x = this.x + layout[i][0];
        let y = this.y + layout[i][1];
        grid[x][y] = 1;
      }
    }
  
    rotate() {
      this.shapeIndex = (this.shapeIndex + 1) % 4; // 모양 인덱스를 회전
    }
  
    move(direction) {
      let newX = this.x + direction;
      if (this.canMoveSide(newX)) {
        this.x = newX;
      }
    }
  
    canMoveSide(newX) {
      let layout = blockLayouts[this.shapeIndex];
      for (let i = 0; i < 4; i++) {
        let nextX = newX + layout[i][0];
        let nextY = this.y + layout[i][1];
        if (nextX < 0 || nextX >= grid.length || grid[nextX][nextY] === 1) {
          return false;
        }
      }
      return true;
    }
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

// L 블록의 모양
const blockLayouts = [
  [[0, 0], [0, 1], [0, 2], [1, 2]],
  [[1, 0], [0, 0], [0, 1], [0, 2]],
  [[0, 2], [1, 2], [1, 1], [1, 0]],
  [[0, 1], [1, 1], [1, 2], [1, 3]]
];
