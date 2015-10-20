'use strict';

var webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: {
        javascript: path.resolve(__dirname, './frontend/scripts/main.js'),
        html: path.resolve(__dirname, './frontend/index.html')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'file?name=[name].[ext]' },
            { test: path.resolve(__dirname, 'frontend/scripts'), loader: 'babel' },
            { test: /\.css$/, loader: 'style!css' }
        ]
    }
};