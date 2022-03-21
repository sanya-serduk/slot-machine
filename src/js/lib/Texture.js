export default class Texture {
	static createCanvas(w, h) {
		const cnv = document.createElement('canvas')
		const ctx = cnv.getContext('2d')
		cnv.width = w
		cnv.height = h

		return { cnv, ctx }
	}

	static linearGradientVertical(w, h, gradient) {
		const canvas = this.createCanvas(w, h)
		const grd = canvas.ctx.createLinearGradient(0, 0, 0, h)

		gradient.forEach(elem => {
			grd.addColorStop(elem.offset, elem.color)
		})

		canvas.ctx.fillStyle = grd
		canvas.ctx.fillRect(0, 0, w, h)

		return PIXI.Texture.from(canvas.cnv)
	}
}