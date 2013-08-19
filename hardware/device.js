var Device,
	Readable = require('stream').Readable,
	util = require('util'),
	hid = require('./hid');


module.exports = Device = function(name) {
	
	var device = hid.find(name),
		errorCB = function(err) {
			console.dir(err);
		},
		parser;

	Readable.call(this);
	this.on('error', errorCB);

	parser = function(err, data) {
		if(err) errorCB(err);

		this.emit("data", data);
		device.read(parser);
	};

	parser = parser.bind(this)
	device.read(parser);

	return this;
};

util.inherits(Device, Readable);