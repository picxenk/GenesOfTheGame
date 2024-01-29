let gameBoardHistory = [];
let currentBlockHistory = [];

let gameBoard;
let currentBlock;
let rotationIndex = 0;


// 블록의 초기 상태를 정의합니다.
const blockShapes = [
  [
    [1, 1, 1],   // L 모양 블록의 초기 상태
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
    // 블록의 모양 및 상태 정보
    // 불변 객체 사용
  };
  return block;
}

function updateGame() {
  // 블록 이동 및 회전 로직
  const newBlock = downBlock(currentBlock, gameBoard);

  if (newBlock === currentBlock) {
    // 블록 이동 후 변경 없음 -> 블록이 바닥에 닿았다는 의미
    addToBoard(currentBlock, gameBoard);
    currentBlock = createBlock();
  } else {
    currentBlock = newBlock;
  }

  checkAndRemoveRows();

  // 히스토리를 기억해보면
  currentBlockHistory.push(currentBlock);
  gameBoardHistory.push(gameBoard);
}

function drawGame() {
  // 게임 상태를 기반으로 그래픽을 그리는 로직
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

  // 블록을 아래로 이동하는 로직
  newBlock.y += 1;

  // 블록 충돌 검사 로직 (아직 구현되지 않음)
  if (checkCollision(newBlock, board)) {
    // 충돌 시 현재 블록 반환 (변화 없음)
    return block;
  }

  return newBlock;
}

function moveBlock(block, board, direction) {
  const newBlock = {
    ...block,
  };

  // 블록을 아래로 이동하는 로직
  newBlock.x += direction;

  // 블록 충돌 검사 로직 (아직 구현되지 않음)
  if (checkCollision(newBlock, board)) {
    // 충돌 시 현재 블록 반환 (변화 없음)
    return block;
  }

  return newBlock;
}




function rotateBlock(block, board) {
  const newBlock = {
    ...block,
  };

  // 블록을 회전하는 로직 (아직 구현되지 않음)
    // 회전 로직 추가
  const rotatedShape = [];
  for (let i = 0; i < block.shape[0].length; i++) {
    const newRow = [];
    for (let j = block.shape.length - 1; j >= 0; j--) {
      newRow.push(block.shape[j][i]);
    }
    rotatedShape.push(newRow);
  }

  newBlock.shape = rotatedShape;

  // 블록 충돌 검사 로직 (아직 구현되지 않음)
  if (checkCollision(newBlock, board)) {
    // 충돌 시 현재 블록 반환 (변화 없음)
    return block;
  }

  return newBlock;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    // UP_ARROW 키를 누를 때 블록 회전
    currentBlock = rotateBlock(currentBlock, gameBoard);
  } else if (keyCode === LEFT_ARROW) {
    currentBlock = moveBlock(currentBlock, gameBoard, -1);
  } else if (keyCode === RIGHT_ARROW) {
    currentBlock = moveBlock(currentBlock, gameBoard, 1);
  }

  // 타임머신 기능을 적용하기 쉬워지네.
  if (key == 't') {
    gameBoard = gameBoardHistory.at(-9);
    currentBlock = currentBlockHistory.at(-9);
  }
}

function checkCollision(block, board) {
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      // 블록 셀이 1인 경우에만 충돌 검사
      if (block.shape[row][col] === 1) {
        const boardX = block.x + col;
        const boardY = block.y + row;

        // 게임 보드 바깥으로 나가는 경우
        if (boardX < 0 || boardX >= 10 || boardY >= 20) {
          return true;
        }

        // 게임 보드 안에 다른 블록이 있는 경우
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

        // 게임 보드에 블록 추가
        if (boardY >= 0) {
          board[boardX][boardY] = 1;
        }
      }
    }
  }
}

function checkAndRemoveRows() {
  const newGameBoard = createGameBoard();

  // 기존 gameBoard를 순회하며 채워진 줄을 제거한 후, newGameBoard에 복사
  let newRow = 19; // newGameBoard의 아래에서부터 채워질 줄 인덱스
  for (let row = 19; row >= 0; row--) {
    if (!isRowFull(row)) {
      // 채워지지 않은 줄을 newGameBoard에 복사
      for (let col = 0; col < 10; col++) {
        newGameBoard[col][newRow] = gameBoard[col][row];
      }
      newRow--; // 다음 줄로 이동
    }
  }

  // 남은 빈 줄을 채우기
  while (newRow >= 0) {
    for (let col = 0; col < 10; col++) {
      newGameBoard[col][newRow] = 0;
    }
    newRow--;
  }

  gameBoard = newGameBoard; // 업데이트된 게임 보드를 적용
}

function isRowFull(row) {
  for (let col = 0; col < 10; col++) {
    if (gameBoard[col][row] !== 1) {
      return false;
    }
  }
  return true;
}