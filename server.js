'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var AppDefaults = require('./app-defaults.js');
var initializeDatabase = require('./db-initializer.js');
var questionsController = require('./questions-controller.js');

initializeDatabase(startApp);

function startApp(error) {
	if (error) {
		console.error('Error starting application: ' + error);
		return;
	}

	var port = process.env.PORT || AppDefaults.Port;
	var app = express();

	app.use(express.static('content'));
	app.use('/api', bodyParser.json());
	app.use('/api', questionsController);

	console.info('Starting app on port ' + port);
	app.listen(port);
}