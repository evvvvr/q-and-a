import ActionTypes from './ActionTypes';
import API from '../API/API';
import { createAction } from 'redux-actions';

export const requestAllQuestions = createAction(ActionTypes.RequestAllQuestions);

export const recieveAllQuestions = createAction(
    ActionTypes.RecieveAllQuestions,
    questions => questions
);

export function fetchAllQuestions() {
    return (dispatch, getState) => {
        if (!getState().allQuestions.isFetching) {
            console.info('Retrieving all questions');

            dispatch(requestAllQuestions());
            
            return API.fetchAllQuestions()
                .then(allQuestions => dispatch(recieveAllQuestions(allQuestions)));
        }
    };
}