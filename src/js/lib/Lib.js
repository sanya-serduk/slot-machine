export default class Lib {

	static randomInteger(min, max) {
		return Math.floor(min + Math.random() * (max + 1 - min))
	}

	static arrShuffle(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}

		return arr
	}


	static createArrayRandomNumbers(num, min, max) {
		return Array.from({ length: num }, () => this.randomInteger(min, max))
	}

}