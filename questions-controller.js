'use strict';

var express = require('express'),
	middleware = require('./middleware.js'),
	sqlite3 = require('sqlite3'),
	Validator = require('jsonschema').Validator,
	objectSchemas = require('./json-schemas.js'),
	router = express.Router(),
	url = require('url'),
	AppDefaults = require('./app-defaults.js');

var QuestionType = {
	All : -1,

	Unanswered : 0,

	Answered: 1,

	parse : function (value) {
		switch (value.toLowerCase()) {
			case "yes":
				return this.Answered;

			case "no":
				return this.Unanswered;

			default:
				throw "Invalid value";
		}
	}
};

var port = process.env.PORT || AppDefaults.Port;

router.get('/questions', [middleware.parsePagingParams, function(request, response) {
	var questionType = QuestionType.All;

	if (request.query.isAnswered) {
		try {
			questionType = QuestionType.parse(
				request.query.isAnswered);			
		} catch (err) {
			response.sendStatus(404);
		}
	}
	
	if (questionType === QuestionType.All) {
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
	} else if (questionType === QuestionType.Unanswered) {
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
	} else if (questionType === QuestionType.Answered) {
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
					
					var newQuestionURL = url.format({
						protocol : request.protocol,
						hostname : request.hostname,
						port : port,
						pathname : request.baseUrl + '/questions/'+ newQuestionId
					});

					response.setHeader('Location', newQuestionURL);
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

module.exports = router;