var coremidi = require('coremidi'),
	midi = require('midi-api')()
    .bank(20).program(1).rest(100);

module.exports = (function() {

	var patchMap = {
			"piano"   : 1,
			"bell"    : 10,
			"violin"  : 40,
			"guitar"  : 29,
			"e.piano" : 14,
			"string"  : 49,
			"cello"   : 42,
			"orch"    : 55,
			"drum"    : 118
	};

	function instrumentPatchId(instrumentName) {
		return (patchMap[instrumentName] || 1);
	}

	function process(data) {
		midi.program(instrumentPatchId(data.instrument));
		midi.noteOff().noteOn(parseInt(data.note, 10)).rest(500);
		midi.pipe(coremidi());
	}

	return {
		process: process
	};

})();