import Texture from "../../lib/Texture";
import Lib from "../../lib/Lib";
import GameCardView from "./GameCardView";
import { Timeline } from "gsap/gsap-core";
import { CARDS } from "../../setting";

export default class GameReelView extends PIXI.Container {
	constructor(options) {
		super()
		this.num = options.num || 0
		this.combination = Lib.createArrayRandomNumbers(3, 1, CARDS.length)
		this.cardsGroup = []
		this.cards = []
		this.size = { w: 200, h: 600 }
		this.create()
	}

	create() {
		const gradient = new PIXI.Sprite(Texture.linearGradientVertical(this.size.w, this.size.h, [
			{ offset: 0.01, color: '#000000'                },
			{ offset: 0.07, color: 'rgba(0,0,0,0)'          },
			{ offset: 0.3,  color: 'rgba(255,255,255,0.02)' },
			{ offset: 0.5,  color: 'rgba(255,255,255,0.1)'  },
			{ offset: 0.7,  color: 'rgba(255,255,255,0.02)' },
			{ offset: 0.93, color: 'rgba(0,0,0,0)'          },
			{ offset: 0.99, color: '#000000'                },
		]))

		const mask = new PIXI.Graphics()
		mask.beginFill(0x000000, 1)
		mask.drawRect(0, 0, this.size.w, this.size.h)
		mask.endFill()
		this.mask = mask

		const cards = this.createCards()
		this.cardsGroup.push(cards)
		this.addChild(cards, gradient, mask)
	}

	setCombination(combination) {
		this.combination = combination.map(id => Number(id))
	}

	createCards(num = this.num) {
		this.cards = []

		for (let i = 0; i < num; i++) {
			const id = i < this.combination.length ? this.combination[i] : Lib.randomInteger(1, CARDS.length)
			const card = new GameCardView({...CARDS.find(elem => elem.id === id), size: this.size.w})
			card.y = i * card.height
			this.cards.push(card)
		}

		const container = new PIXI.Container()
		const back = new PIXI.TilingSprite(app.loader.resources.back_reel.texture, this.size.w, this.size.w * num)
		container.addChild(back, ...this.cards)

		return container
	}

	winCard(row) {
		this.cards[row].win()
	}

	winCardsDestroy() {
		this.cards.forEach(card => card.winDestroy())
	}

	spin(num, callback = () => {}) {
		this.winCardsDestroy()

		const cards = this.createCards(num)
		cards.y = -(this.cards.length * this.size.w)
		this.cardsGroup.push(cards)
		this.addChildAt(cards, 0)

		const [cardsCurr, cardsNext] = this.cardsGroup
		const time = [0.1, 6 * 0.12, (cardsNext.children.length-6) * 0.06, 0.2]

		new Timeline()
			.to(cardsCurr, time[0], { y: cardsCurr.y - 15 })
			.to(cardsCurr, time[1], { y: cardsCurr.y + 1200, ease: 'power1.in', onComplete: this.shiftGroup.bind(this) })

		new Timeline()
			.to(cardsNext, time[0], { y: cardsNext.y - 15 })
			.to(cardsNext, time[1], { y: cardsNext.y + 1200, ease: 'power1.in' })
			.to(cardsNext, time[2], { y: cardsNext.y + cardsNext.height + 15, ease: 'linear' })
			.to(cardsNext, time[3], { y: cardsNext.y + cardsNext.height, onComplete: callback })
	}

	shiftGroup() {
		this.removeChild(this.cardsGroup[0])
		this.cardsGroup.shift()
	}
}