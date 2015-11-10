import ActionTypes from './ActionTypes';
import Data from '../mock/Data';

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
    return function (dispatch) {
        console.info('Retrieving unanswered questions');

        dispatch(requestUnansweredQuestions());

        dispatch(recieveUnansweredQuestions(Data.unansweredQuestions));
    };
}