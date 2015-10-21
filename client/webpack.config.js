'use strict';

var webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: {
        javascript: path.resolve(__dirname, 'scripts/index.jsx'),
        html: path.resolve(__dirname, 'index.html')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'file?name=[name].[ext]' },
            { test: path.resolve(__dirname, 'scripts'), loader: 'babel' },
            { test: /\.css$/, loader: 'style!css' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};