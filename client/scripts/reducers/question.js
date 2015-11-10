import ActionTypes from '../ActionTypes';
import Data from '../mock/Data';
import moment from 'moment';

function submitAnswer(question, action) {
    console.info(`Submitting answer ${action.text} as ${action.user}
        for question #${action.questionId}`);

    const newQuestion = question;
    const newAnswers = question.answers;
    const maxAnswerId = Math.max.apply(
        null,
        newAnswers.map(answer => answer.id)
    );

    const newAnswer = {
        id: maxAnswerId + 1,
        user: action.user,
        text: action.text,
        dateTimeAnswered: moment.utc().format('YYYY-MM-DD hh:mm:ss')
    };

    newAnswers.push(newAnswer);
    newQuestion.answers = newAnswers;

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