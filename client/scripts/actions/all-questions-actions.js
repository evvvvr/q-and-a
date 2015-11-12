import ActionTypes from './ActionTypes';
import API from '../API';

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
    return function (dispatch, getState) {
        if (!getState().allQuestions.isFetching) {
            console.info('Retrieving all questions');

            dispatch(requestAllQuestions());

            API.fetchAllQuestions((err, res) => {
                if (res.ok) {
                    dispatch(recieveAllQuestions(res.body));                    
                }
            })
        }
    };
}