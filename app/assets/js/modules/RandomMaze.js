import MazeBlock from "./MazeBlock"
export default class RandomMaze {
	constructor(config) {
		this.boardWidth = config.boardWidth || 500
		this.boardHeight = config.boardHeight || 500
		this.pathWidth = config.pathWidth || 50						//Width of the Maze Path
		this.wall = config.wall || 1									//Width of the Walls between Paths
		this.outerWall = config.outerWall || 1        					//Width of the Outer most wall
		this.width = config.width || Math.floor((this.boardWidth - this.outerWall) / (this.pathWidth + this.wall))           //Number paths fitted horisontally
		this.height = config.height || Math.floor((this.boardHeight - this.outerWall) / (this.pathWidth + this.wall))          //Number paths fitted vertically
		this.blocks = config.blocks || this.width * this.height;
		this.wallColor = config.wallColor || '#4285F4'   				//Color of the walls
		this.pathColor = config.pathColor || '#212121' 				//Color of the path
		this.pathReverseColor = config.pathReverseColor || '#ff4444' 	//Color of the reverse path
		this.canvas = config.mazeCanvas
		this.ctx = this.canvas.getContext('2d')
		
		this.blocksTracked = 0
		this.delay = 0
		this.x = 0        													//Horisontal starting position
		this.y = 0       													//Vertical starting position
		this.directions = [[0, 1, 'right', 'left'], [1, 0, 'down', 'up'], [0, -1, 'left', 'right'], [-1, 0, 'up', 'down']]
		this.map = []
		this.track = []
		this.route = []
		this.route.push([this.x, this.y])
		this.step = 0

		this.init()
	}

	init() {
		this.offset = this.pathWidth / 2 + this.outerWall
		this.canvas.width = this.outerWall * 2 + this.width * (this.pathWidth + this.wall) - this.wall
		this.canvas.height = this.outerWall * 2 + this.height * (this.pathWidth + this.wall) - this.wall
		this.ctx.fillStyle = this.wallColor
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.strokeStyle = this.pathColor
		this.ctx.lineCap = 'square'
		this.ctx.lineWidth = this.pathWidth
		this.ctx.beginPath()

		this.initMap()
		this.randomMove()
	}

	initMap() {
		for (let i = 0; i < this.height; i++) {
			this.map[i] = []
			this.track[i] = []
			for (let j = 0; j < this.width; j++) {
				this.track[i][j] = null
				this.map[i][j] = new MazeBlock()
			}
		}
		this.track[this.x][this.y] = true
		this.blocksTracked++
	}

	randomMove() {
		this.step++

		// get posible moves array
		let posibleMoves = this.checkPosibleMoves()

		if (this.route.length > 0 && this.blocksTracked < this.blocks) {
			if (posibleMoves.length === 0) { 	// no posible moves
				this.back()
			} else {
				this.next(posibleMoves)
			}

			setTimeout(() => {					// loop
				this.randomMove(); 
			}, this.delay)
		}
	}

	checkPosibleMoves() {
		let posibleMoves = []

		// get posible moves array
		this.directions.forEach(d => {
			if (this.track[d[1] + this.x] && this.track[d[1] + this.x][d[0] + this.y] === null) {
				posibleMoves.push([d[1] + this.x, d[0] + this.y, d[2], d[3]])
			}
		});

		return posibleMoves
	}

	next(posibleMoves) {
		let move = posibleMoves[Math.floor(Math.random() * (posibleMoves.length - 0.01))]
		this.track[this.x][this.y] = true
		this.map[this.y][this.x][move[2]] = true
		this.map[move[1]][move[0]][move[3]] = true
		this.x = move[0]
		this.y = move[1]
		this.route.push([this.x, this.y])
		this.blocksTracked++
		this.drawPath()
		if(posibleMoves.length == 1){
			this.route.splice(this.route.length - 2,1);
		}
	}

	back() {
		this.track[this.x][this.y] = false 			// mark as tracked
		// this.drawReversePath()
		this.route.pop() 							// step back
		
		if (this.route[this.route.length - 1]) {	// set current pos
			this.x = this.route[this.route.length - 1][0]
			this.y = this.route[this.route.length - 1][1]
		}
	}

	drawPath() {
		const from = this.route[this.route.length - 2]
		const to = this.route[this.route.length - 1]
		this.ctx.strokeStyle = this.pathColor
		this.ctx.moveTo(from[0] * (this.pathWidth + this.wall) + this.offset, from[1] * (this.pathWidth + this.wall) + this.offset)
		this.ctx.lineTo(to[0] * (this.pathWidth + this.wall) + this.offset, to[1] * (this.pathWidth + this.wall) + this.offset)
		this.ctx.stroke()
	}

	drawReversePath() {
		this.ctx.closePath()
		this.ctx.beginPath()
		this.ctx.fillStyle = this.pathReverseColor
		this.ctx.rect(this.route[this.route.length-1][0] * (this.pathWidth + this.wall) + this.wall,this.route[this.route.length-1][1] * (this.pathWidth + this.wall) + this.wall, this.pathWidth, this.pathWidth);
		this.ctx.fill()
		this.ctx.closePath()
		this.ctx.beginPath()
	}
}