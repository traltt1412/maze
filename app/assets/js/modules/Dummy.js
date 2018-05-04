export default class Dummy {
	constructor(config) {
		this.pos = { x: 0, y: 0 }
		this.x = (this.pos.x + 1) * config.pathWith / 2 + config.outerWall + config.wall
		this.y = (this.pos.y + 1) * config.pathWith/2 + config.outerWall + config.wall
		this.rad = config.pathWith / 2 * 0.9
		this.ctx = config.ctx
	}
}