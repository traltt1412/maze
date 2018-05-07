export default class Config {
	constructor(options) {
		this.boardWidth = options.boardWidth || 500
		this.boardHeight = options.boardHeight || 500
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
		this.mazeCanvas = options.mazeCanvas || document.querySelector('canvas#maze')
		this.dummyCanvas = options.dummyCanvas || document.querySelector('canvas#dummy')
		this.map = []
	}

	setMap(map) {
		this.map = map
	}
}