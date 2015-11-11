import ActionTypes from './ActionTypes';
import { selectQuestion, fetchQuestion } from './question-actions';

export function answerChanged(user, text) {
    return {
        type: ActionTypes.AnswerChanged,
        user,
        text
    };
}

export function submittingAnswer(questionId, user, text) {
    return {
        type: ActionTypes.SubmittingAnswer,
        questionId,
        user,
        text
    };
}

export function answerSubmitted() {
    return {
        type: ActionTypes.AnswerSubmitted,
    };
}

export function submitAnswer(questionId, user, text) {
    return function (dispatch) {
        console.info(`Submitting answer ${text} as ${user}
            for question #${questionId}`);

        dispatch(submittingAnswer(questionId, user, text));

        dispatch(answerSubmitted()); 

        dispatch(selectQuestion(questionId));

        dispatch(fetchQuestion(questionId));
    };
}