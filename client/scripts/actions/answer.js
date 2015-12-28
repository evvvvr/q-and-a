import ActionTypes from './ActionTypes';
import API from '../API';
import { fetchQuestion } from './question';
import { validateUsername, validateText, validateAnswer } from '../validation/validators';

export function changeAnswerUsername(userName) {
    return (dispatch) =>
        dispatch(answerUsernameChanged(userName, validateUsername(userName)));
}

export function changeAnswerText(text) {
    return (dispatch) =>
        dispatch(answerTextChanged(text, validateText(text)));
}

export function submitAnswer(questionId, answer) {
   return function (dispatch, getState) {
        if (!getState().answer.isSubmitting) {
            console.info(`Submitting answer ${answer.text}
                as ${answer.user} for question #${questionId}`);

            const validationErrors = validateAnswer(answer);

            if (validationErrors.user.length > 0
                || validationErrors.text.length > 0) {
                dispatch(
                    answerValidationFailed(answer, validationErrors));
            } else {
                dispatch(submittingAnswer(questionId, answer));

                API.submitAnswer(questionId, answer, (err, res) => {
                    if (res.ok) {
                        dispatch(answerSubmitted(res.header['Location']));
                        dispatch(fetchQuestion(questionId));               
                    }
                });
            }
        }
    };
}

function answerUsernameChanged(user, errors) {
    return {
        type: ActionTypes.AnswerUsernameChanged,
        user,
        errors
    };
}

function answerTextChanged(text, errors) {
    return {
        type: ActionTypes.AnswerTextChanged,
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