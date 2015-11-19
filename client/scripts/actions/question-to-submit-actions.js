import ActionTypes from './ActionTypes';
import API from '../API';
import { showAllQuestions, fetchAllQuestions } from './all-questions-actions';
import { validateUserName, validateText, validateQuestion } from '../validation/validators';

export function showAskForm() {
    return {
        type: ActionTypes.ShowAskForm
    };
}

export function questionChanged(question) {
    return {
        type: ActionTypes.QuestionChanged,
        question
    }
}

export function validateQuestionUserName(userName) {
    return (dispatch) => {
        dispatch(
            questionUserNameValidationEnded(userName, validateUserName(userName)));
    };
}

export function validateQuestionText(text) {
    return (dispatch) => {
        dispatch(
            questionTextValidationEnded(text, validateText(text)));
    };   
}

export function submitQuestion(question) {
    return function (dispatch, getState) {
        if (!getState().questionToSubmit.isSubmitting) {
            console.info(`Submitting question ${question.text}
                as ${question.user}`);

            const validationErrors = validateQuestion(question); 

            if (validationErrors.user.length > 0
                || validationErrors.text.length > 0) {
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

function questionUserNameValidationEnded(userName, errors) {
    return {
        type: ActionTypes.QuestionUserNameValidationEnded,
        userName,
        errors
    };
}

function questionTextValidationEnded(text, errors) {
    return {
        type: ActionTypes.QuestionTextValidationEnded,
        text,
        errors
    };
}

function questionValidationFailed(question, errors) {
    return {
        type: ActionTypes.QuestionValidationFailed,
        question,
        errors
    };
}

function submittingQuestion(question) {
    return {
        type: ActionTypes.SubmittingQuestion,
        question
    };
}

function questionSubmitted(linkToQuestion) {
    return {
        type: ActionTypes.QuestionSubmitted,
        linkToQuestion
    };
}