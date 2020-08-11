const gameContainer = document.getElementById('game');
const scoreBoard = document.getElementById('scoreBoard');
let clickCount = 0;
const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];
const guesses = [];
let divId = 0;
let score = 0;
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);
		newDiv.ID = divId;
		divId++;

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);

		//Scoreboard population
		scoreBoard.innerText = `Score: ${score}`;
	}
}

// TODO: Implement this function!
function handleCardClick(event) {
	// you can use event.target to see which element was clicked
	console.log('you just clicked', event.target);
	console.log(event);
	let checkForMatch = function() {
		console.log(guesses);
		//Check to see if the same box was clicked twice.
		if (guesses[0].ID === guesses[1].ID) {
			alert('Cannot chose the same box twice, please choose a new box');
			clickCount = 0;
			guesses[0].style.backgroundColor = 'white';
			guesses.splice(0);
		} else {
			if (guesses[0].className === guesses[1].className) {
				setTimeout(function() {
					alert("It's a match!");
					clickCount = 0;
					guesses.splice(0);
					score += 50;
					scoreBoard.innerText = `Score: ${score}`;
				}, 500);
			} else {
				setTimeout(function() {
					alert('Sorry not a match');
					guesses[0].style.backgroundColor = 'white';
					guesses[1].style.backgroundColor = 'white';
					clickCount = 0;
					guesses.splice(0);
				}, 500);
			}
		}
	};

	if (clickCount < 2) {
		event.target.style.backgroundColor = event.target.className;
		guesses.push(event.target);
		clickCount++;
	} else {
		alert('Too many guesses');
	}
	if (clickCount === 2) {
		checkForMatch();
	}
}

// when the DOM loads
createDivsForColors(shuffledColors);
