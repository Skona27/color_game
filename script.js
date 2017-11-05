var numOfSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons() {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons.forEach(function(button) {
				button.classList.remove("selected");
			});
			this.classList.add("selected");

			if(this.textContent === "Easy") {
				numOfSquares = 3;
			} else if(this.textContent === "Medium") {
				numOfSquares = 6;
			} else {
				numOfSquares = 9;
			}

			reset();
		});
	}
}

function setupSquares() {
	for(var i = 0; i < squares.length; i++) {
		/*Add click listeneres to squares*/
		squares[i].addEventListener("click", function() {
			/*Get color of clicked square*/
			var clickedColor = this.style.backgroundColor;
			/*Compare square color to pickedColor*/
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function reset() {
	/*Generate new colors*/
	colors = generateColors(numOfSquares);
	/*Pick new random color*/
	pickedColor = pickColor();
	/*Change colors of squares and displayed color*/
	colorDisplay.textContent = pickedColor;

	for(var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	/*Change h1 background color and messages*/
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
}

resetButton.addEventListener("click", function() {
	reset();
});

function changeColors(color) {
	/*Loop through all squares,
	change each color to match pickedColor*/
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	/*Math.random returns a number between 0 and 1*/
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateColors(int) {
	var array = [];

	/*Get random color and push it into array*/
	for(var i = 0; i < int; i++) {
		array.push(randomColor());
	}
	return array;
}

function randomColor() {
	/*Assign random number to each RGB channels,
	return random rgb color*/
	var r = generateChannel();
	var g = generateChannel();
	var b = generateChannel();
	return "rgb("+r+", "+g+", "+b+")";
}

function generateChannel() {
	/*Return a number between 0-255*/
	return Math.floor(Math.random() * 256);
}