import API from '../API';
import ActionTypes from './ActionTypes';
import { selectQuestion, fetchQuestion } from './question-actions';

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

export function submitAnswer(questionId, answer) {
   return function (dispatch, getState) {
        if (!getState().answer.isSubmitting) {
            console.info(`Submitting answer ${answer.text}
                as ${answer.user} for question #${questionId}`);

            dispatch(submittingAnswer(questionId, answer));

            API.submitAnswer(questionId, answer, (err, res) => {
                if (res.ok) {
                    dispatch(answerSubmitted(res.header['Location']));
                    dispatch(selectQuestion(questionId));
                    dispatch(fetchQuestion(questionId));                    
                }
            });
        }
    };
}