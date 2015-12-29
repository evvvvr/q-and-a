import ActionTypes from '../actions/ActionTypes';
import { handleActions } from 'redux-actions';

const defaultState = {
    isFetching: false,
    items: []
};

const unansweredQuestions = handleActions({
        [ActionTypes.RequestUnansweredQuestions]: (state, action) => (
            Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            )
        ),

        [ActionTypes.RecieveUnansweredQuestions]: (state, action) => (
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

export default unansweredQuestions;