import GameReelView from "./GameReelView";

export default class GameDisplayView extends PIXI.Container {
	constructor() {
		super()
		this.reels = []
		this.create()
	}

	create() {
		const reels = new PIXI.Container()
		const reelPadding = 10

		for (let i = 0; i < 3; i++) {
			const reel = new GameReelView({ num: i * 5 + 15 })
			reel.position.set(reelPadding * 2 + i * (reel.width + reelPadding), reelPadding)
			this.reels.push(reel)
			reels.addChild(reel)
		}

		const reelsWidth = reels.width + reelPadding * 4
		const reelsHeight = reels.height + reelPadding * 2

		const back = new PIXI.Graphics()
		back.beginFill(0x000000, 1)
		back.drawRoundedRect(0, 0, reelsWidth, reelsHeight, 16)
		back.endFill()

		const border = new PIXI.Graphics()
		border.lineTextureStyle({ width: 10, texture: app.loader.resources.display_border.texture })
		border.drawRoundedRect(0, 0, reelsWidth - border.line.width, reelsHeight - border.line.width, 10)
		border.endFill()
		border.position.set(border.line.width/2, border.line.width/2)

		this.addChild(back, reels, border)
	}

	play(combination, callback) {
		this.reels.forEach((reel, i) => {
			reel.setCombination([combination[0][i], combination[1][i], combination[2][i]])
			reel.spin(i * 5 + 15, () => i === 2 ? callback() : false)
		})
	}

	win(cards) {
		cards.forEach(card => {
			this.reels[card.col].winCard(card.row)
		})
	}
}