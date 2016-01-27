import ActionTypes from './ActionTypes'
import API from '../API/API'
import { createAction } from 'redux-actions'

export const requestAnsweredQuestions = createAction(ActionTypes.RequestAnsweredQuestions);

export const recieveAnsweredQuestions = createAction(
    ActionTypes.RecieveAnsweredQuestions,
    questions => questions
);

export function fetchAnsweredQuestions() {
    return (dispatch, getState) => {
        if (!getState().answeredQuestions.isFetching) {
            console.info('Retrieving answered questions');

            dispatch(requestAnsweredQuestions());

            return API.fetchAnsweredQuestions()
                .then((answeredQuestions) => dispatch(recieveAnsweredQuestions(answeredQuestions)));
        }
    };
}