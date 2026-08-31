const gameBoard = ["", "", "", "", "", "", "", "", ""];

function Player(symbol) {
	if (!new.target) {
		throw Error("You must use the 'new' operator to call the constructor");
	}
	this.symbol = symbol;
	this.win = 0;
	this.tie = 0;
	this.lose = 0;
}

const playerOne = new Player("X");
const playerTwo = new Player("O");

/* ************************************************************************** */
/*                               WIN CONDITIONS                               */
/* ************************************************************************** */
function createWinCondition(a, b, c) {
	console.log(`createWinCondition ${a} ${b} ${c}`);
	return ((symbol) => {
		if (symbol === gameBoard[a]
			&& symbol === gameBoard[b]
			&& symbol === gameBoard[c]
		) {
			console.log(`check ${symbol} on ${a} ${b} ${c} = true`);
			return (true);
		}
		console.log(`check ${symbol} on ${a} ${b} ${c} = false`);
		return (false);
	});
}

// lines
const check012 = createWinCondition(0, 1, 2);
const check345 = createWinCondition(3, 4, 5);
const check678 = createWinCondition(6, 7, 8);

// columns
const check036 = createWinCondition(0, 3, 6);
const check147 = createWinCondition(1, 4, 7);
const check258 = createWinCondition(2, 5, 8);

// diagonals
const check048 = createWinCondition(0, 4, 8);
const check246 = createWinCondition(2, 4, 6);

function checkWin(symbol) {
	console.log(`checkWin ${symbol}`);
	if (check012(symbol)) { return (true); }
	if (check345(symbol)) { return (true); }
	if (check678(symbol)) { return (true); }
	if (check036(symbol)) { return (true); }
	if (check147(symbol)) { return (true); }
	if (check258(symbol)) { return (true); }
	if (check048(symbol)) { return (true); }
	if (check246(symbol)) { return (true); }
	return (false);
}

/* ************************************************************************** */
/*                                TIE CONDITION                               */
/* ************************************************************************** */
function checkGameBoard() {
	console.log("checkGameBoard");
	for (let i = 0; i < 9; i++) {
		if (gameBoard[i] === "") {
			console.log("false");
			return (false);
		}
	}
	console.log("true");
	return (true);
}

/* ************************************************************************** */
/*                                 PLAYER MOVE                                */
/* ************************************************************************** */
let turnCount = 0;
while (!checkGameBoard() && !checkWin(playerOne.symbol) && !checkWin(playerTwo.symbol) && turnCount < 9) {
	console.log(`turn ${turnCount}`, gameBoard);
	// playerTurn
	let playerMove = -1;
	if ((turnCount % 2) === 0) {
		playerMove = parseInt(window.prompt("play X, give index between 0 and 8"));
	} else {
		playerMove = parseInt(window.prompt("play O, give index between 0 and 8"));
	}
	console.log(playerMove);

	// checkMove
	if (playerMove === NaN || playerMove === -1 || gameBoard[playerMove] !== "") {
		console.log(`playerMove ${playerMove} invalid, try again`);
		continue;
	}
	if ((turnCount % 2) === 0) {
		gameBoard[playerMove] = "X";
	} else {
		gameBoard[playerMove] = "O";
	}
	turnCount++;
}
console.log(`turn ${turnCount}`, gameBoard);

/*
function playerTurn(player) {
	const playerMove = parseInt(prompt(`play ${player.symbol}, index 0-8`));
	if (playerMove === NaN || playerMove > 8 || playerMove < 0 || gameBoard[playerMove] !== "") {
		console.log("invalid try again");
		return (0);
	}
	gameBoard[playerMove] = player.symbol;
	return (1);
}

while (checkGameBoard && checkWin && turnCount) {
	if ((turnCount % 2) === 0) {
		turnCount += playerTurn(playerOne);
	} else {
		turnCount += playerTurn(playerTwo);
	}
}
*/