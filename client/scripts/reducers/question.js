import ActionTypes from '../actions/ActionTypes';
import Data from '../mock/Data';
import Immutable from 'immutable';
import moment from 'moment';

function submitAnswer(question, action) {
    console.info(`Submitting answer ${action.text} as ${action.user}
        for question #${action.questionId}`);

    const maxAnswerId = Math.max.apply(
        null,
        question.answers.map(answer => answer.id)
    );

    const newAnswer = {
        id: maxAnswerId + 1,
        user: action.user,
        text: action.text,
        dateTimeAnswered: moment.utc().format('YYYY-MM-DD hh:mm:ss')
    };

    const newQuestion = {
        ...question
    };

    let newAnswers = Immutable.List(question.answers);
    newQuestion.answers = newAnswers.push(newAnswer);

    return newQuestion; 
};

export default function question(state, action) {
    switch (action.type) {
        case ActionTypes.SelectQuestion:
            return Data.questionDetails;

        case ActionTypes.SubmitAnswer:
            return submitAnswer(state, action);

        default:
            return state;
    } 
}