var http = require('http');

var socketio = require('socket.io');
var ecstatic = require('ecstatic');

var players = {};
var scores = [];
var maxScores = 2;

var fileServer = ecstatic({root: __dirname + '/public'});
var httpServer = http.createServer(fileServer);

var io = socketio.listen(httpServer);
httpServer.listen(8080);

io.sockets.on('connection', function(socket) {
	players[socket.id] = {};
	io.sockets.emit('players', players);

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
	});

	socket.on('disconnect', function() {
		delete players[socket.id];
		io.sockets.emit('players', players);
	});
});
Array.prototype.min = function() {
	var min = this[0].score;
	var len = this.length;
	for (var i = 1; i < len; i++) if (this[i] < min) min = this[i];
	return min;
}
function sortResults(){
	return scores.sort(function(b,a) { return parseInt(a.score) - parseInt(b.score) } );
}