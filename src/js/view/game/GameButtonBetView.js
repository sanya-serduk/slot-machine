import ButtonView from "../entities/ButtonView";

export default class GameButtonBetView extends ButtonView {
	constructor(options) {
		super(options)
		this.skin = options.skin
		this.create()
	}

	create() {
		this.sprite = new PIXI.Sprite(this.skin)
		this.sprite.anchor.set(0.5)

		const back = new PIXI.Graphics()
		back.drawRect(0, 0, this.sprite.width, this.sprite.height)
		back.pivot.set(back.width/2)

		this.addChild(back, this.sprite)
	}

	pointerUp() {
		this.sprite.scale.set(1)
	}

	pointerDown() {
		this.sprite.scale.set(0.9)
	}
}