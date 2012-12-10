var http = require('http');

var socketio = require('socket.io');
var ecstatic = require('ecstatic');

var players = {};
var scores = [];
var maxScores = 5;

var fileServer = ecstatic({root: __dirname + '/public'});
var httpServer = http.createServer(fileServer);

var io = socketio.listen(httpServer);
httpServer.listen(8080);

io.sockets.on('connection', function(socket) {
	players[socket.id] = {};
	socket.emit('players', players);
	socket.emit('highscores', scores);
	socket.on('update', function(player) {
		io.sockets.emit('update', player);
	});

	socket.on('score', function(score) {
		if (scores.length < maxScores){
			scores.push(score);
		}
		else
		{
			var minScore = scores[scores.length - 1].score;
			if(score.score > minScore)
			{
				scores[scores.length -1] = score;	
			}
		}
		scores = sortResults();
		console.log("SCORE @" + score.score + " for " + score.name);
		io.sockets.emit('highscores', scores);
		io.sockets.emit('scoreUpdate', score);
	});

	socket.on('disconnect', function() {
		delete players[socket.id];
	});


});

function sortResults(){
	return scores.sort(function(b,a) { return parseInt(a.score) - parseInt(b.score) } );
}