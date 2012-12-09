$(document).ready(function() {
	SNAKE.init();
	if(GRAPHICS.init()) {
		console.log("GRAPHICS init ok! yay!");
	}
	else {
		//displayMessage("Your browser does not seem to support HTML5 canvas...");
	}

	var socket = io.connect('http://localhost');
	socket.on('players', function(players) {
		console.log(players);
	})
});