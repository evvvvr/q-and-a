import ActionTypes from '../ActionTypes';
import Data from '../mock/Data';
import moment from 'moment';

function submitQuestion (questions, action) {
    console.info(`Submitting question ${action.text} as ${action.user}`);

    const newQuestions = questions;
    const maxQuestionId = Math.max.apply(
        null,
        newQuestions.map(question => question.id)
    );

    const newQuestion = {
        id: maxQuestionId + 1,
        user: action.user,
        text: action.text,
        dateTimeAsked: moment.utc().format('YYYY-MM-DD hh:mm:ss'),
        answers: []
    };

    newQuestions.push(newQuestion);

    return newQuestions;
};

export default function questions(state, action) {
    switch (action.type) {
        case ActionTypes.ShowAllQuestions:
            return Data.allQuestions;

        case ActionTypes.ShowAnsweredQuestions:
            return Data.answeredQuestions;

        case ActionTypes.ShowUnansweredQuestions:
            return Data.unansweredQuestions;

        case ActionTypes.SubmitQuestion:
            return submitQuestion(state, action);

        default:
            return state;
    }
}