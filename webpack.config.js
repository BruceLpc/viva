const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path')

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});
module.exports = {
    devtool: 'eval-source-map',
    entry: {
        index: path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
        filename: "bundle-[hash].js"
    },
    devServer: {
        contentBase: "./src", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true,
        host:'192.168.31.233',
        port:'8080'
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
            loader: ExtractTextPlugin.extract("css-loader")
        }, {
            test: /\.scss$/,
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
            filename: 'index.html',
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new ExtractTextPlugin("main.css"),
        new webpack.HotModuleReplacementPlugin() //热加载插件
    ]
}