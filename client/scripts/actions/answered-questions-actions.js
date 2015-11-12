import ActionTypes from './ActionTypes';
import API from '../API';

export function showAnsweredQuestions() {
    return {
        type: ActionTypes.ShowAnsweredQuestions
    };
}

export function requestAnsweredQuestions() {
    return {
        type: ActionTypes.RequestAnsweredQuestions
    };
}

export function recieveAnsweredQuestions(questions) {
    return {
        type: ActionTypes.RecieveAnsweredQuestions,
        questions
    };
}

export function fetchAnsweredQuestions() {
    return function (dispatch, getState) {
        if (!getState().answeredQuestions.isFetching) {
            console.info('Retrieving answered questions');

            dispatch(requestAnsweredQuestions());

            API.fetchAnsweredQuestions((err, res) => {
                if (res.ok) {
                    dispatch(recieveAnsweredQuestions(res.body));
                }
            })
        }        
    };
}