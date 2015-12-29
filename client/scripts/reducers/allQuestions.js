import ActionTypes from '../actions/ActionTypes';
import { handleActions } from 'redux-actions';

const defaultState = {
    isFetching: false,
    items: []
};

const allQuestions = handleActions({
        [ActionTypes.RequestAllQuestions]: (state, action) => (
            Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            )
        ),

        [ActionTypes.RecieveAllQuestions]: (state, action) => (
            Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    items: action.payload
                }
            )
        )
    },
    defaultState
);

export default allQuestions;