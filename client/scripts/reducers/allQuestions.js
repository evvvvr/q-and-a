import ActionTypes from '../actions/ActionTypes';

export default function allQuestions(state, action) {
   switch (action.type) {
        case ActionTypes.RequestAllQuestions:
            return Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            );

        case ActionTypes.RecieveAllQuestions:
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