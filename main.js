

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

context.canvas.width  = window.innerWidth;
context.canvas.height = window.innerHeight;

let winhigh = window.innerHeight
let winwid = window.innerWidth


const wall = (x1, y1, w, h) => {
	console.log("wall? maybe!", x1, y1, w, h)
	context.beginPath();

	context.fillStyle = "green"


	context.rect(x1, y1, w, h);

	context.stroke();
	context.fill();
}

const mapAlg = (map) => {
	const numRows = map.length
	const numCols = map[0].length // We assume all rows have same number of cols 
	for(let bar = 0; bar < map.length; bar++) {
/	console.log("aadadad", map[bar], "ooosa")/


		for (let gar = 0; gar < map[bar].length; gar ++) {

			if (map[bar][gar] == "_") {
				console.log("path")
		
			} else if (map[bar][gar] == "#") {
				wall(context.canvas.width/numCols * gar, context.canvas.height/numRows * bar, context.canvas.width/numCols, context.canvas.height/numRows)
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


				if (flar%2 == 0 && mar%2 == 0) {

					dar += "_"

				}



				else {

					dar += "#"

				}





			}

			goblar.push(dar)



		}


	return goblar
} 

let mopler = grid(10, 10) 

console.log(mopler)

mapAlg(mopler)

// 0/2 = 0 R 0
// 1/2 = 0 R 1
// 2/2 = 1 R 0
// 3/2 = 1 R 1
// 4/2 = 2 R 0
// 5/2 = 2 R 1