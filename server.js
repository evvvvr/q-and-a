'use strict';

var express = require('express');
var AppDefaults = require('./app-defaults.js');
var middleware = require('./middleware.js');
var questions = require('./questions.js');

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
	console.log('Posting a question');

	response.sendStatus(201);
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