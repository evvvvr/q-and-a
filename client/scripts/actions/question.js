import ActionTypes from './ActionTypes';
import API from '../API';

export function requestQuestion(questionId) {
    return {
        type: ActionTypes.RequestQuestion,
        questionId
    };
}

export function recieveQuestion(question) {
    return {
        type: ActionTypes.RecieveQuestion,
        question
    };
}

export function fetchQuestion(questionId) {
    return function (dispatch, getState) {
        if (!getState().question.isFetching) {
            console.info(`Retrieving question #${questionId}`);

            dispatch(requestQuestion(questionId));

            API.fetchQuestion(questionId, (err, res) => {
                if (res.ok) {
                    dispatch(recieveQuestion(res.body));                    
                }
            });
        }
    };
}