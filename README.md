# viva
双十一小游戏


##### 安装 
npm install --save-dev webpack-dev-server node-sass

##### 调试 
npm run dev

##### 打包 
npm run build
build完后需要把static 目录复制到 dist目录 


# 总结：

游戏用sass、es6开发，DOM渲染，打包工具用webpack

本来这么简单的小游戏直接js、css、 html 就可以开发，但感觉自己webpack用的不是很熟练，正好学习下
webpac.config.js的配置，有几个地方需要记：

	devServer: {
	    contentBase: "./src", //本地服务器所加载的页面所在的目录,默认是__dirname
	    historyApiFallback: true, //不跳转
	    inline: true, // iframe模式(页面放在iframe中,当发生改变时重载),inline模式(将webpack-dev-sever的客户端入口添加到包(bundle)中)
	    hot: true,  // 热模块替换的好处是只替换更新的部分,而不是页面重载，需要配合new webpack.HotModuleReplacementPlugin() 插件使用
	    host:'192.168.31.233', // 本机ip，可以在手机打开预览，有的路由器需要配置外网映射才可以打开
	    port:'8080',
	    proxy: {
		    "**": "http://localhost:9090"
		},  // 可以解决跨域问题 
	}

	
	const pathsToClean = [
	    'dist/*.*'
	]
	// the clean options to use
	const cleanOptions = {
	    exclude: ['static'],
	    verbose: true, //Write logs to console.
	    dry: false //Default: false - remove files
	}
	new CleanWebpackPlugin(pathsToClean, cleanOptions), // 可以清除上次build留下的文件 非常有用，可以配置不用删除的文件夹

	resolve: {
        extensions: ['.js'],
        alias: {
            static: path.resolve(__dirname, 'src', 'static')
        }
    }  // 可以设置别名
	
# 主要遇到的问题：

1. 横屏旋转，当计算碰撞检测或者拖拽物体时，获取到的位置信息left top 需要重新计算，
clientX ,clientY, 不管屏幕怎么旋转 值都不会改变，
getBoundingClientRect()  横竖屏对应关系是：
	width=height
	height=width
	bottom=right
	left=window.innerWidth-height-top //  这两个需要实际计算
	top=left
	right=window.innerWidth-width-top //  这两个需要实际计算

2. 由于iphone手机不支持自动播放，微信提供了个接口，当wx.ready调用时执行音乐播放，就可以实现iphone手机微信端自动播放音乐，但有个问题，你必须注册wxSDK 才可以调用wx.ready方法
	wx.ready(function(){ 
		playAudio()
	})
3. 当使用ExtractTextPlugin.extract("style-loader!css-loader!sass-loader") 会报错，原因还没找到



