import ParticleView from "./ParticleView"
import { Timeline } from "gsap/gsap-core"
import { GlowFilter } from "pixi-filters"

export default class ParticleBetView extends ParticleView {
	constructor(options) {
		super(options)
		this.create()
		this.animate()
	}

	create() {
		const text = new PIXI.Text('+' + this.options.bet, {
			fill: 0xffffff,
			fontSize: 80,
			fontWeight: 'bold',
			strokeThickness: 5,
			stroke: "#000000"
		})

		text.filters = [
			new GlowFilter({
				color: 0x00af00,
				outerStrength: 3,
				distance: 15
			})
		]

		this.scale.set(0.8)
		this.pivot.set(text.width/2, text.height/2)

		this.addChild(text)
	}

	animate() {
		new Timeline()
			.to(this.scale, 0.2, { x: 1, y: 1 }, 0)
			.to(this.scale, 0.8, { x: 0.5, y: 0.5 }, 0.5)
			.to(this,       0.8, { x: this.options.endX, y: this.options.endY }, 0.5)
			.to(this,       0.3, { alpha: 0.2, onComplete: () => this.options.callbackComplete(this) }, 1.1)
	}
}