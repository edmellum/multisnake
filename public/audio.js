var AUDIO = (function(a) {
	var a = {};
	a.play = function(id) {
		$("#" + id)[0].play();
	}
	
	return a;
})(AUDIO || {});