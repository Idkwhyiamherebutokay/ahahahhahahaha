

// Piroity list

// 1. Monsters, 2. maze scaling, 3. sprites, 4. camera rework


var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

let blocker = Math.min(window.innerHeight, window.innerWidth)

context.canvas.width  = blocker;
context.canvas.height = blocker;


const wall = (x1, y1, w, h) => {
//	//("wall? maybe!", x1, y1, w, h)
	context.beginPath();

	context.fillStyle = "green"


	context.rect(x1, y1, w, h);

	context.stroke();
	context.fill();
}



const exit = (x1, y1, w, h) => {
//	//("exit? YES!!", x1, y1, w, h)
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

const monDraw = (x1, y1, rad) => {

	context.beginPath();

	context.fillStyle = "orange"

	context.arc(x1, y1, rad, 0, 2 * Math.PI)

	context.fill()

};



const mapAlg = (map) => {
	const numRows = map.length
	const numCols = map[0].length // We assume all rows have same number of cols 
	for(let bar = 0; bar < map.length; bar++) {
//	//("aadadad", map[bar], "ooosa")/


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

const locateMonsterNB = (mazeMap, row, coll) => {

// let localNB = [[wor + 2, lloc], [wor, lloc + 2], [wor - 2, lloc], [wor, lloc -2] ] 


let localNB = []

if(row - 1 > 0) {
	localNB.push( [row - 1, coll] )

}

if(coll - 1 > 0) {
	localNB.push( [row, coll - 1] )
}

if(row + 1 < mazeMap.length) {
	localNB.push( [row + 1, coll] )
}

if(coll + 1 < mazeMap[0].length) {
	localNB.push( [row, coll + 1] )
}

return localNB


}

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

		let j = randomRange(0, i + 1)

		let tmp = [NBlist[i][0], NBlist[i][1]]

		NBlist[i] = [NBlist[j][0], NBlist[j][1]]

		NBlist[j] = [tmp[0], tmp[1]]



	}


	return(NBlist)


}




 
let isVis = (vis, row, coll) => { //vis, row, col



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

			//("a path has been created at", [row1], [coll1 + 1])

		}

	}

	else if (coll1 - coll2 == 0) {

		if(row1 - row2 > 0) {

			mazeMap[row1 - 1] = insertPathInRow(mazeMap[row1 - 1], coll1)

			//("a path has been created at", [row1 - 1], [coll1])

		}

		else {



			mazeMap[row1 + 1] = insertPathInRow(mazeMap[row1 + 1], coll1)

			//("a path has been created at", [row1 + 1], [coll1])

		}
	}




