import allQuestions from './allQuestions';
import answer from './answer';
import answeredQuestions from './answeredQuestions';
import question from './question';
import questionToSubmit from './questionToSubmit';
import unansweredQuestions from './unansweredQuestions';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
    allQuestions,
    answeredQuestions,
    unansweredQuestions,
    question,
    questionToSubmit,
    answer
});

export default appReducer;