/* ************************************************************************** */
/*                              CREATE GAMEBOARD                              */
/* ************************************************************************** */
let gameBoardCount = 0;
function createGameBoard() {
	const gameBoardNumber = gameBoardCount;
	gameBoardCount++;

	const id = crypto.randomUUID();
	const gameBoard = ["", "", "", "", "", "", "", "", ""];
	const winConditionArray = (() => {
		function createWinCondition(a, b, c) {
			return ((symbol) => {
				if (symbol === gameBoard[a]
					&& symbol === gameBoard[b]
					&& symbol === gameBoard[c]) {
					return (true);
				}
				return (false);
			});
		}
		return ([
			createWinCondition(0, 1, 2),
			createWinCondition(3, 4, 5),
			createWinCondition(6, 7, 8),
			createWinCondition(0, 3, 6),
			createWinCondition(1, 4, 7),
			createWinCondition(2, 5, 8),
			createWinCondition(0, 4, 8),
			createWinCondition(2, 4, 6),
		]);
	})();

	const getId = () => { return (id); };
	const getGameBoardNumber = () => { return (gameBoardNumber); };
	const getGameBoard = () => { return (gameBoard); };
	const getTile = (index) => { return (gameBoard[index]); };

	const setTile = (index, symbol) => { gameBoard[index] = symbol; };

	const checkWin = (symbol) => {
		for (let i = 0; i < winConditionArray.length; i++) {
			if (winConditionArray[i](symbol)) {
				return (true);
			}
		}
		return (false);
	};
	const checkTie = () => {
		for (let i = 0; i < gameBoard.length; i++) {
			if (gameBoard[i] === "") {
				return (false);
			}
		}
		return (true);
	};

	return ({
		getId, getGameBoardNumber, getGameBoard,
		getTile, setTile,
		checkWin, checkTie
	});
}