// //(mazeMap)

	

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

	//		

	//  	mapAlg(mazeMap)

			// //(mazeMap)

			//("mazeMap finsihed!")

			mazeMap = mazeGen(mazeMap, shuffled[per][0], shuffled[per][1] )

		}

		else {
	//		//("No availible space")
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

const wallDeGen =  (removePercent, map) => {

	let wallList = []

	let nullList = []

	for(let rower = 1; rower < map.length - 1; rower ++) {

		for(let caller = 1; caller < map[0].length - 1 ; caller++ ) {

			if(map[rower][caller] == "#") {

				wallList.push([rower, caller]) 


			}
		}
	}

	let precent = (wallList.length * removePercent)

		//console.log(wallList)

	let shuffledWall = shuffleNB(wallList)

		console.log(shuffledWall)

	for(let calanderYear = 0; calanderYear < precent; calanderYear ++) {

		map[shuffledWall[calanderYear][0]] = insertPathInRow(map[shuffledWall[calanderYear][0]], shuffledWall[calanderYear][1])

		console.log(map[shuffledWall[calanderYear][0]][shuffledWall[calanderYear][1]])

	}

	return map


	//let listCreator = math.random(0, NB LIST.length)
	//let nullSpaces



}


let genPosArea = (x1, y1, w, h) => {


	borgo = randomRange(x1, w)


	morgo = randomRange(y1, h)


	if(borgo%2 == 0) {

		borgo += 1

	}


	if(morgo%2 == 0) {

		morgo += 1

	}


	morgo

}


const prestigeMaze = (rows, colls) => {


	gameState.amountRow = rows

	gameState.amountCol = colls

	console.log("prestigeMaze")

	visited = {}

	context.clearRect(0, 0, canvas.width, canvas.height);

	let mopler = grid(rows, colls) 

	// //(mopler)

	gameState.finishedMaze = mazeGen(mopler, 1, 1)

	gameState.finishedMaze = wallDeGen(0.1, gameState.finishedMaze)



	borgo = randomRange(0, mopler.length - 1)

	morgo = randomRange(0, mopler.length - 1)

	if(borgo%2 == 0) {

		borgo += 1

	}

	if(morgo%2 == 0) {

		morgo += 1

	}

	gameState.monster.currentRow = borgo

	gameState.monster.currentCol = morgo


	gameState.player.currentRow = 1

	gameState.player.currentCol = 1


	gameState.exitCol = morgo

	gameState.exitRow = borgo






	renderFrame(gameState)

}


let drawPlayer = (gameState) => {



}

let moveMonster = (gameState) => { 

	let preMonChoice = locateMonsterNB(gameState.finishedMaze, gameState.monster.currentRow, gameState.monster.currentCol)

	//	console.log("PMC", preMonChoice)

	let monChoice = preMonChoice.filter((i, nb) => {
		// if nb meets some condition, return true
		// else return false

		const col = i[0]

		const row = i[1]


		if(gameState.finishedMaze[col][row] == "#") {

			return false

		}

		
		else {

	//		console.log("true")

	//		console.log("row", row)

	//  	console.log("col", col)

			return true

		}


	}	

	)

	if (gameState.monster.currentState == 0) {

		let monChosen = shuffleNB(monChoice)

		console.log("monChosen", monChosen)

		console.log(gameState.monster.currentCol, "monster currentCol")

		console.log(gameState.monster.currentRow, "monster currentRow")

		console.log("moveHistory 1", JSON.stringify(gameState.monster.moveHistory))

		let bog = 0

		for(let bog = 0;bog < monChosen.length; bog++) {

			if(!gameState.monster.moveHistory.includes(`${monChosen[bog][0]}:${monChosen[bog][1]}`) && monChosen.length > 1) {


				gameState.monster.moveHistory.push(`${gameState.monster.currentRow}:${gameState.monster.currentCol}`)

				gameState.monster.currentCol = monChosen[bog][1]

				gameState.monster.currentRow = monChosen[bog][0]



				if(gameState.monster.moveHistory.length > gameState.monster.reluctance) {

					gameState.monster.moveHistory = gameState.monster.moveHistory.slice(1)

					console.log("shifted")


				}

	            console.log("moveHistory 2", JSON.stringify(gameState.monster.moveHistory))

	       

				return gameState.monster

			}

			else if (monChosen.length == 1) {

				gameState.monster.moveHistory.push(`${gameState.monster.currentRow}:${gameState.monster.currentCol}`)

				gameState.monster.currentCol = monChosen[bog][1]

				gameState.monster.currentRow = monChosen[bog][0]

					if(gameState.monster.moveHistory.length > gameState.monster.reluctance) {

						gameState.monster.moveHistory = gameState.monster.moveHistory.slice(1)

						console.log("shifted")
						
					}

				console.log("moveHistory 3", JSON.stringify(gameState.monster.moveHistory))

				return gameState.monster


			}


	}


	}

	else if (gameState.monster == 1) { //hunt

	}

	else if (gameState.monster == 2) { //seek

	}

	else {console.log("invalid monster state", gameState.monster.state)}

}


let movePlayer = (moveSpeed, grid, player, newRow, newCol) => { 






	if(grid[newRow][newCol] == "#") {
		console.log("cannot move into a wall at", newRow, newCol)
		return
	}

	else {

		// clearCircle(context.canvas.width/mopler[0].length * player.currentCol + radius, context.canvas.height/mopler.length * player.currentRow + radius, radius)

		player.currentRow = newRow

		player.currentCol = newCol

		renderFrame(gameState)

		console.log("sucsessfully moved to", player.currentRow, player.currentCol)

		if(player.currentRow == borgo && player.currentCol == morgo) {


			if (confirm("Nice job, next level? Y/N?")) {

				renderFrame(gameState)


				console.log("yes")


				prestigeMaze(grid[0].length + 10, grid[0].length + 10)



			}

			else {





			}

		}

		else if(player.currentRow == gameState.monster.currentRow && player.currentCol == gameState.monster.currentCol) {

					if (confirm("Bad Job, play again? Y/N?")) {

						renderFrame(gameState)


						console.log("yes")


						prestigeMaze(11, 11)



					}

					else{

					}

		}

	}


}

let checkKey = (e) => {

	let finishedMaze = gameState.finishedMaze



	let player = gameState.player

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

//monster zone

class troglobite {
  constructor() {

    this.type = "t";

    this.speed = 1;

    this.respectsWalls = true; //interacts with walls

    this.currentState = 0; //0: idle(random), 1: hunt(greedyBest), 2: seek(randomChase)

    this.reluctance = 1; //Determines how many spaces back the monster won't go

    this.moveHistory = [];

    this.FR = 10 //10 is defult testing speed, WHOOP

    this.FRcounter = 0;

    this.power = 1;

    this.idleType = "random"; //0: random,

    this.huntType = "greedyBest"; //1: greedyBest,

    this.seekType = "randomChase"; //2: randomChase,

    this.difficulty = "basic";

    this.currentCol = 0;

    this.currentRow = 0;


  }
}


//end of monster zone


let gameState = {

	amountRow: 11,

	amountCol: 11,

	exitRow: 10,

	exitCol: 10,

	player: {

		currentRow: 1,

		currentCol: 1,

		moveSpeed: 1

	},

	evil: { //controls evil/monster spawning

		evil: 0,

	},

	//allMonster: [

		monster: new troglobite()

	//]

}




let renderFrame = (gameState) => {

	var radius = (context.canvas.width/gameState.amountCol)/2

	context.clearRect(0, 0, canvas.width, canvas.height);

	exit(context.canvas.width/gameState.amountCol * gameState.exitCol, context.canvas.height/gameState.amountRow * gameState.exitRow, context.canvas.width/gameState.amountCol, context.canvas.height/gameState.amountRow)

	playerDraw(context.canvas.width/gameState.amountRow * gameState.player.currentCol + radius, context.canvas.height/gameState.amountRow * gameState.player.currentRow + radius, radius)

	monDraw(context.canvas.width/gameState.amountRow * gameState.monster.currentCol + radius, context.canvas.height/gameState.amountRow * gameState.monster.currentRow + radius, radius)

	mapAlg(gameState.finishedMaze)

}


prestigeMaze(gameState.amountRow,gameState.amountCol)

console.log("TEST")


let update = (progress) => {
  // Update the state of the world for the elapsed time since last render
  console.log("the update was sucsessful")




	if(!gameState.finishedMaze) {
		return
  	}

	else {

		if(gameState.monster.FRcounter == gameState.monster.FR) {

			moveMonster(gameState) 

			gameState.monster.FRcounter = 0

		}

		else {

			gameState.monster.FRcounter += 1

			if (gameState.monster.currentCol == gameState.player.currentCol && gameState.monster.currentRow == gameState.player.currentRow) {

					console.log("dead")


				if (confirm("Bad Job, play again? Y/N?")) {

					renderFrame(gameState)


					console.log("yes")


					prestigeMaze(11, 11)



				}

				else {

					console.log("beef")

				}

			}

		}

	}

  		
  	
}

let loop = (timestamp) => {


  	var progress = timestamp - lastRender

	update(progress)

	renderFrame(gameState)

 	setTimeout(function() {

 		lastRender = timestamp
		window.requestAnimationFrame(loop)
	
	}, 100);
}
var lastRender = 0
window.requestAnimationFrame(loop)










//prestigeMaze(11, 11)

// 0/2 = 0 R 0
// 1/2 = 0 R 1
// 2/2 = 1 R 0
// 3/2 = 1 R 1
// 4/2 = 2 R 0
// 5/2 = 2 R 1




// TEST ZONE:


