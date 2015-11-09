import ActionTypes from './ActionTypes';
import Data from './mock/Data';
import moment from 'moment';
import ScreenTypes from './ScreenTypes';

const actionToReducer = new Map();

actionToReducer.set(ActionTypes.ShowAllQuestions, (state, action) => (
    {
        screenType: ScreenTypes.Questions,
        questions: Data.allQuestions,
        question: state.question
    }
));

actionToReducer.set(ActionTypes.ShowAnsweredQuestions, (state, action) => (
    {
        screenType: ScreenTypes.Answered,
        questions: Data.answeredQuestions,
        question: state.question
    }
));

actionToReducer.set(ActionTypes.ShowUnansweredQuestions, (state, action) => (
    {
        screenType: ScreenTypes.Unanswered,
        questions: Data.unansweredQuestions,
        question: state.question
    }
));

actionToReducer.set(ActionTypes.ShowAskForm, (state, action) => (
    {
        screenType: ScreenTypes.AskQuestion,
        questions: state.questions,
        question: state.question
    }
));

actionToReducer.set(ActionTypes.SelectQuestion, (state, action) => {
    console.info(`Question #${action.questionId} selected`);

    return {
        screenType: ScreenTypes.Question,
        questions: state.questions,
        question: Data.questionDetails
    };
});

actionToReducer.set(ActionTypes.SubmitQuestion, (state, action) => {
    console.info(`Submitting question ${action.text} as ${action.user}`);

    const newQuestions = state.questions;
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

    return {
        screenType: ScreenTypes.Questions,
        questions: newQuestions,
        question: state.question
    };
});

actionToReducer.set(ActionTypes.SubmitAnswer, (state, action) => {
    console.info(`Submitting answer ${action.text} as ${action.user}
        for question #${action.questionId}`);

    const newAnswers = state.question.answers;
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

    return {
        screenType: ScreenTypes.Question,
        questions: state.questions,
        question: {
            id: state.question.id,
            text: state.question.text,
            dateTimeAsked: state.question.dateTimeAsked,
            answers: newAnswers
        }
    };
});

export default function reducer(state, action) {
    const actualReducer = actionToReducer.get(action.type);

    if (actualReducer) {
        return actualReducer(state, action);
    } else {
        return state;
    }
};