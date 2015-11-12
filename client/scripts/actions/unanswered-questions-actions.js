import ActionTypes from './ActionTypes';
import API from '../API';

export function showUnansweredQuestions() {
    return {
        type: ActionTypes.ShowUnansweredQuestions
    };
}

export function requestUnansweredQuestions() {
    return {
        type: ActionTypes.RequestUnansweredQuestions
    };
}

export function recieveUnansweredQuestions(questions) {
    return {
        type: ActionTypes.RecieveUnansweredQuestions,
        questions
    };
}

export function fetchUnansweredQuestions() {
    return function (dispatch, getState) {
        if (!getState().unansweredQuestions.isFetching) {
            console.info('Retrieving unanswered questions');

            dispatch(requestUnansweredQuestions());

            API.fetchUnansweredQuestions((err, res) => {
                if (res.ok) {
                    dispatch(recieveUnansweredQuestions(res.body));
                }
            })
        }
    };
}