import ActionTypes from './ActionTypes';

export function showAllQuestions() {
    return {
        type: ActionTypes.ShowAllQuestions
    };
}

export function showAnsweredQuestions() {
    return {
        type: ActionTypes.ShowAnsweredQuestions
    };
}

export function showUnansweredQuestions() {
    return {
        type: ActionTypes.ShowUnansweredQuestions
    };
}

export function showAskForm() {
    return {
        type: ActionTypes.ShowAskForm
    };
}

export function selectQuestion(questionId) {
    return {
        type: ActionTypes.SelectQuestion,
        questionId: questionId
    };
}

export function submitQuestion(user, text) {
    return {
        type: ActionTypes.SubmitQuestion,
        user: user,
        text: text
    };
}

export function submitAnswer(questionId, user, text) {
    return {
        type: ActionTypes.SubmitAnswer,
        questionId: questionId, 
        user: user,
        text: text
    };
}