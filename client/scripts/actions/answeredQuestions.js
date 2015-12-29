import ActionTypes from './ActionTypes';
import API from '../API';
import { createAction } from 'redux-actions';

export const requestAnsweredQuestions = createAction(ActionTypes.RequestAnsweredQuestions);

export const recieveAnsweredQuestions = createAction(
    ActionTypes.RecieveAnsweredQuestions,
    questions => questions
);

export function fetchAnsweredQuestions() {
    return function (dispatch, getState) {
        if (!getState().answeredQuestions.isFetching) {
            console.info('Retrieving answered questions');

            dispatch(requestAnsweredQuestions());

            API.fetchAnsweredQuestions((err, res) => {
                if (res.ok) {
                    dispatch(recieveAnsweredQuestions(res.body));
                }
            });
        }        
    };
}