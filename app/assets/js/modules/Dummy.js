export default class Dummy {
	constructor(config, map) {
		this.config = config
		this.map = map
		this.pos = { x: (this.map.length - 1) / 2, y: (this.map.length - 1) / 2 }
		this.color = '#ffeb3b'
		this.canvas = config.dummyCanvas
		this.canvas.width = config.outerWall * 2 + config.width * (config.pathWidth + config.wall) - config.wall
		this.canvas.height = config.outerWall * 2 + config.height * (config.pathWidth + config.wall) - config.wall
		this.ctx = this.canvas.getContext('2d')
		this.x = this.canvas.width / 2
		this.y = this.canvas.height / 2
		this.rad = config.pathWidth / 2 * 0.8
		this.speed = 1
		this.moveDirection = null
		this.init()
	}

	init() {
		console.log(this.map)
		this.drawDummy()
		this.loop()
		this.calcPos()
		this.registerEvent()
	}

	drawDummy() {
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath()
		this.ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2)
		this.ctx.closePath()
		this.ctx.fill()
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	move() {
		switch (this.moveDirection) {
			case 'up':
				if(!(this.y - this.speed - this.rad <= this.pos.y * (this.config.pathWidth + this.config.wall) && !this.map[this.pos.y][this.pos.x].up)) {
					this.y -= this.speed
				}
				break
			case 'right':
				if(!(this.x + this.speed + this.rad >= (this.pos.x + 1) * (this.config.pathWidth + this.config.wall) && !this.map[this.pos.y][this.pos.x].right)) {
					this.x += this.speed
				}
				break
			case 'down':
				if(!(this.y + this.speed + this.rad >= (this.pos.y + 1) * (this.config.pathWidth + this.config.wall) && !this.map[this.pos.y][this.pos.x].down)) {
					this.y += this.speed
				}
				break
			case 'left':
				if(!(this.x - this.speed - this.rad <= this.pos.x * (this.config.pathWidth + this.config.wall) && !this.map[this.pos.y][this.pos.x].left)) {
					this.x -= this.speed
				}
				break
			default:
				break
		}
	}

	calcPos(){
		this.pos.x = Math.floor(this.x / (this.config.pathWidth + this.config.wall))
		this.pos.y = Math.floor(this.y / (this.config.pathWidth + this.config.wall))
		console.log(this.pos)
	}

	loop() {
		this.move()
		this.calcPos()
		this.clear()
		this.drawDummy()
		window.requestAnimationFrame(e => {
			this.loop()
		})
	}

	registerEvent() {
		addEventListener('keydown', e => {
			switch (e.keyCode) {
				case 38:
				case 87:
					this.moveDirection = 'up'
					break
				case 39:
				case 68:
					this.moveDirection = 'right'
					break
				case 40:
				case 83:
					this.moveDirection = 'down'
					break
				case 37:
				case 65:
					this.moveDirection = 'left'
					break
				default:
					this.moveDirection = null
			}
		})

		addEventListener('keyup', e => {
			switch (e.keyCode) {
				case 38:
				case 87:
					if (this.moveDirection == 'up') {
						this.moveDirection = null
					}
					break
				case 39:
				case 68:
					if (this.moveDirection == 'right') {
						this.moveDirection = null
					}
					break
				case 40:
				case 83:
					if (this.moveDirection == 'down') {
						this.moveDirection = null
					}
					break
				case 37:
				case 65:
					if (this.moveDirection == 'left') {
						this.moveDirection = null
					}
					break
				default:
					this.moveDirection = null
			}
		})
	}
}