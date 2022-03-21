import Model from "./Model";

export default class PreloadModel extends Model {
	constructor() {
		super()
		this.progress = 0
		this.loaded = false
		this.state = false
	}

	getState() {
		return this.state
	}

	getProgress() {
		return this.progress
	}

	setLoaded() {
		this.loaded = true
	}

	update() {
		this.progress += app.loader.progress > this.progress && this.progress < 100 ? 1 : 0
		this.state = this.loaded && this.progress === 100
	}
}