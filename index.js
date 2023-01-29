const game = (() => {
  let players = [];
  let squares = [];
  let currentPlayer = null;
  const winningMoves = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ];
  const registerPlayer = () => {
    let name = prompt("Enter player name:");
    players.push(playerFactory(name));
  }
  
  const playerFactory = (name) => {
    return {name, goesFirst: false};
  }
  
  const determineStartingPlayer = () => {
    if (players.length < 2) return;
    const startingPlayer = players[Math.floor(Math.random() * 2)];
    startingPlayer.goesFirst = true;
    currentPlayer = startingPlayer;
  }
  
  const declareWinner = (player) => {
    document.querySelector(".notice").innerHTML = `${player.name} wins!`
  }
  
  const checkForWin = () => {
    for (const move of winningMoves) {
      [a, b, c] = move
      if (squares[a].val > 0 && squares[a].val === squares[b].val &&
        squares[b].val === squares[c].val) {
        return true;
      }
    }
    return false;
  }
  
  const makeMove = (e) => {
    if (players.length === 0) return;
    const square = squares[e.target.dataset.index];
    square.val = (currentPlayer.goesFirst ? 1 : 2 );
    if (checkForWin()) {
      declareWinner(currentPlayer);
    } else {
      currentPlayer = players.find(player => player !== currentPlayer);
    }
    renderSquares();
  }
  
  const renderSquares = () => {
    const target = document.querySelector(".board");
    target.innerHTML = "";
    const gameOver = checkForWin();
    for (const square of squares) {
      const squareElement = document.createElement("button");
      squareElement.className = "square";
      squareElement.dataset.index = squares.indexOf(square).toString();
      if (square.val === 1) {
        squareElement.classList.add("player-1");
        squareElement.disabled = true;
      } else if (square.val === 2) {
        squareElement.classList.add("player-2");
        squareElement.disabled = true;
      } else {
        squareElement.addEventListener("click", (e) => makeMove(e));
      }
      if (gameOver) squareElement.disabled = true;
      target.append(squareElement);
    }
  }
  
  const initBoard = () => {
    squares = [];
    for (let i = 0; i < 9; i++) {
      squares.push({id: i, val: 0});
    }
    renderSquares();
  }
  
  const startGame = () => {
    while (players.length < 2) {
      registerPlayer();
    }
    determineStartingPlayer();
    initBoard();
  }
  
  const resetGame = () => {
    players = [];
    currentPlayer = null;
    initBoard();
  }
  
  const wireButtons = () => {
    document.querySelector("#start-button").addEventListener("click", startGame );
    document.querySelector("#reset-button").addEventListener("click", resetGame );
  }
  
  const init = () => {
    wireButtons();
    initBoard();
  }
  
  return { init }
})();

game.init();