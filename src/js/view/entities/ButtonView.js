import { GlowFilter } from "pixi-filters";
import { Timeline } from "gsap/gsap-core";

export default class ButtonView extends PIXI.Container {
	constructor(options) {
		super()
		this.name = options.name || 'button'
		this.text = options.text || 'button'
		this.action = options.action || this.noAction

		this.timeLine = new Timeline()
		this.outlineFilter = new GlowFilter({ outerStrength: 0, color: 0xffffff, distance: 20 })
		this.filters = [this.outlineFilter]

		this.setInteractive(true)
		this.on('click', this.action)
		this.on('tap', this.action)
		this.on('pointerup', this.pointerUp)
		this.on('pointerdown', this.pointerDown)
		this.on('pointerover', this.pointerOver)
		this.on('pointerout', this.pointerOut)
	}

	setInteractive(bool) {
		this.interactive = bool
		this.buttonMode = bool
	}

	pointerUp() {
		this.scale.set(1)
	}

	pointerDown() {
		this.scale.set(0.95)
	}

	pointerOver() {
		this.timeLine.clear()
		this.timeLine.to(this.outlineFilter, .3, { outerStrength: 2 })
	}

	pointerOut() {
		this.timeLine.clear()
		this.timeLine.to(this.outlineFilter, .3, { outerStrength: 0 })
	}

	enable() {
		this.setInteractive(true)
	}

	disable() {
		this.setInteractive(false)
	}

	noAction() {
		console.log('ButtonView no action')
	}
}