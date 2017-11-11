
require('./imagesloaded.js')
const basePath = "static/images/"
const loader = new PxLoader();
const fileList = [
	'1.jpg',
	'bg.jpg',
	'result1.jpg',
	'result2.jpg',
	'card.png',
	'1-1.png',
	'1-2.png',
	'1-3.png',
	'1-4.png',
	'1-5.png',
	'1-6.png',
	'wheel.png',
	'guide.png',
	'goods/2-2.png',
	'goods/2-3.png',
	'goods/2-4.png',
	'goods/2-5.png',
	'goods/2-6.png',
	'goods/2-7.png',
	'goods/2-8.png',
	'goods/2-9.png',
	'goods/2-10.png',
	'goods/2-11.png',
	'goods/2-12.png'

];
for (var i = 0; i < fileList.length; i++) {
	loader.addImage(basePath + fileList[i]);
}


export default loader