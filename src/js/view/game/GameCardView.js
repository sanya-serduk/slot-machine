import { GlowFilter } from "pixi-filters";
import { Timeline } from "gsap/gsap-core";

export default class GameCardView extends PIXI.Container {
	constructor(options) {
		super()
		this.options = options
		this.timeline = new Timeline()
		this.create()
	}

	create() {
		const { size, skin } = this.options
		const padding = 60

		const back = new PIXI.Graphics()
		back.drawRect(0, 0, size, size)

		this.skin = new PIXI.Sprite(app.loader.resources[skin].texture)
		this.skin.width = size / this.skin.width * this.skin.width - padding
		this.skin.height = size / this.skin.height * this.skin.height - padding
		this.skin.position.set(size / 2)
		this.skin.anchor.set(0.5)

		this.addChild(back, this.skin)
	}

	win() {
		const outlineFilter = new GlowFilter({ outerStrength: 5, distance: 15, color: 0xffffff })
		this.skin.filters = [outlineFilter]

		this.timeline
			.to(this.skin.scale, 0.2, { ease: 'power1.inOut', x: '+=0.25', y: '+=0.25', yoyo: true, repeat: -1 })
			.to(this.skin,       1,   { ease: 'power1.inOut', rotation: -0.5                                   }, 0)
			.to(this.skin,       2,   { ease: 'power1.inOut', rotation: 0.5, yoyo: true, repeat: -1            }, 1)
			.to(outlineFilter,   0.2, { ease: 'power1.inOut', outerStrength: 1, yoyo: true, repeat: -1         }, 0)
	}

	winDestroy() {
		this.timeline.clear()
		this.scale.set(1)
		this.skin.rotation = 0
		this.skin.filters = null
	}
}