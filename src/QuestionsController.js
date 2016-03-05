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
            case 'yes':
                return this.Answered;

            case 'no':
                return this.Unanswered;

            default:
                throw new Error(`Invalid QuestionTypes value ${value}`);
        }
    }
};

const QuestionsController = express.Router();

QuestionsController.get('/questions', (request, response, next) => {
    console.info('Retrieving questions');

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
        console.info('Retrieving all questions');

        DbService.getAllQuestions((err, res) => {
            if (err) {
                return next(err);
            }

            console.info(`Returning ${res.length} question(s)`);

            response.status(200).json(res);
        });
    } else if (questionType === QuestionTypes.Unanswered) {
        console.info('Retrieving unanswered question');

        DbService.getUnansweredQuestions((err, res) => {
            if (err) {
                return next(err);
            }

            console.info(`Returning ${res.length} question(s)`);

            response.status(200).json(res);
        });
    } else if (questionType === QuestionTypes.Answered) {
        console.info('Retrieving answered questions');
        
        DbService.getAnsweredQuestions((err, res) => {
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

    console.info('Posting a question. Data is: %j', question);

    const objectValidator = new jsonschema.Validator();
    const validationResult = objectValidator.validate(
        question,
        QuestionSchema
    );

    if (!validationResult.valid) {
        const validationErrorMessage = validationResult.errors[0].stack;
        console.error(`Bad request: ${validationErrorMessage}`);
        response.status(400).json({'error': validationErrorMessage});
    } else {
        question.dateTimeAsked = moment.utc()
            .format(AppDefaults.DateTimeFormat);

        DbService.insertQuestion(question, (err, newQuestionId) => {
            if (err) {
                return next(err);
            }
            
            question.id = newQuestionId;
            question.answers = [];

            var newQuestionURL = url.format({
                protocol : request.protocol,
                hostname : request.hostname,
                port : port,
                pathname : `${request.baseUrl !== '/' ?
                    request.baseUrl : ''}/questions/${newQuestionId}`
            });

            response.setHeader('Location', newQuestionURL);
            response.sendStatus(201);

            console.info(`New question has been posted. Data is: %j`, question);
        });
    }
});

QuestionsController.get('/questions/:questionId(\\d+)', (request, response, next) => {
    const questionId = request.params.questionId;

    console.info(`Retrieving question with id ${questionId}`);

    DbService.getQuestion(questionId, (err, question) => {
        if (err) {
            return next(err);
        }
        
        if (!question) {
            console.error(`Question with id ${questionId} not found`);
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
        + ` Data is: %j`, answer);

    const objectValidator = new jsonschema.Validator();
    const validationResult = objectValidator.validate(answer, AnswerSchema);

    if (!validationResult.valid) {
        const validationErrorMessage = validationResult.errors[0].stack;

        console.error(`Bad request: ${validationErrorMessage}`);
        response.status(400).json({'error': validationErrorMessage});
    } else {
        answer.dateTimeAnswered = moment.utc()
            .format(AppDefaults.DateTimeFormat);

        DbService.insertAnswer(questionId, answer, (err, newAnswerId) => {
                if (err) {
                    return next(err);
                }
            
                if (newAnswerId === 0) {
                    console.error(`Question with id ${questionId} not found`);
                    response.sendStatus(404)
                } else {
                    answer.id = newAnswerId;

                    response.sendStatus(201);

                    console.info(`Answer for question with id ${questionId} has been posted.`
                        + ` Data is: %j`, answer);
                }
        });
    }
});

export default QuestionsController;