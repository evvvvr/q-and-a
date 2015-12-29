'use strict';

require('app-module-path').addPath(__dirname + '/server');

var express = require('express'),
    bodyParser = require('body-parser'),
    middleware = require('./middleware.js'),
    AppDefaults = require('./app-defaults.js'),
    initializeDatabase = require('./db-initializer.js'),
    questionsController = require('./questions-controller.js');

initializeDatabase(startApp);

function startApp(error) {
    if (error) {
        console.error('Error starting application: %j', error);
        return;
    }

    var port = process.env.PORT || AppDefaults.Port;
    var app = express();

    app.use(express.static('dist'));
    app.use('/api', bodyParser.json());
    app.use('/api', questionsController);
    app.use(middleware.handleError);

    console.info('Starting app on port %d', port);
    app.listen(port);
}