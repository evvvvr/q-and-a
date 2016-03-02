'use strict';

var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        javascript: path.resolve(__dirname, './scripts/index.jsx'),
        html: path.resolve(__dirname, './index.html')
    },
    output: {
        path: path.resolve(__dirname, '../../build/assets'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: path.resolve(__dirname, './scripts'),
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },
    resolve: {
        extensions: [ '', '.js', '.jsx' ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css",  {allChunks: true})
    ]
};