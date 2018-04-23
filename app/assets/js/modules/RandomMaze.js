import MazeBlock from "./MazeBlock"
export default class RandomMaze {
	constructor(el) {
		this.boardWidth = el.offsetWidth
		this.boardHeight = el.offsetHeight
		this.pathWidth = 50       //Width of the Maze Path
		this.wall = 1             //Width of the Walls between Paths
		this.outerWall = 1        //Width of the Outer most wall
		this.width = Math.floor((this.boardWidth - this.outerWall) / (this.pathWidth + this.wall))           //Number paths fitted horisontally
		this.height = Math.floor((this.boardHeight - this.outerWall) / (this.pathWidth + this.wall))          //Number paths fitted vertically
		this.blocks = this.width * this.height;
		this.blocksTracked = 0
		this.wallColor = '#4285F4'   //Color of the walls
		this.pathColor = '#212121'//Color of the path
		this.pathReverseColor = '#ff4444'//Color of the reverse path
		this.delay = 0            //Delay between algorithm cycles
		this.x = 0        //Horisontal starting position
		this.y = 0       //Vertical starting position
		this.canvas = el.querySelector('canvas')
		this.ctx = this.canvas.getContext('2d')
		this.directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
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
		let posibleMoves = []

		// get posible moves array
		this.directions.forEach(d => {
			if (this.track[d[1] + this.x] && this.track[d[1] + this.x][d[0] + this.y] === null) {
				posibleMoves.push([d[1] + this.x, d[0] + this.y])
			}
		});
		if (this.route.length > 0 && this.blocksTracked < this.blocks) {
			if (posibleMoves.length === 0) { 			// no posible moves
				this.track[this.x][this.y] = false 	// mark as tracked
				// this.drawReversePath()
				this.route.pop() 					// step back
				// set current pos
				if (this.route[this.route.length - 1]) {
					this.x = this.route[this.route.length - 1][0]
					this.y = this.route[this.route.length - 1][1]
				}
			} else {
				let move = posibleMoves[Math.floor(Math.random() * (posibleMoves.length - 0.01))]
				this.track[this.x][this.y] = true
				if (move[0] == -1) {
					this.map[this.x][this.y].left = true;
				} else if (move[0] == 1) {
					this.map[this.x][this.y].right = true;
				} else if (move[1] == -1) {
					this.map[this.x][this.y].up = true;
				} else if (move[1] == 1) {
					this.map[this.x][this.y].down = true;
				}
				console.log(move)
				console.log(this.map)
				this.x = move[0]
				this.y = move[1]
				this.route.push([this.x, this.y])
				this.blocksTracked++
				this.drawPath()
				if(posibleMoves.length == 1){
					this.route.splice(this.route.length - 2,1);
				}
			}
			setTimeout(() => { 
				this.randomMove(); 
			}, this.delay)
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

	loop() {
	}
}