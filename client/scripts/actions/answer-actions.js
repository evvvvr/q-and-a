import ActionTypes from './ActionTypes';
import API from '../API';
import { selectQuestion, fetchQuestion } from './question-actions';
import { validateAnswer } from '../validation/validators';

export function answerChanged(answer) {
    return {
        type: ActionTypes.AnswerChanged,
        answer
    };
}

export function submittingAnswer(questionId, answer) {
    return {
        type: ActionTypes.SubmittingAnswer,
        questionId,
        answer
    };
}

export function answerSubmitted(linkToAnswer) {
    return {
        type: ActionTypes.AnswerSubmitted,
        linkToAnswer
    };
}

export function answerValidationFailed(answer, validationErrors) {
    return {
        type: ActionTypes.AnswerValidationFailed,
        answer,
        validationErrors
    };
}

export function submitAnswer(questionId, answer) {
   return function (dispatch, getState) {
        if (!getState().answer.isSubmitting) {
            console.info(`Submitting answer ${answer.text}
                as ${answer.user} for question #${questionId}`);

            const validationErrors = validateAnswer(answer);

            if (validationErrors.length > 0) {
                dispatch(
                    answerValidationFailed(answer, validationErrors));
            } else {
                dispatch(submittingAnswer(questionId, answer));

                API.submitAnswer(questionId, answer, (err, res) => {
                    if (res.ok) {
                        dispatch(answerSubmitted(res.header['Location']));
                        dispatch(selectQuestion(questionId));
                        dispatch(fetchQuestion(questionId));                    
                    }
                });
            }
        }
    };
}