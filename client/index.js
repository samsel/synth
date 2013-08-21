(function($, window) {

	'use strict';

	var UI,
		NOTES,
		Socket;

	NOTES = {
		"C3"  : 48,
		"C#3" : 49,
		"D3"  : 50,
		"D#3" : 51,
		"E3"  : 52,
		"F3"  : 53,
		"F#3" : 54,
		"G3"  : 55,
		"G#3" : 56,
		"A3"  : 57,
		"A#3" : 58,
		"B3"  : 59,
		"C4"  : 60
	};	

	UI = (function UI() {

		var circleStyle,
			$circle,
			scope;

		function init() {
			build();
			circleStyle = document.getElementById('circle').style;
			$circle = $('#circle');
			scope = $('.scope');
		}

		function build() {
			var noteString = '';
			Object.keys(NOTES).forEach(function(key, i, array) {
				noteString += "<div data-freq='"  + NOTES[key] + "'>" + key + "</div>";
			});
			$('.scope').append(noteString);
		}

		function move(data) {
			var left;
			if(data.x > 0 && data.x < 100) {
				left = $circle.position().left + data.x;				
			}
			else {
				left = $circle.position().left - (255 - data.x);		
			}
			if(left && left > 0 && left < scope.width()) {
				circleStyle.webkitTransform = 'translateX(' + left + 'px)';
			}
		}

		function clicked(data) {
			console.log(data.type);
		}

		function process(data) {
			data.click ? clicked(data) : move(data)
		}		
		
		return {
			init: init,
			process: process
		};
	})();


	Socket = (function Socket() {

		var socket;

		function onopen() {
			socket.send(63);
		}

		function onmessage(e) {
			UI.process(JSON.parse(e.data));
		}

		function onclose() {

		}	

		function listen() {
			socket = new WebSocket("ws://localhost:8080");
			socket.onopen = onopen;
			socket.onmessage = onmessage;
			socket.onclose = onclose;
		}					
		
		return {
			listen: listen
		};
	})();


	$(function() {
		UI.init();
		Socket.listen();
	});

})($, window);
