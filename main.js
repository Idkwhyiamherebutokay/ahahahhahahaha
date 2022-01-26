

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');



const wall = (x1, y1, x2, y2) => {
	console.log("wall? maybe!")
	context.beginPath();

	context.fillStyle = "green"

	context.rect(x1, y1, x2, y2);

	context.stroke();
	context.fill();
}

const mapAlg = (map) => {
	for(let bar = 0; bar < map.length; bar++) {
/	console.log("aadadad", map[bar], "ooosa")/


		for (let gar = 0; gar < map[bar].length; gar ++) {

			if (map[bar][gar] == "_") {
				console.log("path")
		
			} else if (map[bar][gar] == "#") {
				wall(10 * gar, 10 * bar, 10 * gar + 10, 10 * bar + 10)
			}
		}

	}	
}


let map = [
"____",
"#_#_",
"#_#_",
"#_#_",
"__#__#______#"
]


mapAlg(map)
