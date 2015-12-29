import ActionTypes from './ActionTypes';
import API from '../API';
import { createAction } from 'redux-actions';

export const requestUnansweredQuestions = createAction(ActionTypes.RequestUnansweredQuestions);

export const recieveUnansweredQuestions = createAction(
    ActionTypes.RecieveUnansweredQuestions,
    questions => questions
);

export function fetchUnansweredQuestions() {
    return function (dispatch, getState) {
        if (!getState().unansweredQuestions.isFetching) {
            console.info('Retrieving unanswered questions');

            dispatch(requestUnansweredQuestions());

            API.fetchUnansweredQuestions((err, res) => {
                if (res.ok) {
                    dispatch(recieveUnansweredQuestions(res.body));
                }
            });
        }
    };
}