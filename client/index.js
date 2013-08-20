(function($, window) {

	'use strict';

	var UI,
		NOTES,
		Socket;

	NOTES = {
		"C3"  : 130.813,
		"C#3" : 138.591,
		"D3"  : 146.832,
		"D#3" : 155.563,
		"E3"  : 164.814,
		"F3"  : 174.614,
		"F#3" : 184.997,
		"G3"  : 195.998,
		"G#3" : 207.652,
		"A3"  : 220,
		"A#3" : 233.082,
		"B3"  : 246.942,
		"C4"  : 261.626
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

		function move(coords) {
			//console.log(coords);

			if(coords[0] > 0 && coords[0] < 100) {
				var left = $circle.position().left + coords[0];
				if(left < scope.width()) {
					circleStyle.webkitTransform = 'translateX(' + left + 'px)';
				}				
			}
			else {
				var left = $circle.position().left - (255 - coords[0]);
				if(left > 0) {
					circleStyle.webkitTransform = 'translateX(' + left + 'px)';
				}				
			}
		}		
		
		return {
			init: init,
			move: move
		};
	})();


	Socket = (function Socket() {

		var socket;

		function onopen() {
			socket.send("Message to send");
		}

		function onmessage(e) {
			UI.move(JSON.parse(e.data));
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
