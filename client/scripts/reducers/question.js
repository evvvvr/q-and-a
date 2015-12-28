import ActionTypes from '../actions/ActionTypes';

const defaultState = {
    isFetching: false,
    data: {}
};

export default function question(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.RequestQuestion:
            return Object.assign(
                {},
                state,
                {
                    isFetching: true,
                    error: null
                }
            );

        case ActionTypes.RecieveQuestion:
            return Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    data: action.question,
                    error: action.error
                }
            );

        default:
            return state;
    }
}