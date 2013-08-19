/*
 * Returns a initialized device of given  
 * name from a list of HID devices
 */

var HID = require('node-hid');

module.exports = {
	
	find: function(name) {

		if(typeof name !== "string") {
			throw new Error("HID should be inititalized with a name of type String.");
		}

		var devices = HID.devices().filter(function(device, index, array) {
				return device.product.indexOf(name) !== -1;
		});
		if(devices.length) {
			return (new HID.HID(devices[0].path));
		}
		else {
			throw new Error("Device with name: " + name + " not found!");
		}	
	}
	
};