import API from '../API';
import ActionTypes from './ActionTypes';
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

export function submittingQuestion(question) {
    return {
        type: ActionTypes.SubmittingQuestion,
        question
    };
}

export function questionSubmitted(linkToQuestion) {
    return {
        type: ActionTypes.QuestionSubmitted,
        linkToQuestion
    };
}

export function submitQuestion(question) {
    return function (dispatch, getState) {
        if (!getState().questionToSubmit.isSubmitting) {
            console.info(`Submitting question ${question.text}
                as ${question.user}`);

            dispatch(submittingQuestion(question));
 
            API.submitQuestion(question, (err, res) => {
                if (res.ok) {
                    dispatch(questionSubmitted(res.header['Location']));
                    dispatch(showAllQuestions());
                    dispatch(fetchAllQuestions());                    
                }
            });
        }
    };
}