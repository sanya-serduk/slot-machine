import ButtonView from "../entities/ButtonView"

export default class GameButtonPlayView extends ButtonView {
	constructor(options) {
		super(options)
		this.create()
	}

	create() {
		const btnBack = new PIXI.Sprite(app.loader.resources.btn_play_back.texture)
		btnBack.anchor.set(0.5)

		this.btnSprite = new PIXI.Sprite(app.loader.resources.btn_play.texture)
		this.btnSprite.position.set(
			btnBack.width/2 - this.btnSprite.width/2,
			btnBack.height/2 - this.btnSprite.height/2
		)
		this.btnSprite.anchor.set(0.5)

		const back = new PIXI.Graphics()
		back.drawRect(0, 0, btnBack.width, btnBack.height)
		back.pivot.set(back.width/2)

		this.btn = new PIXI.Container()
		this.btn.addChild(btnBack, this.btnSprite)
		this.addChild(back, this.btn)
	}

	pointerUp() {
		this.btn.scale.set(1)
	}

	pointerDown() {
		this.btn.scale.set(0.95)
	}

	enable() {
		super.enable()
		this.spriteChange(app.loader.resources.btn_play.texture)
	}

	disable() {
		super.disable()
		this.spriteChange(app.loader.resources.btn_pause.texture)
	}

	spriteChange(texture) {
		this.btnSprite.texture = texture
	}
}