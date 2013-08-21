var coremidi = require('coremidi'),
	midi = require('midi-api')()
    .bank(20).program(10).rest(100);

module.exports = (function() {

	function process(data) {
		midi.noteOff().noteOn(parseInt(data, 10), 127).rest(1000);
		midi.pipe(coremidi());
	}

	return {
		process: process
	};
	
})();