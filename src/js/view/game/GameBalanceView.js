export default class GameBalanceView extends PIXI.Container {
	constructor(options) {
		super()
		this.header  = new PIXI.Text('Баланс',        { fill: 0xeeeeee, fontSize: 20 })
		this.balance = new PIXI.Text(options.balance, { fill: 0xffffff, fontSize: 40, fontWeight: 'bold' })
		this.addChild(this.header, this.balance)
		this.updatePosition()
	}

	updateBalance(sum) {
		this.balance.text = sum !== undefined ? sum : this.balance.text
		this.updatePosition()
	}

	updatePosition() {
		const { header, balance } = this
		const width = header.width > balance.width ? header.width : balance.width
		header.position.set(width/2 - header.width/2, 0)
		balance.position.set(width/2 - balance.width/2, header.height)
	}
}