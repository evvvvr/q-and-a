import ActionTypes from '../actions/ActionTypes';
import Data from '../mock/Data';
import Immutable from 'immutable';
import moment from 'moment';

function submitQuestion (questions, action) {
    console.info(`Submitting question ${action.text} as ${action.user}`);

    const maxQuestionId = Math.max.apply(
        null,
        questions.map(question => question.id)
    );

    const newQuestion = {
        id: maxQuestionId + 1,
        user: action.user,
        text: action.text,
        dateTimeAsked: moment.utc().format('YYYY-MM-DD hh:mm:ss'),
        answers: []
    };

    let newQuestions = Immutable.List(Data.allQuestions);
    newQuestions = newQuestions.push(newQuestion);

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