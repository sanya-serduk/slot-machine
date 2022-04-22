import SceneManager from "./lib/SceneManager";

export default class Application {
	constructor(param) {
		this.elem     = param.elem || document.body
		this.renderer = new PIXI.Renderer({ backgroundColor: 0x000000, backgroundAlpha: 0.5, antialias: true })
		this.stage    = new PIXI.Container()
		this.ticker   = new PIXI.Ticker()
		this.loader   = new PIXI.Loader()
		this.scene    = new SceneManager(this.stage)

		this.create()
		this.setScale()
		this.start()

		window.addEventListener('resize', this.setScale.bind(this))
	}

	get screen() {
		return this.renderer.screen
	}

	get size() {
		return {
			width: this.screen.width/this.stage.scale.x,
			height: this.screen.height/this.stage.scale.y,
			content: {
				width: 700,
				height: 840,
			}
		}
	}

	create() {
		this.elem.appendChild(this.renderer.view)
	}

	start() {
		this.ticker.add(() => this.renderer.render(this.stage), PIXI.UPDATE_PRIORITY.LOW)
		this.ticker.add(this.update.bind(this))
		this.ticker.start()
	}

	update(delta) {
		this.scene.current.updates?.get.forEach(update => update(delta))
		this.scene.layers.forEach(layer => layer.updates?.get.forEach(update => update(delta)))
	}

	setScale() {
		const { clientWidth : W, clientHeight : H } = this.elem
		const { width, height } = this.size.content
		const scaleW = this.scaleCalculator(width, W)
		const scaleH = this.scaleCalculator(height, H)
		const scale = scaleW < scaleH ? scaleW : scaleH

		this.stage.scale.set(scale)
		this.stage.position.set(W/2, H/2)
		this.renderer.resize(W, H)
	}

	scaleCalculator(sceneSize, screenSize) {
		const scale = (sceneSize - (sceneSize - screenSize)) / sceneSize
		return scale < 1 ? scale : 1
	}
}