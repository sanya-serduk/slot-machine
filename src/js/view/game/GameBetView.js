import GameButtonBetView from "./GameButtonBetView"

export default class GameBetView extends PIXI.Container {
	constructor(options) {
		super()
		this.header = new PIXI.Text('Ставка',    { fill: 0xeeeeee, fontSize: 20 })
		this.bet    = new PIXI.Text(options.bet, { fill: 0xffffff, fontSize: 40, fontWeight: 'bold' })

		this.btnLess = new GameButtonBetView({
			name: 'less',
			skin: app.loader.resources.btn_bet_less.texture,
			action: () => options.btnAction('less')
		})

		this.btnMore = new GameButtonBetView({
			name: 'more',
			skin: app.loader.resources.btn_bet_more.texture,
			action: () => options.btnAction('more')
		})

		this.addChild(this.btnLess, this.header, this.bet, this.btnMore)
		this.updatePosition()
	}

	updateBet(bet) {
		this.bet.text = bet !== undefined ? bet : this.bet.text
		this.updatePosition()
	}

	updatePosition() {
		const { header, bet, btnLess, btnMore } = this
		let width = header.width > bet.width ? header.width : bet.width
		width = width > 80 ? width : 80

		header.position.set(
			btnLess.width + width/2 - header.width/2,
			0
		)

		bet.position.set(
			btnLess.width + width/2 - bet.width/2,
			header.height
		)

		btnLess.position.set(
			btnLess.width/2,
			(header.height + bet.height) / 2
		)

		btnMore.position.set(
			btnLess.width + width + btnMore.width/2,
			(header.height + bet.height) / 2
		)
	}
}