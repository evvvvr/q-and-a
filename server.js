'use strict';

var fs = require('fs');
var sqlite3 = require('sqlite3');
var express = require('express');
var bodyParser = require('body-parser');
var AppDefaults = require('./app-defaults.js');
var questionsController = require('./questions-controller.js');

console.info('Initalizing database.');

var db = new sqlite3.Database('data.db');
var dbCreationScript = fs.readFileSync('./db/create.sql', 'utf8');

db.exec(dbCreationScript, function (err) {
	if (err) {
		throw err;
	}

	console.info('Database initialized.');
	db.close();

	startApp();
});

function startApp() {
	var port = process.env.PORT || AppDefaults.Port;
	var app = express();

	app.use(express.static('content'));
	app.use('/api', bodyParser.json());
	app.use('/api', questionsController);

	console.info('Starting app on port ' + port);
	app.listen(port);
}