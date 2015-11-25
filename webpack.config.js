var webpack = require('webpack'),
    path = require('path'),
    fs = require('fs'),
    ejs = require('ejs'),
    HtmlWebpackPlugin = require('html-webpack-plugin')

var ROOT_PATH = path.resolve(__dirname),
    APP_PATH = path.resolve(ROOT_PATH, 'app'),
    BUILD_PATH = path.resolve(ROOT_PATH, 'build'),
    TARGET = process.env.npm_lifecycle_event;

var template = ejs.compile(fs.readFileSync(path.resolve(ROOT_PATH, 'views/main.ejs'), 'utf8'));

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
        new HtmlWebpackPlugin({
            templateContent: template(),
        })
    ]
};

if(TARGET === 'start' || !TARGET) {
    config.devtool = 'eval-source-map';
}

module.exports = config;
