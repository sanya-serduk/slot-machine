export default class ParticleView extends PIXI.Container {
	constructor(options) {
		super()
		this.options = options
		this.position.set(options.x, options.y)
	}
}