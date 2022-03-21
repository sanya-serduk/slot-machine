import GameButtonPlayView from "./GameButtonPlayView"
import GameBalanceView from "./GameBalanceView"
import GameBetView from "./GameBetView"

export default class GameNavbarView extends PIXI.Container {
	constructor(options) {
		super()
		this.balance = options.balance
		this.bet     = options.bet
		this.size    = { w: app.size.content.width, h: 180 }

		this.btnPlay = new GameButtonPlayView({ action: () => options.btnPlayAction() })
		this.balancePanel = new GameBalanceView({ balance: this.balance })
		this.betPanel = new GameBetView({ bet: this.bet, btnAction: options.btnBetAction })

		this.addChild(this.balancePanel, this.btnPlay, this.betPanel)
		this.setPosition()
		this.updatePosition()

		window.addEventListener('resize', this.updatePosition.bind(this))
	}

	setPosition() {
		const { size, btnPlay, balancePanel, betPanel } = this

		btnPlay.position.set(
			size.w/2,
			size.h/2
		)

		balancePanel.position.set(
			size.w/4 - balancePanel.width/2 - btnPlay.width/4,
			size.h/2 - balancePanel.height/2
		)

		betPanel.position.set(
			size.w/4 * 3 - betPanel.width/2 + this.btnPlay.width/4,
			size.h/2 - betPanel.height/2
		)
	}

	updatePosition() {
		this.position.set(-this.size.w/2, app.size.height/2 - this.size.h)
	}

	updateBalance(sum) {
		this.balance = sum
		this.balancePanel.updateBalance(this.balance)
		this.balancePanel.x = this.size.w/4 - this.balancePanel.width/2 - this.btnPlay.width/4
	}

	updateBet(bet) {
		this.bet = bet
		this.betPanel.updateBet(this.bet)
		this.betPanel.x = this.size.w/4 * 3 - this.betPanel.width/2 + this.btnPlay.width/4
	}

	getBalancePosition() {
		return {
			x: this.x + this.balancePanel.x + this.balancePanel.width/2,
			y: this.y + this.balancePanel.y + this.balancePanel.height/2
		}
	}
}