const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

// the path(s) that should be cleaned
const pathsToClean = [
    'dist/*.*'
]

// the clean options to use
const cleanOptions = {
    exclude: ['static'],
    verbose: true, //Write logs to console.
    dry: false //Default: false - remove files
}

const path = require('path')
module.exports = {
    devtool: 'none',
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle-[hash].js"
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            static: path.resolve(__dirname, 'src', 'static')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: "babel-loader",
                query: {
                    "presets": ["es2015"],
                }
            },
            exclude: /(node_modules)/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.scss$|\.sass$/,
            loader: "style-loader!css-loader!sass-loader"
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }), // 生成模板
        new ExtractTextPlugin("main.css"),  // 提取css样式
        new CleanWebpackPlugin(pathsToClean, cleanOptions), // 清除dist目录
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }) // 代码压缩
    ]
};