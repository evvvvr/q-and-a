import ActionTypes from '../actions/ActionTypes';
import ScreenTypes from '../ScreenTypes';

const defaultState = ScreenTypes.Questions;

export default function screenType(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.ShowAllQuestions:
            return ScreenTypes.Questions;

        case ActionTypes.ShowAnsweredQuestions:
            return ScreenTypes.Answered;

        case ActionTypes.ShowUnansweredQuestions:
            return ScreenTypes.Unanswered;

        case ActionTypes.SelectQuestion:
            return ScreenTypes.Question;

        case ActionTypes.ShowAskForm:
            return ScreenTypes.AskQuestion;

        default:
            return state;
    }
}