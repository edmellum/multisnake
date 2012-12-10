$(document).ready(function() {
	SNAKE.init();
	if(GRAPHICS.init()) {
		console.log("GRAPHICS init ok! yay!");
	}
	else {
		//displayMessage("Your browser does not seem to support HTML5 canvas...");
	}

	window.socket = io.connect();
	socket.on('players', function(players) {
		$('#playerboard').empty();
		for(key in players) {
			$('#playerboard').append('<li>' + key + '</li>');
		}
	})

	socket.on('highscores', function(scores){
		var scoreboard = $("#highscore-container ul");
		scoreboard.html("");
		for(var i = 0; i < scores.length; i++){
			scoreboard.append($("<li>" + scores[i].score + " - " + scores[i].name + "</li>"));
		}
	});
	socket.on('scoreUpdate', function(score) {
		console.log("liveUpdate" + score.name);
		var scoreUpdate = $("#liveUpdate h1");
		scoreUpdate.text(score.name + " - " + score.score);
		
	})
});