/* ************************************************************************** */
/*                                CREATE PLAYER                               */
/* ************************************************************************** */
function createPlayer() {
	const id = crypto.randomUUID();
	let symbol = "";
	let name = "";
	let win = 0;
	let lose = 0;
	let tie = 0;

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

function getPlayerFromId(playerId) {
	for (let i = 0; playerArray.length; i++) {
		if (playerArray[i].getId() === playerId) {
			return (playerArray[i]);
		}
	}
}

/* ************************************************************************** */
/*                                 CREATE GAME                                */
/* ************************************************************************** */
function createGame(player1, player2) {
	const gameBoard = createGameBoard();

	function endGame(player) {
		if (player === null) {
			player1.incrementTie();
			player2.incrementTie();
			return (0);
		}
		if (player.getId() === player1.getId()) {
			player1.incrementWin();
			player2.incrementLose();
			return (1);
		} else if (player.getId() === player2.getId()) {
			player2.incrementWin();
			player1.incrementLose();
			return (2);
		}
	}

	function playerTurn(player) {
		const playerMove = parseInt(prompt(`play ${player.getSymbol()}, index 0-8`));
		if (playerMove === NaN
			|| playerMove > 8
			|| playerMove < 0
			|| gameBoard.getTile(playerMove) !== "") {
			console.log("invalid, try again");
			return (0);
		}
		gameBoard.setTile(playerMove, player.getSymbol());
		return (1);
	}

	const gameLoop = () => {
		let turnCount = 0;
		while (turnCount < 9) {
			if ((turnCount % 2) === 0) {
				turnCount += playerTurn(player1);
			} else {
				turnCount += playerTurn(player2);
			}
			console.log(gameBoard.getGameBoard());
			if (gameBoard.checkWin(player1.getSymbol())) {
				return (endGame(player1));
			}
			if (gameBoard.checkWin(player2.getSymbol())) {
				return (endGame(player2));
			}
			if (gameBoard.checkTie()) {
				return (endGame(null));
			}
		}
	};

	const getGameBoard = () => { return (gameBoard); };
	const getPlayer1 = () => { return (player1); };
	const getPlayer2 = () => { return (player2); };
	return ({
		gameLoop, getGameBoard,
		getPlayer1, getPlayer2
	});
}

/* ************************************************************************** */
/*                                GAME DISPLAY                                */
/* ************************************************************************** */
const gameBoardElement = document.getElementById("gameContainer");
const gameTileElementArray = document.getElementsByClassName("gameTile");

/* ************************************************************************** */
/*                               HISTORY DISPLAY                              */
/* ************************************************************************** */
const historyElement = document.getElementById("history");

function updateHistory(game, gameResult) {
	const newListItem = document.createElement("li");
	newListItem.className = "historyCard";
	const gameData = [
		`Game ${game.getGameBoard().getGameBoardNumber()}: `,
		`PLAYER 1: ${game.getPlayer1().getName()}`,
		`PLAYER 2: ${game.getPlayer2().getName()}`
	];

	function updateGameStatus(status, color) {
		gameData[0] += status;
		newListItem.style.borderColor = `var(--${color})`;
		newListItem.style.backgroundColor = `var(--${color}-clear)`;
	}

	switch (gameResult) {
		case 0:
			updateGameStatus("TIE", "rebecca-purple"); break;
		case 1:
			updateGameStatus("PLAYER 1 WIN", "light-sea-green"); break;
		case 2:
			updateGameStatus("PLAYER 2 WIN", "sunflower-gold"); break;
	}
	gameData.forEach((data) => {
		const paragraph = document.createElement("p");
		paragraph.textContent = data;
		newListItem.appendChild(paragraph);
	})
	historyElement.appendChild(newListItem);
}

/* ************************************************************************** */
/*                               PLAYER DISPLAY                               */
/* ************************************************************************** */
const playerListElement = document.getElementById("playerList");

function updatePlayerList() {
	while (playerListElement.firstChild) {
		playerListElement.removeChild(playerListElement.firstChild);
	}
	for (let i = 0; i < playerArray.length; i++) {
		const newListItem = document.createElement("li");
		newListItem.className = "playerCard";
		const playerStats = [
			`Name: ${playerArray[i].getName()}`,
			`Win: ${playerArray[i].getWin()}`,
			`Lose: ${playerArray[i].getLose()}`,
			`Tie: ${playerArray[i].getTie()}`
		];
		playerStats.forEach((stat) => {
			const paragraph = document.createElement("p");
			paragraph.textContent = stat;
			newListItem.appendChild(paragraph);
		});
		playerListElement.appendChild(newListItem);
	}
}

/* ************************************************************************** */
/*                               PLAYER CREATION                              */
/* ************************************************************************** */
const createPlayerFormElement = document.getElementById("createPlayerForm");
const createPlayerButtonElement = document.getElementById("createPlayerButton");
const player1SelectElement = document.getElementById("player1Select");
const player2SelectElement = document.getElementById("player2Select");
const playerArray = [];

function createForm() {
	const newForm = document.createElement("form");
	newForm.name = `createPlayerForm`;
	newForm.action = "";
	newForm.method = "POST";

	function createLabel(text, id) {
		const label = document.createElement("label");
		label.textContent = text;
		label.htmlFor = id;
		label.className = "formItem";
		return (label);
	}

	function createInput(id, type) {
		const input = document.createElement("input");
		input.name = id;
		input.id = id;
		input.type = type;
		input.required = true;
		input.minLength = 1;
		input.className = "formItem";
		return (input);
	}

	function createButton(text, type) {
		const button = document.createElement("button");
		button.textContent = text;
		button.type = type;
		button.className = "formItem";
		return (button);
	}

	function updatePlayerSelection(selectElement, newPlayer) {
		const newOption = document.createElement("option");
		newOption.value = newPlayer.getId();
		newOption.textContent = newPlayer.getName();
		selectElement.appendChild(newOption);
	}

	newForm.appendChild(createLabel("Player name:", "playerName"));
	newForm.appendChild(createInput("playerName", "text"));

	newForm.appendChild(createButton("Submit", "submit"));

	newForm.addEventListener("submit", (e) => {
		let formData = new FormData(newForm);
		const newPlayer = createPlayer();

		newPlayer.setName(formData.get("playerName"));
		playerArray.push(newPlayer);
		createPlayerFormElement.removeChild(newForm);
		updatePlayerSelection(player1SelectElement, newPlayer);
		updatePlayerSelection(player2SelectElement, newPlayer);
		updatePlayerList();
		e.preventDefault();
	});

	return (newForm);
}

createPlayerButtonElement.addEventListener("click", () => {
	createPlayerFormElement.appendChild(createForm());
});

/* ************************************************************************** */
/*                                 START GAME                                 */
/* ************************************************************************** */
const startGameButtonElement = document.getElementById("startGameButton");

startGameButtonElement.addEventListener("click", () => {
	if (player1SelectElement.value === player2SelectElement.value) {
		console.warn("Player cannot play against himself");
		return;
	}

	const player1 = getPlayerFromId(player1SelectElement.value);
	const player2 = getPlayerFromId(player2SelectElement.value);
	player1.setSymbol("X");
	player2.setSymbol("O");
	const game = createGame(player1, player2);
	const gameResult = game.gameLoop();
	updateHistory(game, gameResult);
	updatePlayerList();
});
