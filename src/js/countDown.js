import {
	TOTAL_TIME
} from './config'

import Game from './game'

var countdownTime,
	timeEle = null,
	timer = null

const start = function() {
	init()
	countdownTime = TOTAL_TIME
	timeEle.html(countdownTime)
	timer = setInterval(update, 1000)
}
const update = function() {
	countdownTime--
	timeEle.html(countdownTime)
	if (countdownTime <= 0) {
		end()
	}
}
const end = function() {
	clearInterval(timer)
	Game.over()
}
const init = function() {
	timeEle = $('#time')
}

export default {
	start,
	end
}