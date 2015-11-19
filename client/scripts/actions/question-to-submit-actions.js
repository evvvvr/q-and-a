import ActionTypes from './ActionTypes';
import API from '../API';
import { showAllQuestions, fetchAllQuestions } from './all-questions-actions';
import { validateQuestion } from '../validation/validators';

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