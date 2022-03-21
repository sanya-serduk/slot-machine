import Scene from "./Scene"
import GameModel from "../model/GameModel"
import GameView from "../view/GameView"

export default class Game extends Scene {
	constructor() {
		super()
		this.model = new GameModel(this)
		this.view = new GameView(this)
		this.addChild(this.view)
		this.init()
	}

	init() {
		const options = this.model.initOptions
		this.view.init(options)
	}

	handlerPlay() {
		const options = this.model.play()
		this.view.play(options)
	}

	helperBet(name) {
		const bet = this.model.helperBet(name)
		this.view.updateBet(bet)
	}
}