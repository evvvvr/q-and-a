import _  from 'underscore'
import AppDefaults from './AppDefaults'
import DbService from './DbService'
import express from 'express'
import jsonschema from 'jsonschema'
import moment from 'moment'
import url from 'url'
import { QuestionSchema, AnswerSchema } from './json-schemas'

const port = process.env.PORT || AppDefaults.Port;

const QuestionTypes = {
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

const QuestionsController = express.Router();

QuestionsController.get('/questions', (request, response, next) => {
    console.info(`Retrieving questions`);

    let questionType = QuestionTypes.All;

    if (request.query.isAnswered) {
        try {
            questionType = QuestionTypes.parse(request.query.isAnswered);
        } catch (err) {
            console.error(`Invalid value for 'isAnswered' query string param:`
                + ` ${request.query.isAnswered}`);
            response.sendStatus(404);
        }
    }
    
    if (questionType === QuestionTypes.All) {
        console.info(`Retrieving all questions`);

        DbService.getAllQuestions(function (err, res) {
            if (err) {
                return next(err);
            }

            console.info(`Returning ${res.length} question(s)`);

            response.status(200).json(res);
        });
    } else if (questionType === QuestionTypes.Unanswered) {
        console.info(`Retrieving unanswered question`);

        DbService.getUnansweredQuestions(function (err, res) {
            if (err) {
                return next(err);
            }

            console.info(`Returning ${res.length} question(s)`);

            response.status(200).json(res);
        });
    } else if (questionType === QuestionTypes.Answered) {
        console.info(`Retrieving answered questions`);
        
        DbService.getAnsweredQuestions(function (err, res) {
            if (err) {
                return next(err);
            }
            
            console.info(`Returning ${res.length} question(s)`);

            response.status(200).json(res);
        });
    }
});

QuestionsController.post('/questions', (request, response, next) => {
    const question = _.clone(request.body);

    console.info(`Posting a question. Data is: ${question}`);

    const objectValidator = new jsonschema.Validator();
    const validationResult = objectValidator.validate(
        question,
        QuestionSchema
    );

    if (!validationResult.valid) {
        const errorMessage = validationResult.errors[0].stack;
        console.error(`Bad request: ${errorMessage}`);
        response.status(400).json({'error': errorMessage});
    } else {
        question.dateTimeAsked = moment.utc()
            .format(AppDefaults.DateTimeFormat);

        DbService.insertQuestion(question, function (err, newQuestionId) {
            if (err) {
                return next(err);
            }
            
            question.id = newQuestionId;
            question.answers = [];

            console.info(`New question has been posted. Id is ${newQuestionId}`);
            
            var newQuestionURL = url.format({
                protocol : request.protocol,
                hostname : request.hostname,
                port : port,
                pathname : (request.baseUrl !== '/' ?
                    request.baseUrl : '') + '/questions/'+ newQuestionId
            });

            response.setHeader('Location', newQuestionURL);
            response.status(201).json(question);
        });
    }
});

QuestionsController.get('/questions/:questionId(\\d+)', (request, response, next) => {
    const questionId = request.params.questionId;

    console.info(`Retrieving question with id ${questionId}`);

    DbService.getQuestion(questionId, function (err, question) {
        if (err) {
            return next(err);
        }
        
        if (!question) {
            console.error('Question with id ${questionId} not found');
            response.sendStatus(404);
        } else {
            response.status(200).json(question);
        }
    });
});

QuestionsController.post('/questions/:questionId(\\d+)/answers', (request, response, next) => {
    const questionId = request.params.questionId;
    const answer = _.clone(request.body);

    console.info(`Posting an answer for question with id ${questionId}.`
        + ` Data is ${answer}`);

    const objectValidator = new jsonschema.Validator();
    const validationResult = objectValidator.validate(answer, AnswerSchema);

    if (!validationResult.valid) {
        const errorMessage = validationResult.errors[0].stack;

        console.error(`Bad request: ${errorMessage}`);
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
                    console.error(`Question with id ${questionId} not found`);
                    response.sendStatus(404)
                } else {
                    const newAnswer = _.clone(request.body);
                    newAnswer.id = newAnswerId;

                    response.status(201).json(newAnswer);
                }
        });
    }
});

export default QuestionsController;