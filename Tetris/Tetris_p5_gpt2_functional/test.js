let gameBoardHistory = [];
let currentBlockHistory = [];

let gameBoard;
let currentBlock;
let rotationIndex = 0;



const blockShapes = [
  [
    [1, 1, 1],  
    [1, 0, 0],
  ],
  [
    [1, 1],
    [0, 1],
    [0, 1],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
];


function setup() {
  createCanvas(300, 600);
  gameBoard = createGameBoard();
  currentBlock = createBlock();
  frameRate(3);
}

function draw() {
  background(0);
  updateGame();
  drawGame();
}

function createGameBoard() {
  const board = [];
  for (let i = 0; i < 10; i++) {
    board[i] = [];
    for (let j = 0; j < 20; j++) {
      board[i][j] = 0;
    }
  }
  return board;
}

function createBlock() {
  const block = {
    x: 4,
    y: 0,
    shape: blockShapes[rotationIndex],
  };
  return block;
}

function updateGame() {
  
  const newBlock = downBlock(currentBlock, gameBoard);

  if (newBlock === currentBlock) {
  
    addToBoard(currentBlock, gameBoard);
    currentBlock = createBlock();
  } else {
    currentBlock = newBlock;
  }

  checkAndRemoveRows();

  
  currentBlockHistory.push(currentBlock);
  gameBoardHistory.push(gameBoard);
}

function drawGame() {
  
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 20; j++) {
      if (gameBoard[i][j] === 1) {
        fill(255);
        rect(i * 30, j * 30, 30, 30);
      }
    }
  }

  for (let row = 0; row < currentBlock.shape.length; row++) {
    for (let col = 0; col < currentBlock.shape[row].length; col++) {
      if (currentBlock.shape[row][col] === 1) {
        fill(255);
        rect((currentBlock.x + col) * 30, (currentBlock.y + row) * 30, 30, 30);
      }
    }
  } 
}

function downBlock(block, board) {
  const newBlock = {
    ...block,
  };

 
  newBlock.y += 1;

  
  if (checkCollision(newBlock, board)) {
  
    return block;
  }

  return newBlock;
}

function moveBlock(block, board, direction) {
  const newBlock = {
    ...block,
  };

 
  newBlock.x += direction;

 
  if (checkCollision(newBlock, board)) {
 
    return block;
  }

  return newBlock;
}




function rotateBlock(block, board) {
  const newBlock = {
    ...block,
  };

  const rotatedShape = [];
  for (let i = 0; i < block.shape[0].length; i++) {
    const newRow = [];
    for (let j = block.shape.length - 1; j >= 0; j--) {
      newRow.push(block.shape[j][i]);
    }
    rotatedShape.push(newRow);
  }

  newBlock.shape = rotatedShape;

 
  if (checkCollision(newBlock, board)) {
 
    return block;
  }

  return newBlock;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
   
    currentBlock = rotateBlock(currentBlock, gameBoard);
  } else if (keyCode === LEFT_ARROW) {
    currentBlock = moveBlock(currentBlock, gameBoard, -1);
  } else if (keyCode === RIGHT_ARROW) {
    currentBlock = moveBlock(currentBlock, gameBoard, 1);
  }

 
  if (key == 1) {
    gameBoard = gameBoardHistory.at(-9);
    currentBlock = currentBlockHistory.at(-9);
  }
}

function checkCollision(block, board) {
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
    
      if (block.shape[row][col] === 1) {
        const boardX = block.x + col;
        const boardY = block.y + row;

    
        if (boardX < 0 || boardX >= 10 || boardY >= 20) {
          return true;
        }

    
        if (boardY >= 0 && board[boardX][boardY] === 1) {
          return true;
        }
      }
    }
  }
  return false;
}

function addToBoard(block, board) {
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] === 1) {
        const boardX = block.x + col;
        const boardY = block.y + row;

      
        if (boardY >= 0) {
          board[boardX][boardY] = 1;
        }
      }
    }
  }
}

function checkAndRemoveRows() {
  const newGameBoard = createGameBoard();

  
  let newRow = 19; 
  for (let row = 19; row >= 0; row--) {
    if (!isRowFull(row)) {
   
      for (let col = 0; col < 10; col++) {
        newGameBoard[col][newRow] = gameBoard[col][row];
      }
      newRow--; 
    }
  }

  
  while (newRow >= 0) {
    for (let col = 0; col < 10; col++) {
      newGameBoard[col][newRow] = 0;
    }
    newRow--;
  }

  gameBoard = newGameBoard; 
}

function isRowFull(row) {
  for (let col = 0; col < 10; col++) {
    if (gameBoard[col][row] !== 1) {
      return false;
    }
  }
  return true;
}