import './scss/index.scss'
import Application from "./js/App";
import Game from "./js/scene/Game";
import Preload from "./js/scene/Preload";

global.app = new Application({
	elem : document.getElementById('app')
})

app.scene.add('Game', Game)
app.scene.add('Preload', Preload)

app.scene.start('Preload', {
	scene: 'Game',
	resources: [
		{ name: 'blueberry',      path: 'assets/img/fruits/blueberry.png'       },
		{ name: 'cherry',         path: 'assets/img/fruits/cherry.png'          },
		{ name: 'coconut',        path: 'assets/img/fruits/coconut.png'         },
		{ name: 'grape',          path: 'assets/img/fruits/grape.png'           },
		{ name: 'kiwi',           path: 'assets/img/fruits/kiwi.png'            },
		{ name: 'lemon',          path: 'assets/img/fruits/lemon.png'           },
		{ name: 'peach',          path: 'assets/img/fruits/peach.png'           },
		{ name: 'pineapple',      path: 'assets/img/fruits/pineapple.png'       },
		{ name: 'strawberry',     path: 'assets/img/fruits/strawberry.png'      },
		{ name: 'btn_play',       path: 'assets/img/buttons/btn_play.png'       },
		{ name: 'btn_pause',      path: 'assets/img/buttons/btn_pause.png'      },
		{ name: 'btn_play_back',  path: 'assets/img/buttons/btn_play_back.png'  },
		{ name: 'btn_bet_more',   path: 'assets/img/buttons/btn_bet_more.png'   },
		{ name: 'btn_bet_less',   path: 'assets/img/buttons/btn_bet_less.png'   },
		{ name: 'display_border', path: 'assets/img/display/display_border.jpg' },
		{ name: 'back_reel',      path: 'assets/img/display/back_reel.jpg'      }
	]
})