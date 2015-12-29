import ActionTypes from './ActionTypes';
import API from '../API';
import { createAction } from 'redux-actions';

export const requestAllQuestions = createAction(ActionTypes.RequestAllQuestions);

export const recieveAllQuestions = createAction(
    ActionTypes.RecieveAllQuestions,
    questions => questions
);

export function fetchAllQuestions() {
    return function (dispatch, getState) {
        if (!getState().allQuestions.isFetching) {
            console.info('Retrieving all questions');

            dispatch(requestAllQuestions());

            API.fetchAllQuestions((err, res) => {
                if (res.ok) {
                    dispatch(recieveAllQuestions(res.body));                    
                }
            });
        }
    };
}