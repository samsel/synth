/*
 * Emits events for data/error
 * received from the HID device
 *
 * Events Emitted:
 *		error
 *		data
 */

var Device,
	events = require('events'),
	util = require('util'),
	hid = require('./hid');


module.exports = Device = function(name) {
	
	var device = hid.find(name),
		parser;

	events.EventEmitter.call(this);

	parser = function(err, data) {
		if(err) this.emit("error", err);

		this.emit("data", data);
		device.read(parser);
	};

	parser = parser.bind(this);
	device.read(parser);

	return this;
};

util.inherits(Device, events.EventEmitter);