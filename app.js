//SELECTORS
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');
const xSymbol = '🞬';
const oSymbol = '⚫';

//VARIABLES
let gameIsLive = true;
let xIsNext = true;
let winner = null;

//FUNCTIONS
const letterToSymbol = (letter) => (letter === 'x' ? xSymbol : oSymbol);
const handleWin = (letter) => {
  gameIsLive = false;
  winner = letter;
  if (winner === 'o') {
    statusDiv.style.color = '#f2ebd3';
  }
  statusDiv.innerHTML = `¡${letterToSymbol(winner)} Ganó!`;
};
const handleTie = () => {
  gameIsLive = false;
  statusDiv.innerHTML = `Es un empate`;
};

const checkGameStatus = () => {
  const topLeft = cellDivs[0].classList[1];
  const topMiddle = cellDivs[1].classList[1];
  const topRigth = cellDivs[2].classList[1];
  const middleLeft = cellDivs[3].classList[1];
  const middleMiddle = cellDivs[4].classList[1];
  const middleRigth = cellDivs[5].classList[1];
  const bottomLeft = cellDivs[6].classList[1];
  const bottomMiddle = cellDivs[7].classList[1];
  const bottomRigth = cellDivs[8].classList[1];

  // check winner?
  if (topLeft && topLeft === topMiddle && topLeft === topRigth) {
    handleWin(topLeft);
    cellDivs[0].classList.add('won');
    cellDivs[1].classList.add('won');
    cellDivs[2].classList.add('won');
  } else if (
    middleLeft &&
    middleLeft === middleMiddle &&
    middleLeft === middleRigth
  ) {
    handleWin(middleLeft);
    cellDivs[3].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[5].classList.add('won');
  } else if (
    bottomLeft &&
    bottomLeft === bottomMiddle &&
    bottomLeft === bottomRigth
  ) {
    handleWin(bottomLeft);
    cellDivs[6].classList.add('won');
    cellDivs[7].classList.add('won');
    cellDivs[8].classList.add('won');
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    handleWin(topLeft);
    cellDivs[0].classList.add('won');
    cellDivs[3].classList.add('won');
    cellDivs[6].classList.add('won');
  } else if (
    topMiddle &&
    topMiddle === middleMiddle &&
    topMiddle === bottomMiddle
  ) {
    handleWin(topMiddle);
    cellDivs[1].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[7].classList.add('won');
  } else if (topRigth && topRigth === middleRigth && topRigth === bottomRigth) {
    handleWin(topRigth);
    cellDivs[2].classList.add('won');
    cellDivs[5].classList.add('won');
    cellDivs[8].classList.add('won');
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRigth) {
    handleWin(topLeft);
    cellDivs[0].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[8].classList.add('won');
  } else if (topRigth && topRigth === middleMiddle && topRigth === bottomLeft) {
    handleWin(topRigth);
    cellDivs[2].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[6].classList.add('won');
  } else if (
    topLeft &&
    topMiddle &&
    topRigth &&
    middleLeft &&
    middleMiddle &&
    middleRigth &&
    bottomLeft &&
    bottomMiddle &&
    bottomRigth
  ) {
    handleTie();
  } else {
    xIsNext = !xIsNext;
    if (xIsNext) {
      statusDiv.innerHTML = `${xSymbol} turn`;
      statusDiv.style.color = '#545454';
    } else {
      statusDiv.innerHTML = `${oSymbol} turn`;
      statusDiv.style.color = '#f2ebd3';
    }
  }
};

//event Handlers
const handleReset = (e) => {
  xIsNext = true;
  gameIsLive = true;
  statusDiv.innerHTML = `${xSymbol} turn`;
  winner = null;
  for (const cellDiv of cellDivs) {
    cellDiv.classList.remove('x');
    cellDiv.classList.remove('o');
    cellDiv.classList.remove('won');
  }
};
const handleCellClick = (e) => {
  const elementClassList = e.target.classList;

  if (
    !gameIsLive ||
    elementClassList[1] === 'x' ||
    elementClassList[1] === 'o'
  ) {
    return;
  }
  if (xIsNext) {
    elementClassList.add('x');
    checkGameStatus();
  } else {
    elementClassList.add('o');
    checkGameStatus();
  }
};

//LISTENERS
resetDiv.addEventListener('click', handleReset);
for (const cellDiv of cellDivs) {
  cellDiv.addEventListener('click', handleCellClick);
}
