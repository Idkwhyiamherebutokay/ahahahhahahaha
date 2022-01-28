

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');



const wall = (x1, y1, w, h) => {
	console.log("wall? maybe!")
	context.beginPath();

	context.fillStyle = "green"

	context.rect(x1, y1, w, h);

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
				wall(10 * gar, 10 * bar, 10, 10)
			}
		}

	}	
}


let map = []



const grid = (bar, gar) => {

let goblar = []

	for(let mar = 0; mar < bar; mar ++) {

		let dar = ""

		for(let flar = 0; flar < gar; flar ++) {

			dar += "#"



		}

		goblar.push(dar)



	}


return goblar
} 

let mopler = grid(10, 10) 

console.log(mopler)

mapAlg(mopler)