class Monstar {

	cost = 100;

    color = "#E20095";

  constructor() {

    this.type = "t";

    this.speed = 0; //tiles moved per tick

    this.respectsWalls = true; //interacts with walls

    this.currentState = 0; //0: idle(random), 1: hunt(greedyBest), 2: seek(randomChase) 

    this.reluctance = 1; //Determines how many spaces back the monster won't go

    this.moveHistory = [];

    this.FR = 10; //10 is defult testing speed, WHOOP this is the tick speed!

    this.idleFR = 10; // tickspeed in idle! 10 is defult

    this.huntFR = 10; //10 is defult testing speed, WHOOP

    this.FRcounter = 0;

    this.power = 0;

    this.idleType = "none"; //0: random,

    this.huntType = "none"; //1: greedyBest,

    this.seekType = "none"; //2: randomChase,

    this.difficulty = "basic";

    this.currentCol = 0;

    this.currentRow = 0;

    this.sight = "#"; // can/can't see, can see through walls #

  	this.hearing = "#"; // can hear/can't, can hear sounds below #

    this.modes =  {
    	'idle': {
    		FR: 5,
    		spriteMap:'./idleSprite.jpg'
    	}, 
    	'hunt': {
    		FR:  1,
    		spriteMap: '...',

    	}, 
    	'seek': {
    		FR: 5
    	}
    }


  }

      senses() {
        throw new Error("Method 'senses' must be implemented!")
 	 }

 	 idle() {
 	 	//throw new Error("Method 'idle' must be implemented!")
 	 }

 	 hunt() {
 	 	//throw new Error("Method 'hunt' must be implemented!")
 	 }

 	 seek() {
 	 	//throw new Error("Method 'seek' must be implemented!")
 	 }


}


class troglobite extends Monstar{

    cost = 100;

    color = "grey";

  constructor() {

  	super()

    this.type = "t";

    this.speed = 1;

    this.reluctance = 1; //Determines how many spaces back the monster won't go

    this.FR = 10; //10 is defult testing speed, WHOOP

    this.idleFR = 10;

    this.huntFR = 10; //10 is defult testing speed, WHOOP

    this.FRcounter = 0;

    this.power = 1;

    this.idleType = "random"; //0: random,

    this.huntType = "none"; //1: greedyBest,

    this.seekType = "none"; //2: randomChase,

    this.difficulty = "basic";

    this.sight = "none";

  	this.hearing = "none";

    this.modes =  {
    	'idle': {
    		FR: 10,
    		spriteMap:'./idleSprite.jpg'
    	}, 
    	'hunt': {
    		FR:  1,
    		spriteMap: '...',

    	}, 
    	'seek': {
    		FR: 5
    	}
    }



  }

    senses() {

 	 }

 	 idle() {

	 	let preMonChoice = locateMonsterNB(gameState.finishedMaze, this.currentRow, this.currentCol)

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
 	 	console.log("Troglobyte idle method called")
 	 	//random idle start
		//setup if(monster.idleType == random)
		let monChosen = shuffleNB(monChoice)

		console.log("monChosen", monChosen)

		console.log(this.currentCol, "monster currentCol")

		console.log(this.currentRow, "monster currentRow")

		console.log("moveHistory 1", JSON.stringify(this.moveHistory))

		let bog = 0

		for(let bog = 0;bog < monChosen.length; bog++) {

			if(!this.moveHistory.includes(`${monChosen[bog][0]}:${monChosen[bog][1]}`) && monChosen.length > 1) {


				this.moveHistory.push(`${this.currentRow}:${this.currentCol}`)

				this.currentCol = monChosen[bog][1]

				this.currentRow = monChosen[bog][0]



				if(this.moveHistory.length > this.reluctance) {

					this.moveHistory = this.moveHistory.slice(1)

					console.log("shifted")


				}

	            console.log("moveHistory 2", JSON.stringify(this.moveHistory))

	       

				return this

			}

			else if (monChosen.length == 1) {

				this.moveHistory.push(`${this.currentRow}:${this.currentCol}`)

				this.currentCol = monChosen[bog][1]

				this.currentRow = monChosen[bog][0]

					if(this.moveHistory.length > this.reluctance) {

						this.moveHistory = this.moveHistory.slice(1)

						console.log("shifted")
						
					}

				console.log("moveHistory 3", JSON.stringify(this.moveHistory))

				return this


			}


	}
 	 }

}


