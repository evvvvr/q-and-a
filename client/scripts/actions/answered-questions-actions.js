import ActionTypes from './ActionTypes';
import Data from '../mock/Data';

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
    return function (dispatch) {
        console.info('Retrieving answered questions');

        dispatch(requestAnsweredQuestions());

        dispatch(recieveAnsweredQuestions(Data.answeredQuestions));
    };
}