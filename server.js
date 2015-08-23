'use strict';

var fs = require('fs');
var sqlite3 = require('sqlite3');
var express = require('express');
var bodyParser = require('body-parser');
var Validator = require('jsonschema').Validator;
var objectSchemas = require('./json-schemas.js');
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
		
		if (questionType === questions.QuestionType.All) {
			console.info('Retrieving all questions');

			var db = new sqlite3.Database('data.db');

			db.all('Select  Questions.id as id, Questions.Text as text, '
				+ 'Users.Login as user, Questions.DateTimeAsked as dateTimeAsked '
				+ 'From Questions '
				+ 'Inner Join Users On Users.Id = Questions.UserAsked '
				+ 'Order By datetime(Questions.DateTimeAsked) desc, id desc',
				function (err, res) {
					db.close();
					console.info('Returning ' + res.length + ' questions');
					response.json(res).status(200);
				});
		} else if (questionType === questions.QuestionType.Unanswered) {
			console.info('Retrieving unanswered questions');

			var db = new sqlite3.Database('data.db');

			db.all('Select  Questions.id as id, Questions.Text as text, '
				+ 'Users.Login as user, Questions.DateTimeAsked as dateTimeAsked '
				+ 'From Questions '
				+ 'Inner Join Users On Users.Id = Questions.UserAsked '
				+ 'Where Not Exists (Select * From Answers Where Answers.QuestionId = Questions.Id) '
				+ 'Order By datetime(Questions.DateTimeAsked) desc, id desc',
				function (err, res) {
					db.close();
					console.info('Returning ' + res.length + ' questions');
					response.json(res).status(200);
				});
		} else if (questionType === questions.QuestionType.Answered) {
			console.info('Retrieving answered questions');
			
			var db = new sqlite3.Database('data.db');

			db.all('Select  Questions.id as id, Questions.Text as text, '
				+ 'Users.Login as user, Questions.DateTimeAsked as dateTimeAsked '
				+ 'From Questions '
				+ 'Inner Join Users On Users.Id = Questions.UserAsked '
				+ 'Where Exists (Select * From Answers Where Answers.QuestionId = Questions.Id) '
				+ 'Order By datetime(Questions.DateTimeAsked) desc, id desc',
				function (err, res) {
					db.close();
					console.info('Returning ' + res.length + ' questions');
					response.json(res).status(200);
				});
		}
	}]);

	router.post('/questions', function(request, response) {
		var requestData = JSON.stringify(request.body);

		console.info('Posting a question. Data is: ' + requestData);

		var objectValidator = new Validator();
		var validationResult = objectValidator.validate(request.body,
			objectSchemas.Question);

		if (!validationResult.valid) {
			var errorMessage = validationResult.errors[0].stack;
			console.error('Bad request: ' + errorMessage);
			response.status(400).send(errorMessage);
		} else {
			var db = new sqlite3.Database('data.db');

			db.serialize(function () {
				db.run('Insert or Ignore Into "Users" (Login) Values ($login)', {
					$login: request.body.user
				});

				db.run('Insert Into Questions (Text, DateTimeAsked, UserAsked) ' 
					+ 'Select $text, datetime(\'now\'), Id from Users '
					+ 'Where Login = $login', {
						$text : request.body.text,
						$login : request.body.user
				}, function (error) {
					if (error) {
						response.sendStatus(500);
					} else {
						var newQuestionId = this.lastID;
						console.info('New question has been posted. Id is '
							+ newQuestionId);

						var protocol = request.protocol;
						var host = request.hostname;
						var newQuestionLocation = protocol + "://" + host + ':' + port
							+ '/api/questions/'+ newQuestionId;
						response.setHeader('Location', newQuestionLocation);
						response.sendStatus(201);
					}

					db.close();
				})
			});
		}
	});

	router.get('/questions/:questionId(\\d+)', [middleware.parsePagingParams,
		function(request, response) {
			var questionId = request.params.questionId;

			console.info('Retrieving question with id ' + questionId); 
			
			var db = new sqlite3.Database('data.db');

			db.get('Select Questions.Id as id, Users.Login as user, '
				+ 'Questions.Text as text, Questions.DateTimeAsked as dateTimeAsked '
				+ 'From Questions '
				+ 'Inner Join Users On Users.Id = Questions.UserAsked '
				+ 'Where Questions.Id = $questionid', {
					$questionid : questionId
				}, function (error, question) {
					if (!question) {
						db.close();
						var errorMessage = 'Question with id ' + questionId
							+ ' was not found.';

						console.error(errorMessage);
						response.status(404).send(errorMessage);
					} else {
						db.all('Select Users.Login as user, Answers.Text as text, '
							+ ' Answers.DateTimeAnswered as dateTimeAnswered From Answers '
							+ 'Inner Join Users On Users.Id = Answers.UserAnswered '
							+ 'Where Answers.QuestionId = $questionIdForAnswers '
							+ 'Order By datetime(Answers.DateTimeAnswered) desc, '
							+ 'Answers.Id desc', {
								$questionIdForAnswers : questionId
							}, function (err, answers) {
								question.answers = answers;
								response.json(question).status(200);
							});
					}
				});
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

		var requestData = JSON.stringify(request.body);

		console.log('Posting an answer for question with id ' + questionId
			+ ". Data is: " + requestData);

		var objectValidator = new Validator();
		var validationResult = objectValidator.validate(request.body,
			objectSchemas.Answer);

		if (!validationResult.valid) {
			var errorMessage = validationResult.errors[0].stack;
			console.error('Bad request: ' + errorMessage);
			response.status(400).send(errorMessage);
		} else {
			var db = new sqlite3.Database('data.db');

			db.serialize(function () {
				db.run('Insert or Ignore Into "Users" (Login) Values ($login)', {
					$login: request.body.user
				});

				db.run('Insert Into Answers (Text, DateTimeAnswered, QuestionId, UserAnswered) ' 
					+ 'Select $text, datetime(\'now\'), Questions.Id, Users.Id from Users '
					+ 'cross join Questions '
					+ 'Where Users.Login = $login and Questions.Id = $questionid', {
						$text : request.body.text,
						$login : request.body.user,
						$questionid : questionId
				}, function (error) {
					if (error) {
						console.error(error);
						response.sendStatus(500);
					} else {
						var newAnswerId = this.lastID;

						if (newAnswerId === 0) {
							var errorMessage = 'Question with id ' + questionId
								+ ' was not found.';

							console.error(errorMessage);
							response.status(404).send(errorMessage);
						} else {
							console.info('New answer has been posted. Id is '
								+ newAnswerId);

							response.sendStatus(201);
						}
					}

					db.close();
				})
			});
		}
	});

	app.use(express.static('content'));
	app.use(bodyParser.json());
	app.use('/api', router);

	app.listen(port);
	console.log('Listening on port ' + port);
}