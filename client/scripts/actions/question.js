import ActionTypes from './ActionTypes';
import API from '../API';

export function requestQuestion(questionId) {
    return {
        type: ActionTypes.RequestQuestion,
        questionId
    };
}

export function recieveQuestionSuccessfuly(question) {
    return {
        type: ActionTypes.RecieveQuestion,
        question
    };
}

export function recieveQuestionFaulty(error) {
    return {
        type: ActionTypes.RecieveQuestion,
        error
    };
}

export function fetchQuestion(questionId) {
    return function (dispatch, getState) {
        if (!getState().question.isFetching) {
            console.info(`Retrieving question #${questionId}`);

            dispatch(requestQuestion(questionId));

            API.fetchQuestion(questionId, (err, res) => {
                if (res.ok) {
                    dispatch(recieveQuestionSuccessfuly(res.body));
                } else if (res.error) {
                    console.error(`Error fetching question: ${res.error}`);

                    dispatch(recieveQuestionFaulty(res.error));
                }
            });
        }
    };
}