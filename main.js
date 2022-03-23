

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

let blocker = Math.min(window.innerHeight, window.innerWidth)

context.canvas.width  = blocker;
context.canvas.height = blocker;


const wall = (x1, y1, w, h) => {
//	console.log("wall? maybe!", x1, y1, w, h)
	context.beginPath();

	context.fillStyle = "green"


	context.rect(x1, y1, w, h);

	context.stroke();
	context.fill();
}


const exit = (x1, y1, w, h) => {
//	console.log("exit? YES!!", x1, y1, w, h)
	context.beginPath();

	context.fillStyle = "red"


	context.rect(x1, y1, w, h);

	context.stroke();
	context.fill();
}

var clearCircle = function(x, y, radius)
{
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.clip();
    context.clearRect(x - radius - 1, y - radius - 1,
                      radius * 2 + 2, radius * 2 + 2);
};

const playerDraw = (x1, y1, rad) => {

	context.beginPath();

	context.fillStyle = "purple"

	context.arc(x1, y1, rad, 0, 2 * Math.PI)

	context.fill()

};

const mapAlg = (map) => {
	const numRows = map.length
	const numCols = map[0].length // We assume all rows have same number of cols 
	for(let bar = 0; bar < map.length; bar++) {
//	console.log("aadadad", map[bar], "ooosa")/


		for (let gar = 0; gar < map[bar].length; gar ++) {

			if (map[bar][gar] == "_") {
		
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


				if (flar%2 == 1 && mar%2 == 1) {

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

let visited = {}

const locateNB = (mazeMap, row, coll) => {

// let localNB = [[wor + 2, lloc], [wor, lloc + 2], [wor - 2, lloc], [wor, lloc -2] ] 


let localNB = []

if(row - 2 > 0) {
	localNB.push( [row - 2, coll] )

}

if(coll - 2 > 0) {
	localNB.push( [row, coll - 2] )
}

if(row + 2 < mazeMap.length) {
	localNB.push( [row + 2, coll] )
}

if(coll + 2 < mazeMap[0].length) {
	localNB.push( [row, coll + 2] )
}

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



	let reVis = vis[`${row}:${coll}`]

	if(reVis == true) {
		return true
	}

	else {
		return false
	}


}

let insertPathInRow = (rowSTR, collInsert) => {

	let slushie = ""

	for(let melt = 0; melt < rowSTR.length; melt++) {

		let soup = ""

		if (melt == collInsert) {

			soup += "_"

		}

		else {

			soup += rowSTR[melt]

		}

		slushie += soup

	}

	return slushie

}

let delWallNB = (mazeMap, row1, coll1, row2, coll2) => {


	if(row1 - row2 == 0) {
	
		if (coll1 - coll2 > 0) {

			mazeMap[row1] = insertPathInRow(mazeMap[row1], coll1 - 1)	

		}

		else {

			mazeMap[row1] = insertPathInRow(mazeMap[row1], coll1 + 1)

			console.log("a path has been created at", [row1], [coll1 + 1])

		}

	}

	else if (coll1 - coll2 == 0) {

		if(row1 - row2 > 0) {

			mazeMap[row1 - 1] = insertPathInRow(mazeMap[row1 - 1], coll1)

			console.log("a path has been created at", [row1 - 1], [coll1])

		}

		else {



			mazeMap[row1 + 1] = insertPathInRow(mazeMap[row1 + 1], coll1)

			console.log("a path has been created at", [row1 + 1], [coll1])

		}
	}




// console.log(mazeMap)

	

return mazeMap

}


const mazeGen = (mazeMap, row, coll) => {
	
	// row = 1 col =4 -> "1:4"
	visited[`${row}:${coll}`] = true

	let NBlist = locateNB(mazeMap, row, coll)

	let shuffled = shuffleNB(NBlist)

	for(let per = 0; per < shuffled.length; per ++) {

		if( !isVis(visited, shuffled[per][0], shuffled[per][1])) {

			mazeMap = delWallNB(mazeMap, row, coll, shuffled[per][0], shuffled[per][1])

	//		context.clearRect(0, 0, canvas.width, canvas.height);

	//  	mapAlg(mazeMap)

			// console.log(mazeMap)

			console.log("mazeMap finsihed!")

			mazeMap = mazeGen(mazeMap, shuffled[per][0], shuffled[per][1] )

		}

		else {
	//		console.log("No availible space")
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

let mopler

let finishedMaze

let borgo

let morgo

const prestigeMaze = (rows, colls) => {

	visited = {}

	context.clearRect(0, 0, canvas.width, canvas.height);

	mopler = grid(rows, colls) 

	// console.log(mopler)

	finishedMaze = mazeGen(mopler, 1, 1)


	console.log(finishedMaze)



	borgo = randomRange(0, mopler.length - 1)



	morgo = randomRange(0, mopler.length - 1)

	console.log(borgo, morgo)

	if(borgo%2 == 0) {

		borgo += 1

	}

	if(morgo%2 == 0) {

		morgo += 1

	}


	exit(context.canvas.width/mopler[0].length * morgo, context.canvas.height/mopler.length * borgo, context.canvas.width/mopler[0].length, context.canvas.height/mopler.length)

	mapAlg(finishedMaze)

	player.currentCol = 1 //change to start if needed (random starts, etc)

	player.currentRow = 1


}




let movePlayer = (moveSpeed, grid, player, newRow, newCol) => {


	if(grid[newRow][newCol] == "#") {
		console.log("cannot move into a wall at", newRow, newCol)
		return
	}

	else {

		var radius = (context.canvas.width/mopler[0].length)/2

		// clearCircle(context.canvas.width/mopler[0].length * player.currentCol + radius, context.canvas.height/mopler.length * player.currentRow + radius, radius)

		player.currentRow = newRow

		player.currentCol = newCol

		playerDraw(context.canvas.width/mopler[0].length * player.currentCol + radius, context.canvas.height/mopler.length * player.currentRow + radius, radius)

		console.log("sucsessfully moved to", player.currentRow, player.currentCol)

		if(player.currentRow == borgo && player.currentCol == morgo) {

			if (confirm("Nice job, play again? Y/N?")) {


				prestigeMaze(grid[0].length + 10, grid[0].length + 10)



			}

		}

	}


}

let checkKey = (e) => {

    e = e || window.event;

    if (e.keyCode == '38') {


    	movePlayer(player.moveSpeed, finishedMaze, player, player.currentRow - 1, player.currentCol)

    	


    }
    else if (e.keyCode == '40') {
        movePlayer(player.moveSpeed, finishedMaze, player, player.currentRow + 1, player.currentCol)
    }
    else if (e.keyCode == '37') {
        movePlayer(player.moveSpeed, finishedMaze, player, player.currentRow, player.currentCol - 1)
    }
    else if (e.keyCode == '39') {
        movePlayer(player.moveSpeed, finishedMaze, player, player.currentRow, player.currentCol + 1)
    }

}

document.onkeydown = checkKey;

let player = {

	currentRow: 1,

	currentCol: 1,

	moveSpeed: 1

}

prestigeMaze(11,11)

//prestigeMaze(11, 11)

// 0/2 = 0 R 0
// 1/2 = 0 R 1
// 2/2 = 1 R 0
// 3/2 = 1 R 1
// 4/2 = 2 R 0
// 5/2 = 2 R 1




// TEST ZONE:


