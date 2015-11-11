import allQuestions from './allQuestions';
import answer from './answer';
import answeredQuestions from './answeredQuestions';
import question from './question';
import screenType from './screenType';
import unansweredQuestions from './unansweredQuestions';

export default function reducer(state, action) {
    return {
        screenType: screenType(state.screenType, action),
        allQuestions: allQuestions(state.allQuestions, action),
        answeredQuestions: answeredQuestions(state.answeredQuestions, action),
        unansweredQuestions: unansweredQuestions(state.unansweredQuestions, action),
        question: question(state.question, action),
        answer: answer(state.answer, action)
    };
};