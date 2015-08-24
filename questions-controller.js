'use strict';

var express = require('express'),
	middleware = require('./middleware.js'),
	Validator = require('jsonschema').Validator,
	objectSchemas = require('./json-schemas.js'),
	router = express.Router(),
	url = require('url'),
	DbService = require('./db-service.js'),
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

		DbService.getAllQuestions(function (err, res) {
			console.info('Returning ' + res.length + ' questions');

			response.json(res).status(200);
		});
	} else if (questionType === QuestionType.Unanswered) {
		console.info('Retrieving unanswered questions');

		DbService.getUnansweredQuestions(function (err, res) {
			console.info('Returning ' + res.length + ' questions');

			response.json(res).status(200);
		});
	} else if (questionType === QuestionType.Answered) {
		console.info('Retrieving answered questions');
		
		DbService.getAnsweredQuestions(function (err, res) {
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
		DbService.insertQuestion(request.body, function (error, newQuestionId) {
			console.info('New question has been posted. Id is ' + newQuestionId);
			
			var newQuestionURL = url.format({
				protocol : request.protocol,
				hostname : request.hostname,
				port : port,
				pathname : (request.baseUrl !== '/' ?
					request.baseUrl : '') + '/questions/'+ newQuestionId
			});

			response.setHeader('Location', newQuestionURL);
			response.sendStatus(201);
		});
	}
});

router.get('/questions/:questionId(\\d+)', [middleware.parsePagingParams,
	function(request, response) {
		var questionId = request.params.questionId;

		console.info('Retrieving question with id ' + questionId);

		DbService.getQuestion(questionId, function (error, question) {
			if (!question) {
				console.error('Question with id %d not found', questionId);
				response.sendStatus(404);
			} else {
				console.info('Question found');
				response.status(200).json(question);
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

	console.info('Posting an answer for question with id %d. Data is %j',
		questionId, request.body);

	var objectValidator = new Validator();
	var validationResult = objectValidator.validate(request.body,
		objectSchemas.Answer);

	if (!validationResult.valid) {
		var errorMessage = validationResult.errors[0].stack;

		console.info('Bad request: %s', errorMessage);
		response.status(400).send(errorMessage);
	} else {
		DbService.insertAnswer(questionId, request.body,
			function (error, newAnswerId) {
				if (newAnswerId === 0) {
					console.info('Question with id %d not found', questionId);
					response.sendStatus(404)
				} else {
					response.sendStatus(201);
				}
		});
	}
});

module.exports = router;