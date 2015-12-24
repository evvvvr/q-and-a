import ActionTypes from '../actions/ActionTypes';

const defaultState = {
    isFetching: false,
    items: []
};

export default function allQuestions(state = defaultState, action) {
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