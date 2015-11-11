import ActionTypes from '../actions/ActionTypes';

export default function question(state, action) {
    switch (action.type) {
        case ActionTypes.RequestQuestion:
            return Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            );

        case ActionTypes.RecieveQuestion:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    data: action.question
                }
            );

        default:
            return state;
    }
}