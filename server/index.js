var hardware = require('../hardware'),
	WebSocket = require('ws'),
	server;


server = new WebSocket.Server({port: 8080});

server.on('connection', function(ws) {

    ws.on('message', function(message) {
        console.log('received: %s', message);
    });

	hardware.on("data", function(data) {
		ws.send(JSON.stringify(data.splice(1,2)));
	});    
});