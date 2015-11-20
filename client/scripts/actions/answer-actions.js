import ActionTypes from './ActionTypes';
import API from '../API';
import { selectanswer, fetchanswer } from './answer-actions';
import { validateUsername, validateText, validateAnswer } from '../validation/validators';

export function answerChanged(answer) {
    return {
        type: ActionTypes.AnswerChanged,
        answer
    };
}

export function validateAnswerUserName(userName) {
    return (dispatch) => {
        dispatch(
            answerUserNameValidationEnded(userName, validateUsername(userName)));
    };
}

export function validateAnswerText(text) {
    return (dispatch) => {
        dispatch(
            answerTextValidationEnded(text, validateText(text)));
    };   
}

export function submitAnswer(answerId, answer) {
   return function (dispatch, getState) {
        if (!getState().answer.isSubmitting) {
            console.info(`Submitting answer ${answer.text}
                as ${answer.user} for answer #${answerId}`);

            const validationErrors = validateAnswer(answer);

            if (validationErrors.user.length > 0
                || validationErrors.text.length > 0) {
                dispatch(
                    answerValidationFailed(answer, validationErrors));
            } else {
                dispatch(submittingAnswer(answerId, answer));

                API.submitAnswer(answerId, answer, (err, res) => {
                    if (res.ok) {
                        dispatch(answerSubmitted(res.header['Location']));
                        dispatch(selectanswer(answerId));
                        dispatch(fetchanswer(answerId));                    
                    }
                });
            }
        }
    };
}

function answerUserNameValidationEnded(userName, errors) {
    return {
        type: ActionTypes.AnswerUserNameValidationEnded,
        userName,
        errors
    };
}

function answerTextValidationEnded(text, errors) {
    return {
        type: ActionTypes.AnswerTextValidationEnded,
        text,
        errors
    };
}

function answerValidationFailed(answer, validationErrors) {
    return {
        type: ActionTypes.AnswerValidationFailed,
        answer,
        validationErrors
    };
}

function submittingAnswer(answerId, answer) {
    return {
        type: ActionTypes.SubmittingAnswer,
        answerId,
        answer
    };
}

function answerSubmitted(linkToAnswer) {
    return {
        type: ActionTypes.AnswerSubmitted,
        linkToAnswer
    };
}