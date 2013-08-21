var hardware = require('../hardware'),
	format = require('./format'),
	WebSocket = require('ws'),
	midi = require('./midi'),
	server;

server = new WebSocket.Server({port: 8080});

server.on('connection', function(ws) {

    ws.on('message', function(message) {
        midi.process(JSON.parse(message));
    });

	hardware.on("data", function(data) {
		ws.send(JSON.stringify(format(data)));
	});    
});

