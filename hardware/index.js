


var HID = require('node-hid'),
	mouse;

mouse = HID.devices().filter(function(device, index, array) {
	return device.productId === 581; //49250
});

console.dir(HID.devices());

if(mouse.length) {
	mouse = new HID.HID(mouse[2].path);
}
else {
	throw new Error("Mouse not found");
}

var trigger = function() {
	mouse.read(readFn);
};

var readFn = function(error, data) {
	if(error) {
		console.dir(error);
	}
	console.dir(data);
	trigger();
};

trigger();