class vanilla extends Monstar{

    cost = 200;

    color = "#f2f0d0";

  constructor() {

  	super()

    this.type = "t";

    this.speed = 1;

    this.FR = 5; //10 is defult testing speed, WHOOP

    this.idleFR = 5;

    this.huntFR = 1; //10 is defult testing speed, WHOOP

    this.FRcounter = 0;

    this.power = 1;

    this.idleType = "random"; //0: random,

    this.huntType = "none"; //1: greedyBest,

    this.seekType = "none"; //2: randomChase,

    this.difficulty = "basic";

    this.sight = "normal";

  	this.hearing = "normal";

    this.modes =  {
    	'idle': {
    		FR: 5,
    		spriteMap:'./idleSprite.jpg'
    	}, 
    	'hunt': {
    		FR:  1,
    		spriteMap: '...',

    	}, 
    	'seek': {
    		FR: 5
    	}
    }


  }

 // const mode = monster.modes[monster.currentState]
 // mode.FR

    senses(gameState) {


    	if(this.currentRow == gameState.player.currentRow) {

    		// console.log("checkpoint")

    		let greb = this.currentCol

    		if(greb - gameState.player.currentCol > 0) { //monster to the right

    			for(let meb = greb; meb > gameState.player.currentCol; meb -= 1) {

    				if(gameState.finishedMaze[this.currentRow][meb] == "#") {

    					// console.log("wallCol")

    					return "wallCol"

    				}

    			}

    			// console.log("hunt")

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

  	idle() {

  	let preMonChoice = locateMonsterNB(gameState.finishedMaze, this.currentRow, this.currentCol)

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
 	 	console.log("Vanilla idle method called")
 	 	//random idle start
		//setup if(monster.idleType == random)
		let monChosen = shuffleNB(monChoice)

		console.log("monChosen", monChosen)

		console.log(this.currentCol, "monster currentCol")

		console.log(this.currentRow, "monster currentRow")

		console.log("moveHistory 1", JSON.stringify(this.moveHistory))

		let bog = 0

		for(let bog = 0;bog < monChosen.length; bog++) {

			if(!this.moveHistory.includes(`${monChosen[bog][0]}:${monChosen[bog][1]}`) && monChosen.length > 1) {


				this.moveHistory.push(`${this.currentRow}:${this.currentCol}`)

				this.currentCol = monChosen[bog][1]

				this.currentRow = monChosen[bog][0]



				if(this.moveHistory.length > this.reluctance) {

					this.moveHistory = this.moveHistory.slice(1)

					console.log("shifted")


				}

	            console.log("moveHistory 2", JSON.stringify(this.moveHistory))

	       

				return this

			}

			else if (monChosen.length == 1) {

				this.moveHistory.push(`${this.currentRow}:${this.currentCol}`)

				this.currentCol = monChosen[bog][1]

				this.currentRow = monChosen[bog][0]

					if(this.moveHistory.length > this.reluctance) {

						this.moveHistory = this.moveHistory.slice(1)

						console.log("shifted")
						
					}

				console.log("moveHistory 3", JSON.stringify(this.moveHistory))

				return this


			}

		}


	}

	hunt() {


		let vanillaIceCream = dryStrawsMon(gameState, this)

		this.currentRow = vanillaIceCream[0]

		this.currentCol = vanillaIceCream[1]

		this.FR = this.huntFR


	}

}
