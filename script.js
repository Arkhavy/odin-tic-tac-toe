let gameBoardCount = 0;
function createGameBoard() {
	const gameBoardNumber = gameBoardCount;
	gameBoardCount++;

	const id = crypto.randomUUID();
	const gameBoard = ["", "", "", "", "", "", "", "", ""];
	let gameState = "waiting"; // waiting | ongoing | win P1 | win P2 | tie
	let player1 = null;
	let player2 = null;

	const getId = () => { return (id); };
	const getGameBoardNumber = () => { return (gameBoardNumber); };
	const getGameBoard = () => { return (gameBoard); };
	const getGameState = () => { return (gameState); };
	const getPlayer1 = () => { return (player1); };
	const getPlayer2 = () => { return (player2); };
	const getTile = (index) => { return (gameBoard[index]); };

	const setTile = (symbol, index) => { gameBoard[index] = symbol; };
	const setPlayer1 = (player) => { player1 = player; };
	const setPlayer2 = (player) => { player2 = player; };

	return ({
		getId, getGameBoardNumber,
		getGameBoard, getGameState,
		getPlayer1, getPlayer2,
		setPlayer1, setPlayer2
	});
}

function createPlayer() {
	const id = crypto.randomUUID();
	let name = "";
	let win = 0;
	let lose = 0;
	let tie = 0;
	let symbol = "";

	const getId = () => { return (id); };
	const getSymbol = () => { return (symbol); };
	const getName = () => { return (name); };
	const getWin = () => { return (win); };
	const getLose = () => { return (lose); };
	const getTie = () => { return (tie); };

	const setSymbol = (newSymbol) => { symbol = newSymbol; };
	const setName = (newName) => { name = newName; };
	const incrementWin = () => { win++; };
	const incrementLose = () => { lose++; };
	const incrementTie = () => { tie++; };

	return ({
		getId,
		getSymbol, getName,
		getWin, getLose,
		getTie, setSymbol,
		setName, incrementWin,
		incrementLose, incrementTie
	});
}

/* ************************************************************************** */
/*                                    TEST                                    */
/* ************************************************************************** */

/* ******************************* PLAYER TEST ****************************** */
function displayPlayer(player) {
	console.log(player);
	console.log(`id: ${player.getId()}`);
	console.log(`symbol: ${player.getSymbol()}`);
	console.log(`name: ${player.getName()}`);
	console.log(`win: ${player.getWin()}`);
	console.log(`lose: ${player.getLose()}`);
	console.log(`tie: ${player.getTie()}`);
}

const playerOne = createPlayer();
const playerTwo = createPlayer();

displayPlayer(playerOne);
displayPlayer(playerTwo);

playerOne.setSymbol("X");
playerOne.setName("Ouaf");

displayPlayer(playerOne);
displayPlayer(playerTwo);

playerTwo.setSymbol("O");
playerTwo.setName("Woof");

displayPlayer(playerOne);
displayPlayer(playerTwo);

playerOne.incrementTie();
playerOne.incrementTie();
playerOne.incrementTie();

displayPlayer(playerOne);
displayPlayer(playerTwo);

/* ***************************** GAMEBOARD TEST ***************************** */
function displayGameBoard(gameBoard) {
	console.warn(gameBoard);
	console.log(`ID: ${gameBoard.getId()}`);
	console.log(`GameBoardNumber: ${gameBoard.getGameBoardNumber()}`);
	console.log(`GameBoard: ${gameBoard.getGameBoard()}`);
	console.log(`GameState: ${gameBoard.getGameState()}`);
	if (gameBoard.getPlayer1()) {
		console.log(`player1: ${gameBoard.getPlayer1().getName()}`);
	} else {
		console.log("No player 1 yet.");
	}
	if (gameBoard.getPlayer2()) {
		console.log(`player2: ${gameBoard.getPlayer2().getName()}`);
	} else {
		console.log("No player 2 yet.");
	}
}

const gameBoardOne = createGameBoard();
const gameBoardTwo = createGameBoard();
const gameBoardThree = createGameBoard();

gameBoardOne.setPlayer1(playerOne);
gameBoardOne.setPlayer2(playerTwo);

displayGameBoard(gameBoardOne);
displayGameBoard(gameBoardTwo);
displayGameBoard(gameBoardThree);
