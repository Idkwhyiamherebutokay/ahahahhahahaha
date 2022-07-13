

// Piroity list

// 1. Monsters (spawning (relectance/hunting mode, types, final spawning touches), 2. sprites, 3. camera rework


var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

let blocker = Math.min(window.innerHeight, window.innerWidth)

context.canvas.width  = blocker;
context.canvas.height = blocker;

//monster zone

class troglobite {

    cost = 50;

    color = "grey";

  constructor() {

    this.type = "t";

    this.speed = 1;

    this.respectsWalls = true; //interacts with walls

    this.currentState = 0; //0: idle(random), 1: hunt(greedyBest), 2: seek(randomChase)

    this.reluctance = 1; //Determines how many spaces back the monster won't go

    this.moveHistory = [];

    this.FR = 10; //10 is defult testing speed, WHOOP

    this.FRcounter = 0;

    this.power = 1;

    this.idleType = "random"; //0: random,

    this.huntType = "none"; //1: greedyBest,

    this.seekType = "none"; //2: randomChase,

    this.difficulty = "basic";

    this.currentCol = 0;

    this.currentRow = 0;

    this.sight = "none";

  	this.hearing = "none";



  }

    senses() {

 	 }

}

class vanilla {

    cost = 200;

    color = "#f2f0d0";

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

    this.huntType = "none"; //1: greedyBest,

    this.seekType = "none"; //2: randomChase,

    this.difficulty = "basic";

    this.currentCol = 0;

    this.currentRow = 0;

    this.sight = "normal";

  	this.hearing = "normal";

  }

    senses(gameState) {


    	if(this.currentRow == gameState.player.currentRow) {

    		console.log("checkpoint")

    		let greb = this.currentCol

    		if(greb - gameState.player.currentCol > 0) { //monster to the right

    			for(let meb = greb; meb > gameState.player.currentCol; meb -= 1) {

    				if(gameState.finishedMaze[this.currentRow][meb] == "#") {

    					console.log("wallCol")

    					return "wallCol"

    				}

    			}

    			console.log("hunt")

    			this.currentState = 1

    		}

    	




    	else if(greb - gameState.player.currentCol < 0) { //monster to the left

    		console.log("checkpoint")

    		for(let meb = greb; meb < gameState.player.currentCol; meb += 1) {

    			if(gameState.finishedMaze[this.currentRow][meb] == "#") {

    				console.log("wallChalk")

    				return "wallCol"

    			}

    		}

    		console.log("hunt")

    		this.currentState = 1
    			
    	}
   	 }
    	

  	

  	else if(this.currentCol == gameState.player.currentCol) {

  		console.log("checkpoint")


    	let berg = this.currentRow

    	if(berg - gameState.player.currentRow > 0) { //above

    		console.log("checkpoint")

    		for(let bem = berg; bem > gameState.player.currentRow; bem -= 1) {

    			if(gameState.finishedMaze[bem][this.currentCol] == "#") {

    				console.log("wallrow")

    				return "wallrol"

    			}

    		}

    		console.log("hunt")

    		this.currentState = 1

    	}



    	else if(berg - gameState.player.currentRow < 0) { //below

    		console.log("chalkpoint")

    		for(let bem = berg; bem < gameState.player.currentRow; bem += 1) {

    			if(gameState.finishedMaze[bem][this.currentCol] == "#") {

    				console.log("wallrow")

    				return "wallrol"

    			}

    		}

    		console.log("hunt")

    		this.currentState = 1



    			
    	}

  	  }

  	}

}


//end of monster zone


let monsterSets = [

	{

		name: "set0",

		minBudget: 10,

		mustSpawn: [vanilla, troglobite, troglobite],

		spawnlist: [troglobite]

		},

	{
		name: "set1",

		minBudget: 100,

		mustSpawn: [vanilla, troglobite, troglobite],

		spawnlist: [troglobite]

		},

	{
		name: "setBoss",

		minBudget: 200,

		mustSpawn: [vanilla, troglobite, troglobite],

		spawnlist: [troglobite]

		}

]




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

