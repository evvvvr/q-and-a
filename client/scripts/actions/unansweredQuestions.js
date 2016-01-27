import ActionTypes from './ActionTypes'
import API from '../API/API'
import { createAction } from 'redux-actions'

export const requestUnansweredQuestions = createAction(ActionTypes.RequestUnansweredQuestions);

export const recieveUnansweredQuestions = createAction(
    ActionTypes.RecieveUnansweredQuestions,
    questions => questions
);

export function fetchUnansweredQuestions() {
    return (dispatch, getState) => {
        if (!getState().unansweredQuestions.isFetching) {
            console.info('Retrieving unanswered questions');

            dispatch(requestUnansweredQuestions());

            return API.fetchUnansweredQuestions()
                .then(unansweredQuestions => dispatch(recieveUnansweredQuestions(unansweredQuestions)));
        }
    };
}