import ActionTypes from './ActionTypes'
import API from '../API/API'
import { createAction } from 'redux-actions'

export const requestQuestion = createAction(
    ActionTypes.RequestQuestion,
    questionId => questionId
);

export const recieveQuestion = createAction(
    ActionTypes.RecieveQuestion,
    questionOrError => questionOrError
);

export function fetchQuestion(questionId) {
    return (dispatch, getState) => {
        if (!getState().question.isFetching) {
            console.info(`Retrieving question #${questionId}`);

            dispatch(requestQuestion(questionId));

            API.fetchQuestion(questionId)
                .then(question => dispatch(recieveQuestion(question)))
                .catch(error => {
                    console.error(`Error fetching question: ${error}`);

                    dispatch(recieveQuestion(error));
                });
        }
    };
}