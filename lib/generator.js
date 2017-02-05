/* Function outputs popular chord progression depending on key/style */

global.circleOfFifths = ["Cb", "Gb", "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#"]

var generator= function(tonic, type){
	//Arguments should be A - G and types Major, minor, blues, or jazz

	//initialize variables
	var tones = new Array("A", "B", "C", "D", "E", "F", "G");
	var count = 0;
	var found = false;
	var flat = false;
	var pos = 7;
	var interval;
	var sign = "#";
	var progression = new Array(3);

	//look for key within circle of fifths
	while(!found){
		if(circleOfFifths[pos+count]==tonic){
			found = true;
			pos = pos+count;
		}
		else if(circleOfFifths[pos-count]==tonic){
			found = true;
			pos = pos-count;
		}
		else{
			count++;
		}
	}

	//minor key case
	if (type == "Minor" || type == "minor"){

		pos -= 3;

		if(pos >= 0 && pos < 5){
			count += 3;
		}
		else if(pos > 4 && pos < 7){
			count = 3 - count;
		}
		else{
			count -= 3;
		}
	}

	//determine whether key uses flats or sharps
	if (pos < 7){
		flat = true;
		pos = 1;
		interval = 3;
		var sign = "b";
	}
	else{
		pos = 5;
		interval = 4;
	}
	for(var i = 0; i < count; i++){
	
		tones[pos] = tones[pos] + sign;
		pos = (pos+interval)%7;
		//count--;
	}

	pos = (2 + (count*interval))%7;
	if (type == "Major"){
		progression[0]=tones[pos]+" "+tones[(pos+4)%7]+" "+tones[(pos+5)%7]+"m " + tones[(pos+3)%7] + " (I V vi IV)";
		progression[1]=tones[pos]+" "+tones[(pos+5)%7]+"m "+tones[(pos+3)%7]+" " + tones[(pos+4)%7] + " (I vi IV V)";
		progression[2]=tones[pos]+" "+tones[(pos+2)%7]+"m "+tones[(pos+3)%7]+" " + tones[(pos+4)%7] + " (I iii IV V)";
		console.log(progression);
	}

	if (type == "Jazz"){
		progression[0]=tones[(pos+1)%7]+"m "+tones[(pos+4)%7] + " "+ tones[pos];
		console.log(progression[0]+ " (ii V I)");
	}

	if (type == "Minor"){
		pos = (pos+5)%7;
		//adjust minor offset
		progression[0]=tones[pos]+"m "+tones[(pos+3)%7]+"m "+tones[(pos+4)%7]+ "m (i iv v)";
		progression[1]=tones[pos]+"m "+tones[(pos+5)%7]+" "+tones[(pos+6)%7]+ " (i VI VII)";
		progression[2]=tones[pos]+"m "+tones[(pos+3)%7]+"m "+tones[(pos+6)%7]+ " (i iv VII)";
		console.log(progression);

	}





	//var a = circleOfFifths[pos];
	//console.log(tones[pos]);
};
generator(process.argv[2], process.argv[3]);

module.exports.generator = generator;