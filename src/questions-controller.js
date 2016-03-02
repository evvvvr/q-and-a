'use strict';

var express = require('express'),
    Validator = require('jsonschema').Validator,
    objectSchemas = require('./json-schemas.js'),
    url = require('url'),
    moment = require('moment'),
    _ = require('underscore'),
    DbService = require('./db-service.js'),
    AppDefaults = require('./app-defaults.js'),
    router = express.Router();

var QuestionType = {
    All: -1,

    Unanswered: 0,

    Answered: 1,

    parse: function (value) {
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

router.get('/questions', function(request, response, next) {
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
            if (err) {
                return next(err);
            }

            console.info('Returning %d question(s)', res.length);

            response.status(200).json(res);
        });
    } else if (questionType === QuestionType.Unanswered) {
        console.info('Retrieving unanswered question');

        DbService.getUnansweredQuestions(function (err, res) {
            if (err) {
                return next(err);
            }

            console.info('Returning %d question(s)', res.length);

            response.status(200).json(res);
        });
    } else if (questionType === QuestionType.Answered) {
        console.info('Retrieving answered questions');
        
        DbService.getAnsweredQuestions(function (err, res) {
            if (err) {
                return next(err);
            }
            
            console.info('Returning %d question(s)', res.length);

            response.status(200).json(res);
        });
    }
});

router.post('/questions', function(request, response, next) {
    var requestData = JSON.stringify(request.body);

    console.info('Posting a question. Data is: %j', requestData);

    var objectValidator = new Validator();
    var validationResult = objectValidator.validate(request.body,
        objectSchemas.Question);

    if (!validationResult.valid) {
        var errorMessage = validationResult.errors[0].stack;
        console.error('Bad request: %s', errorMessage);
        response.status(400).json({'error': errorMessage});
    } else {
        request.body.dateTimeAsked = moment.utc()
            .format(AppDefaults.DateTimeFormat);

        DbService.insertQuestion(request.body, function (err, newQuestionId) {
            if (err) {
                return next(err);
            }
            
            var newQuestion = _.clone(request.body);
            newQuestion.id = newQuestionId;
            newQuestion.answers = [];

            console.info('New question has been posted. Id is %d', newQuestionId);
            
            var newQuestionURL = url.format({
                protocol : request.protocol,
                hostname : request.hostname,
                port : port,
                pathname : (request.baseUrl !== '/' ?
                    request.baseUrl : '') + '/questions/'+ newQuestionId
            });

            response.setHeader('Location', newQuestionURL);
            response.status(201).json(newQuestion);
        });
    }
});

router.get('/questions/:questionId(\\d+)', function(request, response, next) {
    var questionId = request.params.questionId;

    console.info('Retrieving question with id %d', questionId);

    DbService.getQuestion(questionId, function (err, question) {
        if (err) {
            return next(err);
        }
        
        if (!question) {
            console.error('Question with id %d not found', questionId);
            response.sendStatus(404);
        } else {
            console.info('Question found');
            response.status(200).json(question);
        }
    });
});

router.post('/questions/:questionId(\\d+)/answers', function(request, response, next) {
    var questionId = request.params.questionId;

    console.info('Posting an answer for question with id %d. Data is %j',
        questionId, request.body);

    var objectValidator = new Validator();
    var validationResult = objectValidator.validate(request.body,
        objectSchemas.Answer);

    if (!validationResult.valid) {
        var errorMessage = validationResult.errors[0].stack;

        console.info('Bad request: %s', errorMessage);
        response.status(400).json({'error': errorMessage});
    } else {
        request.body.dateTimeAnswered = moment.utc()
            .format(AppDefaults.DateTimeFormat);

        DbService.insertAnswer(questionId, request.body,
            function (err, newAnswerId) {
                if (err) {
                    return next(err);
                }
            
                if (newAnswerId === 0) {
                    console.info('Question with id %d not found', questionId);
                    response.sendStatus(404)
                } else {
                    var newAnswer = _.clone(request.body);
                    newAnswer.id = newAnswerId;

                    response.status(201).json(newAnswer);
                }
        });
    }
});

module.exports = router;