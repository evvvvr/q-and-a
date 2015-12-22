import ActionTypes from '../actions/ActionTypes';

const defaultState = {
    isFetching: false,
    data: {}
};

export default function question(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.SelectQuestion:
            return Object.assign(
                {},
                state,
                {
                    data: {
                        id: action.questionId
                    }
                }
            );

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