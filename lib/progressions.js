var generator = require("./generator.js");

var progression = function(tonic, type){
	console.log(generator.generator("C", "Major"));

}

progression("C", "Major");

module.exports.progression = progression;


