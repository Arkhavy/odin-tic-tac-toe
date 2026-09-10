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

console.warn("PLAYER INFO TESTS");
const playerOne = createPlayer();
const playerTwo = createPlayer();
const playerThree = createPlayer();
const playerFour = createPlayer();

displayPlayer(playerOne);
displayPlayer(playerTwo);
displayPlayer(playerThree);
displayPlayer(playerFour);

playerOne.setSymbol("X");
playerOne.setName("Ouaf");

playerTwo.setSymbol("O");
playerTwo.setName("Woof");

playerThree.setSymbol("A");
playerThree.setName("wif");

playerFour.setSymbol("L");
playerFour.setName("arf");

displayPlayer(playerOne);
displayPlayer(playerTwo);
displayPlayer(playerThree);
displayPlayer(playerFour);

/* ***************************** GAMEBOARD TEST ***************************** */
function displayGameBoard(gameBoard) {
	console.warn(gameBoard);
	console.log(`ID: ${gameBoard.getId()}`);
	console.log(`GameBoardNumber: ${gameBoard.getGameBoardNumber()}`);
	console.log(`GameBoard: ${gameBoard.getGameBoard()}`);
}

/* ******************************** GAME TEST ******************************* */
function displayGame(game) {
	console.warn(game);
	console.log(game.getGameBoard());
	displayPlayer(game.getPlayer1());
	displayPlayer(game.getPlayer2());
}

const game1 = createGame(playerOne, playerTwo);
displayGame(game1);
displayGameBoard(game1.getGameBoard());
game1.gameLoop();
displayGameBoard(game1.getGameBoard());
displayPlayer(playerOne);
displayPlayer(playerTwo);