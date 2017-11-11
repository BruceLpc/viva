const all_goods = [{
	name: 'jiu',
	score: 2,
	img: 'static/images/goods/2-2.png'
}, {
	name: 'nvpengyou',
	score: 10,
	img: 'static/images/goods/2-3.png'
}, {
	name: 'shouji',
	score: 3,
	img: 'static/images/goods/2-4.png'
}, {
	name: 'yinhang',
	score: 5,
	img: 'static/images/goods/2-5.png'
}, {
	name: 'shi',
	score: -5,
	img: 'static/images/goods/2-6.png'
}, {
	name: 'yanjing',
	score: 1,
	img: 'static/images/goods/2-7.png'
}, {
	name: 'biao',
	score: 3,
	img: 'static/images/goods/2-8.png'
}, {
	name: 'dianshi',
	score: 3,
	img: 'static/images/goods/2-9.png'
}, {
	name: 'yao',
	score: 1,
	img: 'static/images/goods/2-10.png'
}, {
	name: 'box',
	score: 1,
	img: 'static/images/goods/2-11.png'
}, {
	name: 'che',
	score: 5,
	img: 'static/images/goods/2-12.png'
}]


let currentIndex = 0
let	length = all_goods.length
let goodsWrap = null

const create = function() {
	// debugger
	let randomIndex = parseInt(Math.random(0, length) * length)
	let currentGoods = all_goods[randomIndex]
	let goods = document.createElement('img')

	goods.className = 'goods run'
	goods.src = currentGoods.img
	goods.score = currentGoods.score
	goodsWrap.appendChild(goods)

	goods.addEventListener('webkitAnimationEnd', animationEnd)
}

const animationEnd = function(ev) {
	let ele = ev.target
	let pos = ele.getBoundingClientRect()
	ele.removeEventListener('webkitAnimationEnd', animationEnd)
	ele.style.cssText = `left:${pos.left}px;top:${pos.top}px;position:fixed`
	ele.className = 'goods down'
	ele.addEventListener('webkitAnimationEnd', remove)
}

const remove = function(ev) {
	let ele = ev.tagName === 'IMG' ? ev : ev.target
	ele.parentElement.removeChild(ele)
	ele.addEventListener('webkitAnimationEnd', remove)
	ele = null
}

const init=function(){
	goodsWrap = $('#goods-wrap')[0]
}

export default {
	create,
	remove,
	init
}