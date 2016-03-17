import AppDefaults from '../AppDefaults'
import DbService from '../DbService'
import express from 'express'
import jsonschema from 'jsonschema'
import moment from 'moment'
import QuestionNotFoundError from '../QuestionNotFoundError'
import url from 'url'
import { AnswerSchema } from '../json-schemas'

const port = process.env.PORT || AppDefaults.Port;

const AnswersController = express.Router({
    mergeParams: true
});

AnswersController.post('/', (request, response, next) => {
    const questionId = request.params.questionId;

    console.info(`Posting an answer for question with id ${questionId}.`
        + ` Data is: %j`, request.body);

    const objectValidator = new jsonschema.Validator();
    const validationResult = objectValidator.validate(request.body, AnswerSchema);

    if (!validationResult.valid) {
        const validationErrorMessage = validationResult.errors[0].stack;

        console.error(`Bad request: ${validationErrorMessage}`);
        response.status(400).json({'error': validationErrorMessage});
    } else {
        const answer = Object.assign({
            dateTimeAnswered: moment.utc().toISOString()
        }, request.body);

        DbService.insertAnswer(questionId, answer)
            .then((answer) => {
                response.sendStatus(201);

                console.info(`Answer for question with id ${questionId} has been posted.`
                    + ` Data is: %j`, answer);
            })
            .catch((err) => {
                if (err instanceof QuestionNotFoundError) {
                    console.error(`Question with id ${questionId} not found`);
                    response.sendStatus(404);
                } else {
                    next(err);
                }
            });
    }
});

export default AnswersController;