const monDraw = (x1, y1, rad, color) => {

	context.beginPath();

	context.fillStyle = color

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

			// mapAlg(mazeMap)

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




let monGen = (gameState) => {

	let budget = (gameState.amountCol * gameState.amountRow) * 1 //instead of times 1, have it be * evil

	console.log("monster budget", budget)

	let monQue = []

	let monSpawnFiltered = monsterSets.filter((bud) => {

		if(bud.minBudget <= budget) {

			return true

		}

		else {

			return false

		}

	}

	)

		let monSpawnShuffled = monSpawnFiltered[randomRange(0, monSpawnFiltered.length)]

		for(let i = 0; i < monSpawnShuffled.mustSpawn.length; i ++) {

			console.log("test 43", monSpawnShuffled.mustSpawn[i])

			const m = new monSpawnShuffled.mustSpawn[i]()

			monQue.push(m)


			console.log("cost right before that", m.cost)


			budget -= m.cost //bandaid





		}

		let barginBinMon = monSpawnShuffled.spawnlist.filter((bud) => { 

			if(budget >=  (new bud()).cost) {

			return true

		}

		else {

			return false
		}

	}

	)



	while(budget > 0 && barginBinMon.length > 0) {

		console.log("spawn loop start")


		let monSpawnChosen = barginBinMon[randomRange(0,barginBinMon.length)]

		const n = new monSpawnChosen()

		budget -= n.cost

		monQue.push(n)

		

		barginBinMon = monSpawnShuffled.spawnlist.filter((bud) => { 

			if(budget >= (new bud()).cost) {

				return true

			}

			else {

					return false

			}

		}
		
		)


	}

		return monQue

}

const prestigeMaze = (rows, colls) => {


	gameState.amountRow = rows

	gameState.amountCol = colls

	console.log("prestigeMaze")

	visited = {}

	context.clearRect(0, 0, canvas.width, canvas.height);

	let mopler = grid(rows, colls) 

	let numTiles = rows * colls

	// //(mopler)

	gameState.finishedMaze = mazeGen(mopler, 1, 1)

	gameState.finishedMaze = wallDeGen(0.1, gameState.finishedMaze)

	gameState.activeMonsters = monGen(gameState)



	borgo = randomRange(0, mopler.length - 1)

	morgo = randomRange(0, mopler.length - 1)

	if(borgo%2 == 0) {

		borgo += 1

	}

	if(morgo%2 == 0) {

		morgo += 1

	}

	for(let m = 0; m < gameState.activeMonsters.length; m ++) { //fix! bandaid!

		gameState.activeMonsters[m].currentRow = borgo

		gameState.activeMonsters[m].currentCol = morgo
	}


	gameState.player.currentRow = 1

	gameState.player.currentCol = 1


	gameState.exitCol = morgo

	gameState.exitRow = borgo






	renderFrame(gameState)

}


let drawPlayer = (gameState) => {



}


let dryStrawsMon = (gameState, monster) => {

	let validPathNBs = removeWallsFromNBlist(gameState.finishedMaze, monster.currentRow, monster.currentCol)

	let distances = {}

	let parents = {}

	let playerKey = `${player.currentRow}:${player.currentCol}`

	distances[playerKey] = Infinity

	visited = {}

	let visitedKey = `${monster.currentRow}:${monster.currentCol}`

	visited[visitedKey] = true


	for(i = 0; i < validPathNBs.length; i ++) {

        let key = `${validPathNBs[i][0]}:${validPathNBs[i][1]}`

		distances[key] = 1

		let parentKey = `${monster.currentRow}:${monster.currentCol}`

		parents[childKey] = parentKey
	}


}

let removeWallsFromNBlist = (gameState, row, col) => {

	let preNBChoice = locateMonsterNB(gamestate.finishedmaze, row, col)

	let NBChoice = preNBChoice.filter((i, nb) => {
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


	} )

	console.log("valid NBs should be", NBChoice)

	return NBChoice

}

let moveMonster = (gameState, monster) => { 

	monster.senses(gameState)

	let preMonChoice = locateMonsterNB(gameState.finishedMaze, monster.currentRow, monster.currentCol)

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

	if (monster.currentState == 0) {

		//random idle start
		//setup if(monster.idleType == random)
		let monChosen = shuffleNB(monChoice)

		console.log("monChosen", monChosen)

		console.log(monster.currentCol, "monster currentCol")

		console.log(monster.currentRow, "monster currentRow")

		console.log("moveHistory 1", JSON.stringify(monster.moveHistory))

		let bog = 0

		for(let bog = 0;bog < monChosen.length; bog++) {

			if(!monster.moveHistory.includes(`${monChosen[bog][0]}:${monChosen[bog][1]}`) && monChosen.length > 1) {


				monster.moveHistory.push(`${monster.currentRow}:${monster.currentCol}`)

				monster.currentCol = monChosen[bog][1]

				monster.currentRow = monChosen[bog][0]



				if(monster.moveHistory.length > monster.reluctance) {

					monster.moveHistory = monster.moveHistory.slice(1)

					console.log("shifted")


				}

	            console.log("moveHistory 2", JSON.stringify(monster.moveHistory))

	       

				return monster

			}

			else if (monChosen.length == 1) {

				monster.moveHistory.push(`${monster.currentRow}:${monster.currentCol}`)

				monster.currentCol = monChosen[bog][1]

				monster.currentRow = monChosen[bog][0]

					if(monster.moveHistory.length > monster.reluctance) {

						monster.moveHistory = monster.moveHistory.slice(1)

						console.log("shifted")
						
					}

				console.log("moveHistory 3", JSON.stringify(monster.moveHistory))

				return monster


			}


	}

	//random idle end

	}

	else if (monster == 1) { //basic hunt

		



	}

	else if (monster == 2) { //seek

	}

	else {console.log("invalid monster state", monster.state)}

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


				gameState.level ++ 


				prestigeMaze(grid[0].length + 10, grid[0].length + 10)



			}

			else {





			}

		}

		for(let m = 0; m < gameState.activeMonsters.length; m ++){

			if(player.currentRow == gameState.activeMonsters[m].currentRow && player.currentCol == gameState.activeMonsters[m].currentCol) {

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



let gameState = {

	amountRow: 11,

	amountCol: 11,

	exitRow: 10,

	exitCol: 10,

	level: 0,

	player: {

		currentRow: 1,

		currentCol: 1,

		moveSpeed: 1

	},

	evil: { //controls evil/monster spawning

		evil: 0,

	},

	activeMonsters: []

}




let renderFrame = (gameState) => {

	var radius = (context.canvas.width/gameState.amountCol)/2

	context.clearRect(0, 0, canvas.width, canvas.height);

	exit(context.canvas.width/gameState.amountCol * gameState.exitCol, context.canvas.height/gameState.amountRow * gameState.exitRow, context.canvas.width/gameState.amountCol, context.canvas.height/gameState.amountRow)

	playerDraw(context.canvas.width/gameState.amountRow * gameState.player.currentCol + radius, context.canvas.height/gameState.amountRow * gameState.player.currentRow + radius, radius)

	for(let m = 0; m < gameState.activeMonsters.length; m++) {

		monDraw(context.canvas.width/gameState.amountRow * gameState.activeMonsters[m].currentCol + radius, context.canvas.height/gameState.amountRow * gameState.activeMonsters[m].currentRow + radius, radius, gameState.activeMonsters[m].color)

	}

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

		for(let m = 0; m < gameState.activeMonsters.length; m ++) {

				if(gameState.activeMonsters[m].FRcounter == gameState.activeMonsters[m].FR) {

					moveMonster(gameState, gameState.activeMonsters[m]) 

					gameState.activeMonsters[m].FRcounter = 0

				

			}

			else {

				gameState.activeMonsters[m].FRcounter += 1

				if (gameState.activeMonsters[m].currentCol == gameState.player.currentCol && gameState.activeMonsters[m].currentRow == gameState.player.currentRow) {

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


