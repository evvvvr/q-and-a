import ActionTypes from './ActionTypes';
import API from '../API';
import { createAction } from 'redux-actions';

export const requestQuestion = createAction(
    ActionTypes.RequestQuestion,
    questionId => questionId
);

export const recieveQuestion = createAction(
    ActionTypes.RecieveQuestion,
    questionOrError => questionOrError
);

export function fetchQuestion(questionId) {
    return function (dispatch, getState) {
        if (!getState().question.isFetching) {
            console.info(`Retrieving question #${questionId}`);

            dispatch(requestQuestion(questionId));

            API.fetchQuestion(questionId, (err, res) => {
                if (res.ok) {
                    dispatch(recieveQuestion(res.body));
                } else if (res.error) {
                    console.error(`Error fetching question: ${res.error}`);

                    dispatch(recieveQuestion(res.error));
                }
            });
        }
    };
}