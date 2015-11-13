var webpack = require('webpack');
var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET;

var config = {
    entry: APP_PATH,
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,

        // parse host and port from env so this is easy
        // to customize
        host: process.env.HOST || "localhost",
        port: process.env.PORT || 8080
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css'],
            include: APP_PATH
        }, {
            test: /\.jsx?$/,
            loaders: ['babel'],
            include: APP_PATH
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlPlugin({
            title: 'My App'
        })
    ]
};

if(TARGET === 'start' || !TARGET) {
    config.devtool = 'eval-source-map';
}

module.exports = config;
