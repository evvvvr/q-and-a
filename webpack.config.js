'use strict';

var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        javascript: path.resolve(__dirname, './src/client/index.jsx'),
        html: path.resolve(__dirname, './src/client/public/index.html')
    },
    output: {
        path: path.resolve(__dirname, './build/public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            },
            {
                include: [
                    path.resolve(__dirname, './src/client'),
                ],
                test: /\.jsx?$/,
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