import ActionTypes from '../actions/ActionTypes';

export default function unansweredQuestions(state, action) {
   switch (action.type) {
        case ActionTypes.RequestUnansweredQuestions:
            return Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            );

        case ActionTypes.RecieveUnansweredQuestions:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    items: action.questions
                }
            );

        default:
            return state;
    }
}