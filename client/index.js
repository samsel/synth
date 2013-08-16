var ws = new WebSocket("ws://localhost:8080");

ws.onopen = function() {
	ws.send("Message to send");
};

ws.onmessage = function(e) { 
	var msg = e.data;
};

ws.onclose = function() { 

};