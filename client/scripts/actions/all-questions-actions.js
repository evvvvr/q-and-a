import ActionTypes from './ActionTypes';
import Data from '../mock/Data';

export function showAllQuestions() {
    return {
        type: ActionTypes.ShowAllQuestions
    };
}

export function requestAllQuestions() {
    return {
        type: ActionTypes.RequestAllQuestions
    };
}

export function recieveAllQuestions(questions) {
    return {
        type: ActionTypes.RecieveAllQuestions,
        questions
    };
}

export function fetchAllQuestions() {
    return function (dispatch) {
        console.info('Retrieving all questions');

        dispatch(requestAllQuestions());

        dispatch(recieveAllQuestions(Data.allQuestions));
    };
}