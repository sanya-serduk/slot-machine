import Scene from "./Scene"
import Update from "../lib/Update";
import PreloadView from "../view/PreloadView";
import PreloadModel from "../model/PreloadModel";

export default class Preload extends Scene {
	constructor(options = {}) {
		super(options)
		this.scene = options.scene || 'Game'
		this.sceneOptions = options.sceneOptions || {}
		this.resources = options.resources || []

		this.updates = new Update()
		this.updates.add(this.update.bind(this))

		this.view = new PreloadView()
		this.model = new PreloadModel()
		this.addChild(this.view)
		this.loadResources()
	}

	loadResources() {
		this.resources.forEach(resource => {
			app.loader.add(resource.name, resource.path)
		})
		app.loader.load(this.loaded.bind(this))
	}

	loaded() {
		this.model.setLoaded()
	}

	update() {
		if (this.model.getState())
			app.scene.start(this.scene, this.sceneOptions)

		this.model.update()
		this.view.update(this.model.getProgress())
	}
}