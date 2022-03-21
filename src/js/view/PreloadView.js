import View from "./View";

export default class PreloadView extends View {
	constructor() {
		super()
		this.maxLineProgress = 300
		this.create()
		this.updatePosition()
		window.addEventListener('resize', () => this.updatePosition())
	}

	create() {
		this.back = this.createRect(app.size.width, app.size.height)

		this.text = new PIXI.Text('0%', { fill: '#ffffff', fontSize: 36 })
		this.text.position.set(-this.text.width/2, -this.text.height/2)

		this.line = this.createLine()
		this.line.position.set(-this.line.width/2, this.text.height)
		this.lineProgress = this.line.getChildByName('line progress')

		this.addChild(this.back, this.text, this.line)
	}

	createRect(width, height, color = 0x000000) {
		const rect = new PIXI.Graphics()
		rect.beginFill(color, 1)
		rect.drawRect(0, 0, width, height)
		rect.endFill()
		return rect
	}

	createLine() {
		const container = new PIXI.Container()
		const back = this.createRect(this.maxLineProgress, 2, 0x222222)
		const front = this.createRect(0, 2, 0xffffff)
		front.name = 'line progress'
		container.addChild(back, front)
		return container
	}

	updatePosition() {
		const { shape } = this.back.geometry.graphicsData[0]
		shape.width = app.size.width
		shape.height = app.size.height
		this.back.geometry.invalidate()
		this.back.pivot.set(this.back.width/2, this.back.height/2)
	}

	update(progress) {
		this.text.text = progress + '%'
		this.text.position.set(-this.text.width/2, -this.text.height/2)

		this.lineProgress.geometry.graphicsData[0].shape.width = this.maxLineProgress / 100 * progress
		this.lineProgress.geometry.invalidate()
	}
}