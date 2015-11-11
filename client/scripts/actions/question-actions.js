import ActionTypes from './ActionTypes';
import Data from '../mock/Data';
import { showAllQuestions, fetchAllQuestions } from './all-questions-actions';

export function selectQuestion(questionId) {
    return {
        type: ActionTypes.SelectQuestion,
        questionId
    };
}

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
    return function (dispatch) {
        console.info(`Retrieving question #${questionId}`);

        dispatch(requestQuestion(questionId));

        dispatch(recieveQuestion(Data.questionDetails));
    };
}

export function submittingQuestion(user, text) {
    return {
        type: ActionTypes.SubmittingQuestion,
        user,
        text
    };
}

export function questionSubmitted(linkToQuestion) {
    return {
        type: ActionTypes.QuestionSubmitted,
        linkToQuestion
    };
}

export function submitQuestion(user, text) {
    return function (dispatch) {
        console.info(`Submitting question ${text} as ${user}`);

        dispatch(submittingQuestion(user, text));

        dispatch(questionSubmitted('link to submitted question')); 

        dispatch(showAllQuestions());

        dispatch(fetchAllQuestions());
    };
}