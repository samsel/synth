/*
 * HID Device - mouse
 * 
 * data - returns array of size 6 (indicates 6 bytes with value 0 - 255)
 *		  [byte0, .... byte5]
 *
 * 		  0 - button info
 *        1 - x coord
 *        2 - y coord
 *        3 - returns 0, 255, 1, 254 based on if we move mouse up or down
 *        4 - 0 mean up and 255 means down - center button
 *        5 - always zero
 *
 *
 * Events Emitted:
 *		error
 *		data
 */


var device = module.exports = new (require('./device'))('USB Laser Mouse');

device.on("error", function(err) {
    console.dir(err);
});