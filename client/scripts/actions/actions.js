import ActionTypes from './ActionTypes';

export function showAskForm() {
    return {
        type: ActionTypes.ShowAskForm
    };
}

export function selectQuestion(questionId) {
    return {
        type: ActionTypes.SelectQuestion,
        questionId
    };
}

export function changeAnswerText(text) {
    return {
        type: ActionTypes.ChangeAnswerText,
        text
    };    
}

export function changeAnswerUser(user) {
    return {
        type: ActionTypes.ChangeAnswerUser,
        user
    };    
}

export function submitAnswer(questionId, user, text) {
    return {
        type: ActionTypes.SubmitAnswer,
        questionId: questionId, 
        user,
        text
    };
}

export function submitQuestion(user, text) {
    return {
        type: ActionTypes.SubmitQuestion,
        user,
        text
    };
}