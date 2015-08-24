'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
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

	app.use(express.static('content'));
	app.use('/api', bodyParser.json());
	app.use('/api', questionsController);

	console.info('Starting app on port %d', port);
	app.listen(port);
}