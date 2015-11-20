import ActionTypes from './ActionTypes';
import API from '../API';
import { showAllQuestions, fetchAllQuestions } from './all-questions-actions';
import { validateUsername, validateText, validateQuestion } from '../validation/validators';

export function changeQuestionUsername(userName) {
    return (dispatch) =>
        dispatch(questionUsernameChanged(userName, validateUsername(userName)));
}

export function changeQuestionText(text) {
    return (dispatch) =>
        dispatch(questionTextChanged(text, validateText(text)));
}

export function submitQuestion(question) {
    return (dispatch, getState) => {
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
     
                console.log('submitting question');
                API.submitQuestion(question, (err, res) => {
                    if (res.ok) {
                        console.log('submitting question ok');
                        dispatch(questionSubmitted(res.header['Location']));
                        dispatch(showAllQuestions());
                        dispatch(fetchAllQuestions());                    
                    }
                });
            }
        }
    };
}

function questionUsernameChanged(user, errors) {
    return {
        type: ActionTypes.QuestionUsernameChanged,
        user,
        errors
    };
}

function questionTextChanged(text, errors) {
    return {
        type: ActionTypes.QuestionTextChanged,
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