import ActionTypes from './ActionTypes';
import API from '../API/API';
import { createAction } from 'redux-actions';
import { pushPath } from 'redux-simple-router';
import { validateUsername, validateText, validateQuestion } from '../validation/validators';

export function changeQuestionUsername(username) {
    return (dispatch) => {
        const validationError = validateUsername(username);

        dispatch(
            questionUsernameChanged(validationError ? validationError : username)
        );
    }
}

export function changeQuestionText(text) {
    return (dispatch) => {
        const validationError = validateText(text);

        dispatch(
            questionTextChanged(validationError ? validationError : text)
        );
    }
}

export function submitQuestion(question) {
    return (dispatch, getState) => {
        if (!getState().questionToSubmit.isSubmitting) {
            const validationError = validateQuestion(question); 

            if (validationError) {
                dispatch(questionSubmitted(validationError));
            } else {
                console.info(`Submitting question ${question.text}`
                    + ` as ${question.user}`);

                dispatch(submittingQuestion(question));
     
                API.submitQuestion(question)
                    .then((response) => {
                        if (response.ok) {
                            dispatch(questionSubmitted(response.headers['Location']));
                            dispatch(pushPath('/'));
                        }
                    });
            }
        }
    };
}

const questionUsernameChanged = createAction(
    ActionTypes.QuestionUsernameChanged,
    usernameOrError => usernameOrError
);

const questionTextChanged = createAction(
    ActionTypes.QuestionTextChanged,
    textOrError => textOrError
);

const submittingQuestion = createAction(
    ActionTypes.SubmittingQuestion,
    question => question
);

const questionSubmitted = createAction(
    ActionTypes.QuestionSubmitted, 
    linkToQuestionOrError => linkToQuestionOrError
);

export const cleanQuestionToSubmit = createAction(ActionTypes.CleanQuestionToSubmit);