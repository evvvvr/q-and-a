import ActionTypes from './ActionTypes';
import API from '../API';
import { showAllQuestions, fetchAllQuestions } from './all-questions-actions';
import { validateQuestion } from '../validation/validators';

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

export function questionValidationFailed(question, validationErrors) {
    return {
        type: ActionTypes.QuestionValidationFailed,
        question,
        validationErrors
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

            const validationErrors = validateQuestion(question); 

            if (validationErrors.length > 0) {
                dispatch(
                    questionValidationFailed(
                        question,
                        validationErrors
                ));
            } else {
                dispatch(submittingQuestion(question));
     
                API.submitQuestion(question, (err, res) => {
                    if (res.ok) {
                        dispatch(questionSubmitted(res.header['Location']));
                        dispatch(showAllQuestions());
                        dispatch(fetchAllQuestions());                    
                    }
                });
            }
        }
    };
}