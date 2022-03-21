import Model from "./Model";
import Lib from "../lib/Lib";
import { SETTING, CARDS } from "../setting";

export default class GameModel extends Model {
	constructor() {
		super()
		this.setting = JSON.parse(JSON.stringify(SETTING))
		this.balance = this.setting.balance
		this.bet = this.setting.bet
		this.bets = this.setting.bets
	}

	get initOptions() {
		return {
			bet: this.bet,
			balance: this.balance
		}
	}

	get checkBetBalance() {
		return this.balance - this.bet >= 0
	}

	get answerNoMoney() {
		return {
			status: false,
			error: {
				type: 'balance',
				message: 'Недостаточно средств на счету'
			}
		}
	}

	get betNext() {
		const index = this.bets.findIndex(bet => bet === this.bet)
		return index === this.bets.length-1 ? this.bets[0] : this.bets[index+1]
	}

	get betPrev() {
		const index = this.bets.findIndex(bet => bet === this.bet)
		return index === 0 ? this.bets[this.bets.length-1] : this.bets[index-1]
	}

	get arrayCardsID() {
		const cards = Lib.arrShuffle(CARDS.map(card => card.id))
		return Lib.arrShuffle(cards.reduce((acc, cur, i) => acc.concat(new Array(i+1).fill(cur)), []))
	}

	createCombination() {
		const cardsID = this.arrayCardsID

		return new Array(3).fill(0).map(() => {
			return new Array(3).fill(0).map(() => {
				return cardsID[Lib.randomInteger(0, cardsID.length - 1)]
			})
		})
	}

	getLines(cmb, row = 0, col = 0) {
		const res = new Array(3).fill(0).map(() => {
			return { id: cmb[row][col], cards: [[ row, col ]] }
		})

		if (cmb[row]?.[col+1]   === cmb[row][col]) res[0].cards.push(...this.getLines(cmb, row,   col+1)[0].cards)
		if (cmb[row+1]?.[col+1] === cmb[row][col]) res[1].cards.push(...this.getLines(cmb, row+1, col+1)[1].cards)
		if (cmb[row-1]?.[col+1] === cmb[row][col]) res[2].cards.push(...this.getLines(cmb, row-1, col+1)[2].cards)

		return res
	}


	getWinLines(cmb) {
		const result = []

		cmb.forEach((line, i) => {
			const lines = this.getLines(cmb, i)
			const winLines = lines.filter(line => line.cards.length === 3)
			result.push(...winLines)
		})

		return result
	}

	getWinCards(lines) {
		const cards = lines.reduce((acc, curr) => acc.concat(curr.cards), [])
		const setCards = new Set(cards.map(JSON.stringify))
		const uniqCards = Array.from(setCards).map(JSON.parse)

		return uniqCards.map(pos => new Object({ row: pos[0], col: pos[1] }))
	}

	getWinSum(lines) {
		return this.bet * lines.reduce((acc, curr) => acc + this.getCardPrice(curr.id), 0)
	}

	getCardPrice(id) {
		return CARDS.find(card => card.id === id).price
	}

	play() {
		if (!this.checkBetBalance)
			return this.answerNoMoney

		const combination = this.createCombination()
		const winLines = this.getWinLines(combination)
		const winSum = this.getWinSum(winLines)
		const winCards = this.getWinCards(winLines)
		const balanceBeforeWin = this.balance - this.bet
		const balanceAfterWin = this.balance - this.bet + winSum
		this.balance = this.balance - this.bet + winSum

		return {
			status: true,
			combination,
			win: {
				sum: winSum,
				cards: winCards
			},
			balance: {
				beforeWin: balanceBeforeWin,
				afterWin: balanceAfterWin
			}
		}
	}

	helperBet(name) {
		if (name === 'more') this.bet = this.betNext
		if (name === 'less') this.bet = this.betPrev

		return this.bet
	}
}