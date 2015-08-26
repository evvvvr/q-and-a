'use strict';

var webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: './frontend/js/main.js',
    output: {
        path: __dirname,
        filename: 'assets/js/bundle.js'
    },
    plugins: [
        new webpack.optimize.DedupePlugin()
    ],
    resolve: {
        alias: {
          // Force all modules to use versions of backbone and underscore defined
          // in package.json to prevent duplicate dependencies
          'backbone': path.join(__dirname, 'node_modules', 'backbone', 'backbone.js'),
          'underscore': path.join(__dirname, 'node_modules', 'underscore', 'underscore.js')
        }
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};