import MazeBlock from "./MazeBlock"
export default class RandomMaze {
	constructor(el) {
		this.pathWidth = 20       //Width of the Maze Path
		this.wall = 2             //Width of the Walls between Paths
		this.outerWall = 2        //Width of the Outer most wall
		this.width = 10           //Number paths fitted horisontally
		this.height = 10          //Number paths fitted vertically
		this.wallColor = '#0000ff'   //Color of the walls
		this.pathColor = '#222a33'//Color of the path
		this.delay = 10            //Delay between algorithm cycles
		this.x = 0        //Horisontal starting position
		this.y = 0       //Vertical starting position
		this.canvas = el
		this.ctx = this.canvas.getContext('2d')
		this.directions = [[0,1], [1,0], [0,-1], [-1,0]]
		this.map = []
		this.track = []
		this.route = []
		this.route.push([this.x,this.y])

		this.init();
		this.initMap();
		this.randomMove();

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
	}

	initMap() {
		for (let i = 0; i < this.height; i++) {
			this.map[i] = []
			this.track[i] = []
			for (let j = 0; j < this.width; j++) {
				this.track[i][j] = null;
				this.map[i][j] = new MazeBlock();
			}
		}
		this.track[this.x][this.y] = true;
	}

	randomMove(){
		let posibleMoves = [];

		// get posible moves array
		this.directions.forEach(d => {
			if(this.track[d[0] + this.x] && this.track[d[0] + this.x][d[1] + this.y] === null){
				posibleMoves.push([d[0] + this.x,d[1] + this.y]);
			}
		});

		if(this.route.length > 0){
			if(posibleMoves.length === 0){ 			// no posible moves
				this.track[this.x][this.y] = false 	// mark as tracked
				this.route.pop() 					// step back
				// set current pos
				if(this.route[this.route.length-1]){
					this.x = this.route[this.route.length-1][0]
					this.y = this.route[this.route.length-1][1]
				}
			}else{
				let move = posibleMoves[Math.floor(Math.random() * (posibleMoves.length - 0.01))]
				this.x = move[0];
				this.y = move[1];
				this.track[this.x][this.y] = true;
				this.route.push([this.x,this.y]);
				this.drawPath();
			}
			this.randomMove()
		}
	}

	drawPath(){
		const from = this.route[this.route.length - 2]
		const to = this.route[this.route.length - 1]
		this.ctx.moveTo(from[0] * (this.pathWidth + this.wall) + this.offset, from[1] * (this.pathWidth + this.wall) + this.offset)
		this.ctx.lineTo(to[0] * (this.pathWidth + this.wall) + this.offset, to[1] * (this.pathWidth + this.wall) + this.offset)
		this.ctx.stroke()
	}

	loop() {
	}

}