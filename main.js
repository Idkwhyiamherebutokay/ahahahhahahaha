

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

let blocker = Math.min(window.innerHeight, window.innerWidth)

context.canvas.width  = blocker;
context.canvas.height = blocker;


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
		
			} 

			else if (map[bar][gar] == "#") {
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

let visited = []

const locateNB = (mazeMap, row, coll) => {

// let localNB = [[wor + 2, lloc], [wor, lloc + 2], [wor - 2, lloc], [wor, lloc -2] ] 


let localNB = []

if(row - 2 >= 0) {
	localNB.push( [row - 2, coll] )

}

if(coll - 2 >= 0) {
	localNB.push( [row, coll - 2] )
}

if(row + 2 < mazeMap.length) {
	localNB.push( [row + 2, coll] )
}

if(coll + 2 < mazeMap[0].length) {
	localNB.push( [row, coll + 2] )
}

console.log(localNB)

return localNB


}

let randomRange = (min, max) => {

	return Math.floor(Math.random() * (max - min) + min);

}

let shuffleNB = (NBlist) => {

	for(let i = NBlist.length - 1; i >= 0; i--) {

		let j = randomRange(0, i)

		let tmp = [NBlist[i][0], NBlist[i][1]]

		NBlist[i] = [NBlist[j][0], NBlist[j][1]]

		NBlist[j] = [tmp[0], tmp[1]]



	}


	return(NBlist)


}




 
let isVis = (vis, row, coll) => {

 	for(let jorgan = 0; jorgan < vis.length; jorgan ++) {


      	if(vis[jorgan][0] == row && vis[jorgan][1] == coll) {

        	console.log("visited!")

     		return true

     	 }




   	 }

   	 return false
}


let delWallNB = (mazeMap, row1, coll1, row2, coll2) => {


	if(row1 - row2 == 0) {
	
		if (coll1 - coll2 > 0) {

			mazeMap[row1][coll1 - 1] = "_"

			console.log("this is a test!")

		}

		else {

			mazeMap[row1][coll1 + 1] = "_"

		}

	}

	else if (coll1 - coll2 == 0) {

		if(row1 - row2 > 0) {

			mazeMap[row1 - 1][coll1] = "_"

		}

		else {

			mazeMap[row1 + 1][coll1] = "_"

		}
	}

console.log("this mazeMap is good!")

console.log(mazeMap)
return mazeMap

}


const mazeGen = (mazeMap, row, coll) => {
	
	visited.push([row, coll])

	let NBlist = locateNB(mazeMap, row, coll)

	let shuffled = shuffleNB(NBlist)

	for(let per = 0; per < shuffled.length; per ++) {

		if( !isVis(visited, shuffled[per][0], shuffled[per][1])) {

			mazeMap = delWallNB(mazeMap, row, coll, shuffled[per][0], shuffled[per][1])

			context.clearRect(0, 0, canvas.width, canvas.height);

			mapAlg(mazeMap)

			console.log(mazeMap)

			console.log("found!")

			mazeMap = mazeGen(mazeMap, shuffled[per][0], shuffled[per][1] )

		}

		else {
			console.log("no soup for you")
		}



		

	}




	// [[r1,c1], [r2,c2], ...]
	// const neighbors = locate neighbors ()
	// const unvisited = cross ref neighbors with visited ()
	// const suffled = shuffle(unvisited)
	// for nb in shuffled:
	//    erase wall between (curr, nb)
    //    mazeGen(mazeMap, nb[0], nb[1])
    return mazeMap


}

let mopler = grid(10, 10) 

console.log(mopler)

let finishedMaze = mazeGen(mopler, 0, 0)


mapAlg(finishedMaze)




// 0/2 = 0 R 0
// 1/2 = 0 R 1
// 2/2 = 1 R 0
// 3/2 = 1 R 1
// 4/2 = 2 R 0
// 5/2 = 2 R 1




// TEST ZONE:

let green = shuffleNB( [ [3, 4], [1, 2], [2, 2], [2, 23], [99999, 999999], [-32, -32] ] )
console.log(green)


