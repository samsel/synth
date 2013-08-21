module.exports = function(input /* array */) {

	var click = false,
		type = false; // true = pressDown, false = pressUp  

     if(input[1] === 0 && input[2] === 0) {
     	click = true;
     	type = input[0] !== 0;
     }

	return {
		click: click,
		type: type,
		x: input[1],
		y: input[2]
	};
};
