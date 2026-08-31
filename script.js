function createPlayer() {
	let name = "";
	let win = 0;
	let lose = 0;
	let tie = 0;
	let symbol = "";

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
		getSymbol, getName,
		getWin, getLose,
		getTie, setSymbol,
		setName, incrementWin,
		incrementLose, incrementTie
	});
}

const playerOne = createPlayer();
const playerTwo = createPlayer();


/* ************************************************************************** */
/*                                    TEST                                    */
/* ************************************************************************** */
function displayPlayer(player) {
	console.log(player);
	console.log(`symbol: ${player.getSymbol()}`);
	console.log(`name: ${player.getName()}`);
	console.log(`win: ${player.getWin()}`);
	console.log(`lose: ${player.getLose()}`);
	console.log(`tie: ${player.getTie()}`);
}

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
