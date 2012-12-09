$(document).ready(function() {
	SNAKE.init();
	if(GRAPHICS.init()) {
		console.log("GRAPHICS init ok! yay!");
	}
	else {
		//displayMessage("Your browser does not seem to support HTML5 canvas...");
	}
});