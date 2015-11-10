import answer from './answer';
import question from './question';
import questions from './questions';
import screenType from './screenType';

export default function reducer(state, action) {
    return {
        screenType: screenType(state.screenType, action),
        questions: questions(state.questions, action),
        question: question(state.question, action),
        answer: answer(state.answer, action)
    };
};