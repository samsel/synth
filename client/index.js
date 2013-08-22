(function($, window) {

	'use strict';

	var UI,
		NOTES,
		Socket,
		System;

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
			scope,
			note,
			noteWidth,
			instrument;

		function init() {
			build();
			circleStyle = document.getElementById('circle').style;
			$circle = $('#circle');
			scope = $('.scope');
			noteWidth = $('.scope > div').width();
			$('#instruments input').on('change', function(e) {
				instrument = $(e.target).attr('data-inst').toLocaleLowerCase();
			});
			$('#instruments input:eq(1)').trigger('click');
		}

		function build() {
			var noteString = '';
			Object.keys(NOTES).forEach(function(key, i, array) {
				noteString += "<div data-midi='"  + NOTES[key] + "'>" + key + "</div>";
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

		function keyUp() {
			var left = $circle.position().left;
			if(left && left > 0 && left < scope.width()) {
				note = $(".scope > div:eq(" + Math.floor(left/noteWidth) + ")");
				Socket.send({
					note: note.attr('data-midi'),
					instrument: instrument 
				});
				note.addClass('on');
			}			
		}

		function keyDown() {
			note.removeClass('on');
		}		

		function clicked(data) {
			//keyDown = true and keyUp = false
			(data.type ? keyUp() : keyDown()); 
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

		}

		function onmessage(e) {
			UI.process(JSON.parse(e.data));
		}

		function onclose() {

		}	

		function send(data) {
			socket.send(JSON.stringify(data));
		}			

		function listen() {
			socket = new WebSocket("ws://localhost:8080");
			socket.onopen = onopen;
			socket.onmessage = onmessage;
			socket.onclose = onclose;
		}					
		
		return {
			listen: listen,
			send: send
		};
	})();


	System = {
		start: function() {
			// var server = require('../server');
		}
	};

	$(function() {
		System.start();
		UI.init();
		Socket.listen();
	});

})($, window);
