import AnswersController from './AnswersController'
import AppDefaults from '../AppDefaults'
import DbService from '../DbService'
import express from 'express'
import jsonschema from 'jsonschema'
import moment from 'moment'
import QuestionNotFoundError from '../QuestionNotFoundError'
import url from 'url'
import { QuestionSchema } from '../json-schemas'

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
    
    let loadQuestions;

    switch (questionType) {
        case QuestionTypes.All:
            console.info('Retrieving all questions');

            loadQuestions = DbService.getAllQuestions()
                .then((res) => {
                    console.info(`Returning ${res.length} all question(s)`);

                    return res;
                });
            break;

        case QuestionTypes.Answered:
            console.info('Retrieving answered questions');
            
            loadQuestions = DbService.getAnsweredQuestions()
                .then((res) => {
                    console.info(`Returning ${res.length} answered question(s)`);

                    return res;
                });
            break;

        case QuestionTypes.Unanswered:
            console.info('Retrieving unanswered question');

            loadQuestions = DbService.getUnansweredQuestions()
                .then((res) => {
                    console.info(`Returning ${res.length} unanswered question(s)`);

                    return res;
                });
            break;
    }

    loadQuestions
        .then((res) => {
            response.json(res);
        })
        .catch((err) => {
            next(err);
        });
});

QuestionsController.get('/questions/:questionId(\\d+)', (request, response, next) => {
    const questionId = request.params.questionId;

    console.info(`Retrieving question with id ${questionId}`);

    DbService.getQuestion(questionId)
        .then((question) => {
            response.json(question);
        })
        .catch((err) => {
            if (err instanceof QuestionNotFoundError) {
                console.error(`Question with id ${questionId} not found`);
                response.sendStatus(404);
            } else {
                next(err);                
            }
        });
});

QuestionsController.post('/questions', (request, response, next) => {
    console.info('Posting a question. Data is: %j', request.body);

    const objectValidator = new jsonschema.Validator();
    const validationResult = objectValidator.validate(
        request.body,
        QuestionSchema
    );

    if (!validationResult.valid) {
        const validationErrorMessage = validationResult.errors[0].stack;
        console.error(`Bad request: ${validationErrorMessage}`);
        response.status(400).json({'error': validationErrorMessage});
    } else {
        const question = Object.assign({
            dateTimeAsked: moment.utc().toISOString() 
        }, request.body);

        DbService.insertQuestion(question)
            .then((question) => {
                const newQuestionURL = url.format({
                    protocol : request.protocol,
                    hostname : request.hostname,
                    port : port,
                    pathname : `${request.baseUrl !== '/' ?
                        request.baseUrl : ''}/questions/${question.id}`
                });

                response.setHeader('Location', newQuestionURL);
                response.sendStatus(201);

                console.info('New question has been posted. Data is: %j', question);
            })
            .catch((err) => {
                next(err);
            });
    }
});

QuestionsController.use(
    '/questions/:questionId(\\d+)/answers',
    AnswersController
);

export default QuestionsController;