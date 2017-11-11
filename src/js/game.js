import Goods from './goods'
import countdown from './countdown'
import {
	TOTAL_TIME
}
from './config'

(function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // name has changed in Webkit
			window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}
}())


let count = 0
const update = function() {
	count++
	let random = parseInt(Math.random(100, 400) * 1000)
	if (count > random) {
		Goods.create()
		count = 0
	}
}
let total_score = 0
let scoreEle = null
let cartEle = null
let $stage = null
const addScore = function(score, pos) {
	let i = document.createElement('i')
	i.className = score > 0 ? 'score_animate green' : 'score_animate red'
	i.innerHTML = score > 0 ? '+' + score : score
	if (viewWidth > viewHeight) {
		i.style.cssText = `left:${pos.left}px;top:${pos.top}px`
	} else {
		i.style.cssText = `left:${pos.top}px;top:${pos.right}px`
	}
	$stage.appendChild(i)
	i.addEventListener('webkitAnimationEnd', removeScoreAnimate)

	total_score += score
	scoreEle.html(total_score)

	if (score > 0) {
		succAudio.play()
	} else {
		failAudio.play()
	}
}
const removeScoreAnimate = function(ev) {
	ev.target.removeEventListener('webkitAnimationEnd', removeScoreAnimate)
	$stage.removeChild(ev.target)
}


let cartPos = {}
let goodsPos = {}
let isTouch = false
let offset = 40 //偏差

let viewWidth = window.innerWidth
let viewHeight = window.innerHeight
const touchstartHandler = function(ev) {
	let ele = ev.target
	let elePos = ele.getBoundingClientRect()
	let touchEvent = ev.originalEvent.touches[0]
	viewWidth = window.innerWidth
	viewHeight = window.innerHeight
	ele.className = 'goods'

	if (viewWidth < viewHeight) { // 竖屏
		ele.style.cssText = `left:${elePos.top}px;top:${viewWidth-elePos.right}px;position:fixed;z-index:999`
		goodsPos.startX = touchEvent.clientX - elePos.left
		goodsPos.startY = touchEvent.clientY - elePos.top
	} else {
		ele.style.cssText = `left:${elePos.left}px;top:${elePos.top}px;position:fixed;z-index:999`
		goodsPos.startX = touchEvent.clientX - elePos.left
		goodsPos.startY = touchEvent.clientY - elePos.top
	}

	isTouch = true
}
const touchmoveHandler = function(ev) {
	if (!isTouch) return
	let ele = ev.target
	let touchEvent = ev.originalEvent.touches[0]

	if (viewWidth < viewHeight) { // 竖屏

		let left = touchEvent.clientY - goodsPos.startY
		let top = viewWidth - touchEvent.clientX - goodsPos.startX
		ele.style.cssText = `left:${left}px;top:${top}px;position:fixed;z-index:999`

		let elePos = ele.getBoundingClientRect()
		let cartPos = cartEle.getBoundingClientRect()
		if (elePos.left >= cartPos.left - offset && elePos.right <= cartPos.right + offset && elePos.bottom >= cartPos.top && elePos.bottom <= cartPos.bottom) {
			addScore(ele.score, elePos)
			Goods.remove(ele)
			isTouch = false
		}
	} else {
		let left = touchEvent.clientX - goodsPos.startX
		let top = touchEvent.clientY - goodsPos.startY
		ele.style.cssText = `left:${left}px;top:${top}px;position:fixed;z-index:999`

		let cartPos = cartEle.getBoundingClientRect()
		let elePos = ele.getBoundingClientRect()
		if (elePos.left >= cartPos.left - offset && elePos.right <= cartPos.right + offset && elePos.bottom >= cartPos.top && elePos.bottom <= cartPos.bottom) {
			addScore(ele.score, elePos)
			Goods.remove(ele)
			isTouch = false
		}
	}

}
const touchendHandler = function(ev) {
	if (!isTouch) return
	let ele = ev.target
	ele.className = 'goods down'
	isTouch = false
}
let updateTimer = null
let $goodsWrap = null
let succAudio = null
let failAudio = null
let bgmAudio = null

const init = function() {
	scoreEle = $("#score")
	$stage = $('.stage')[0]
	cartEle = $('#cart')[0]
	succAudio = $("#succAudio")[0]
	failAudio = $("#failAudio")[0]
	bgmAudio = $("#bgm")[0]
	$goodsWrap = $("#goods-wrap")
	total_score = 0
	scoreEle.html(0)

	$(".goods").remove()
	$('.wheel-wrap').addClass('rotate')
	$goodsWrap.on('touchstart', '.goods', touchstartHandler)
	$goodsWrap.on('touchmove', '.goods', touchmoveHandler)
	$goodsWrap.on('touchend', '.goods', touchendHandler)

	Goods.init()
}

function loop() {
	updateTimer = window.requestAnimationFrame(loop);
	update();
}
let isFirst = false
const start = function() {
	init()
	loop()
	countdown.start()
	bgmAudio.play()

	if (!isFirst) { // 用户点击触发不报错， 但程序调用同时播放暂停会报错
		isFirst = true
		succAudio.play()
		succAudio.pause()
		failAudio.play()
		failAudio.pause()
	}
}

const over = function() {
	bgmAudio.pause()
	window.cancelAnimationFrame(updateTimer)
	$('.wheel-wrap').removeClass('rotate')
	$('.game-over').removeClass('hide')
	$('.game-wrap').addClass("hide")
	$('#result-score').html(total_score)

	if (total_score >= 100) {
		$('.game-over').addClass('result2')
	} else {
		$('.game-over').addClass('result1')
	}
}

const repeat = function() {
	$('.game-over').removeClass('result2').removeClass('result1').addClass("hide")
	$('.game-wrap').removeClass('hide')
	start()
}

export default {
	start,
	over,
	repeat
}