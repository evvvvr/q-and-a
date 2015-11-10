import ActionTypes from '../ActionTypes';
import ScreenTypes from '../ScreenTypes';

export default function screenType(state, action) {
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

        case ActionTypes.SubmitQuestion:
            return ScreenTypes.Questions;

        default:
            return state;
    }
}