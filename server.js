var express = require('express');

var port = process.env.PORT || 8080;

var app = express();

var router = express.Router();

var AppDefaults = {
	PageNo : 1,
	PageSize : 10
};

var QuestionType = {
	All : -1,
	NotAnswered : 0,
	Answered: 1,
};

function isPositiveInt(value) {
	return /^([1-9]\d*)$/.test(value);
}

function parsePagingParams(request, response, next) {
	request.pageNo = AppDefaults.PageNo;
	request.pageSize = AppDefaults.PageSize;

	if (request.query.pageNo) {
		if (isPositiveInt(request.query.pageNo)) {
			request.pageNo = request.query.pageNo;
		} else {
			response.sendStatus(400);
		}
	}

	if (request.query.pageSize) {
		if (isPositiveInt(request.query.pageSize)) {
			request.pageSize = request.query.pageSize;
		} else {
			response.sendStatus(400);
		}
	}

	next();
}

router.get('/questions', parsePagingParams);
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

	console.log('Retrieving questions with status ' + questionType
		+ ' for page number ' + request.pageNo + " page size is "
		+ request.pageSize);

	response.sendStatus(200);
});

router.post('/questions', function(request, response) {
	console.log('Posting a question');

	response.sendStatus(201);
});

router.get('/questions/:questionId', parsePagingParams);
router.get('/questions/:questionId', function(request, response) {
	var questionId = request.params.questionId;

	console.log('Retrieving question with id ' + questionId 
		+ ' for page number ' + request.pageNo + " page size is "
		+ request.pageSize);

	response.sendStatus(200);
});

router.get('/questions/:questionId/answers', parsePagingParams);
router.get('/questions/:questionId/answers', function(request, response) {
	var questionId = request.params.questionId;

	console.log('Retrieving answers for question with id ' + questionId 
		+ ' for page number ' + request.pageNo + " page size is "
		+ request.pageSize);

	response.sendStatus(200);
});

router.post('/questions/:questionId/answers', function(request, response) {
	var questionId = request.params.questionId;

	console.log('Posting an answer for question with id ' + questionId);

	response.sendStatus(201);
});

app.use(express.static('content'));
app.use('/api', router);

app.listen(port);
console.log('Listening on port ' + port);