'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    middleware = require('./middleware.js'),
    AppDefaults = require('./app-defaults.js'),
    initializeDatabase = require('./db-initializer.js'),
    questionsController = require('./questions-controller.js');

console.info('Starting app...');

initializeDatabase(startApp);

function startApp(error) {
    function shutdownGracefully() {
        console.info('Shutting down gracefully...');

        server.close(function () {
            console.info('Remaining client connections closed');

            process.exit();
        });

        setTimeout(function () {
            console.info('Failed to close client connections. Force shut down');

            process.exit(1);
        }, timeout);
    }

    if (error) {
        console.error('Error starting application: %j', error);

        process.exit(1);
    }

    var port = process.env.PORT || AppDefaults.Port;
    var timeout = process.env.TIMEOUT || AppDefaults.Timeout;
    var app = express();

    app.use(express.static('./build/assets'));
    app.use('/api', bodyParser.json());
    app.use('/api', questionsController);
    app.use(middleware.handleError);

    var server = app.listen(port, function (error) {
        console.info('Listening on port %d', port);
    });

    process.on('SIGTERM', shutdownGracefully);
    process.on('SIGINT', shutdownGracefully);
}