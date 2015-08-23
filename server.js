'use strict';

var fs = require('fs');
var sqlite3 = require('sqlite3');
var express = require('express');
var AppDefaults = require('./app-defaults.js');
var middleware = require('./middleware.js');
var questions = require('./questions.js');

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

	var router = express.Router();

	router.get('/questions', [middleware.parsePagingParams, function(request, response) {
		var questionType = questions.QuestionType.All;

		if (request.query.isAnswered) {
			try {
				questionType = questions.QuestionType.parse(
					request.query.isAnswered);			
			} catch (err) {
				response.sendStatus(404);
			}
		}

		console.log('Retrieving questions with status ' + questionType
			+ ' for page number ' + request.pageNo + " page size is "
			+ request.pageSize);

		response.sendStatus(200);
	}]);

	router.post('/questions', function(request, response) {
		console.info('Posting a question');

		var db = new sqlite3.Database('data.db');

		db.serialize(function () {
			db.run('Insert or Ignore Into "Users" (Login) Values ($login)', {
				$login: 'voga'
			});

			db.run('Insert Into Questions (Text, DateTimeAsked, UserAsked) ' 
				+ 'Select $text, datetime(\'now\'), Id from Users '
				+ 'Where Login = $login', {
					$text : 'foo',
					$login : 'voga'
			}, function (error) {
				if (error) {
					response.sendStatus(500);
				} else {
					response.sendStatus(201);
				}

				db.close();
			})
		});
	});

	router.get('/questions/:questionId(\\d+)', [middleware.parsePagingParams,
		function(request, response) {
			var questionId = request.params.questionId;

			console.log('Retrieving question with id ' + questionId 
				+ ' for page number ' + request.pageNo + " page size is "
				+ request.pageSize);

			response.sendStatus(200);
	}]);

	router.get('/questions/:questionId(\\d+)/answers', [middleware.parsePagingParams,
		function(request, response) {
			var questionId = request.params.questionId;

			console.log('Retrieving answers for question with id ' + questionId 
				+ ' for page number ' + request.pageNo + " page size is "
				+ request.pageSize);

			response.sendStatus(200);
	}]);

	router.post('/questions/:questionId(\\d+)/answers', function(request, response) {
		var questionId = request.params.questionId;

		console.log('Posting an answer for question with id ' + questionId);

		response.sendStatus(201);
	});

	app.use(express.static('content'));
	app.use('/api', router);

	app.listen(port);
	console.log('Listening on port ' + port);
}