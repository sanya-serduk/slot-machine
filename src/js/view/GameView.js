import View from "./View";
import GameDisplayView from "./game/GameDisplayView";
import GameNavbarView from "./game/GameNavbarView";
import ParticleBetView from "./entities/ParticleBetView";

export default class GameView extends View {
	init(options) {
		this.display = new GameDisplayView()
		this.navbar = new GameNavbarView({
			bet: options.bet,
			balance: options.balance,
			btnPlayAction: () => this.scene.handlerPlay(),
			btnBetAction: (name) => this.scene.helperBet(name),
		})
		this.addChild(this.display, this.navbar)
		this.updatePosition()
		window.addEventListener('resize', this.updatePosition.bind(this))
	}

	updatePosition() {
		this.display.position.set(-this.display.width/2, -this.display.height/2-this.navbar.size.h/2)
	}

	play(options) {
		this.updates = options

		if (!options.status) {
			this.error(options.error)
			return
		}

		this.display.play(options.combination, this.win.bind(this))
		this.navbar.updateBalance(options.balance.beforeWin)
		this.navbar.btnPlay.disable()
	}

	win() {
		this.navbar.btnPlay.enable()

		if (!this.updates.win.cards.length)
			return

		this.addParticleBet(this.updates.win.sum)
		this.display.win(this.updates.win.cards)
	}

	addParticleBet(bet) {
		this.addChild(new ParticleBetView({
			bet: bet,
			x: this.display.x + this.display.width/2,
			y: this.display.y + this.display.height/2,
			endX: this.navbar.getBalancePosition().x,
			endY: this.navbar.getBalancePosition().y,
			callbackComplete: (particle) => this.removeParticleBet(particle)
		}))
	}

	removeParticleBet(particle) {
		this.removeChild(particle)
		this.navbar.updateBalance(this.updates.balance.afterWin)
	}

	error(error) {
		if (error.type === 'balance') {
			this.noMoney(error)
		}
	}

	noMoney(error) {
		console.log(error.message)
	}

	updateBet(bet) {
		this.navbar.updateBet(bet)
	}
}