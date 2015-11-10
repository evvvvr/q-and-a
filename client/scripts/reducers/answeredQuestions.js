import ActionTypes from '../actions/ActionTypes';

export default function answeredQuestions(state, action) {
   switch (action.type) {
        case ActionTypes.RequestAnsweredQuestions:
            return Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            );

        case ActionTypes.RecieveAnsweredQuestions:
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