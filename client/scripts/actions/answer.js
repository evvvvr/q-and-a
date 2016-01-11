import ActionTypes from './ActionTypes';
import API from '../API/API';
import { createAction } from 'redux-actions';
import { fetchQuestion } from './question';
import { validateUsername, validateText, validateAnswer } from '../validation/validators';

export function changeAnswerUsername(username) {
    return (dispatch) => {
        const validationError = validateUsername(username);

        dispatch(
            answerUsernameChanged(validationError ? validationError : username)
        );
    }
}

export function changeAnswerText(text) {
    return (dispatch) => {
        const validationError = validateText(text);

        dispatch(
            answerTextChanged(validationError ? validationError : text)
        );
    }
}

export function submitAnswer(questionId, answer) {
   return (dispatch, getState) => {
        if (!getState().answer.isSubmitting) {
            const validationError = validateAnswer(answer);

            if (validationError) {
                dispatch(answerSubmitted(validationError));
            } else {
                console.info(`Submitting answer ${answer.text}`
                    + ` as ${answer.user} for question #${questionId}`);

                dispatch(submittingAnswer(questionId, answer));

                API.submitAnswer(questionId, answer)
                    .then((response) => {
                        if (response.ok) {
                            dispatch(answerSubmitted(response.headers['Location']));
                            dispatch(fetchQuestion(questionId));                            
                        }
                    });
            }
        }
    };
}

const answerUsernameChanged = createAction(
    ActionTypes.AnswerUsernameChanged,
    userOrError => userOrError 
);

const answerTextChanged = createAction(
    ActionTypes.AnswerTextChanged,
    textOrError => textOrError
);

const submittingAnswer = createAction(
    ActionTypes.SubmittingAnswer,
    (questionId, answer) => ({
        questionId,
        answer
    })
);

const answerSubmitted = createAction(
    ActionTypes.AnswerSubmitted,
    linkToAnswerOrError => linkToAnswerOrError
);

export const cleanAnswer = createAction(ActionTypes.CleanAnswer);