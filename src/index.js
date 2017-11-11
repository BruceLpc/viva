import Loader from './js/load'
import {
	detectOrient
} from './js/utils'

import Game from './js/game'

require('static/css/main.scss')

detectOrient();
window.onresize = detectOrient;
Loader.start()
Loader.addProgressListener((e) => {
	var percent = Math.round((e.completedCount / e.totalCount) * 100);
	$("#loading_text").html("已加载 " + percent + " %");
})

Loader.addCompletionListener(() => {
	$("#loading_bg").remove()
	initGame()
})

document.addEventListener('touchmove',function(ev){
	ev.preventDefault()
})

function initGame() {

	// $('.home').addClass('hide')
	// $(".game-wrap").removeClass('hide')
	// Game.start()

	$("#start-btn").on('click', () => {
		$('.home').addClass('hide')
		$(".game-wrap").removeClass('hide')
		Game.start()
	})

	$("#guide-btn").on('click', () => {
		$(".guide").removeClass('hide')
	})

	$(".guide").on('click', () => {
		$('.guide').addClass('hide')
	})

	$("#continu-btn").on('click', () => {
		Game.repeat()
	})

	$("#share-btn").on('click', () => {
		$(".share").removeClass('hide')
	})

	$(".share").on('click', () => {
		$('.share').addClass('hide')
	})
}


