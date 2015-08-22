var express = require('express');

var port = process.env.PORT || 8080;

var app = express();

var router = express.Router();

var QuestionType = {
	All : -1,
	NotAnswered : 0,
	Answered: 1,
};

router.get('/questions', function(request, response) {
	var questionType = QuestionType.All;

	if (request.query.isAnswered) {
		var answeredValue = request.query.isAnswered;

		switch (answeredValue.toLowerCase()) {
			case "yes":
				questionType = QuestionType.Answered;
				break;

			case "no":
				questionType = QuestionType.NotAnswered;
				break;

			default:
				response.sendStatus(400);
		}
	}

	console.log('Retrieving questions with status ' + questionType);

	response.sendStatus(200);
});

router.get('/questions/:questionId', function(request, response) {
	var questionId = request.params.questionId;

	console.log('Retrieving question with id ' + questionId);

	response.sendStatus(200);
});

router.post('/questions', function(request, response) {
	console.log('Posting a question');

	response.sendStatus(201);
});

router.post('/questions/:questionId/answers', function(request, response) {
	var questionId = request.params.questionId;

	console.log('Posting an answer for question with id ' + questionId);

	response.sendStatus(201);
});

router.get('/', function(request, response) {
	response.json({foo: 'bar'});
	console.log('Got an API request!');
});

app.use(express.static('content'));
app.use('/api', router);

app.listen(port);
console.log('Listening on port ' + port);