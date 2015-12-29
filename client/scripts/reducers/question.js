import ActionTypes from '../actions/ActionTypes';
import { handleActions } from 'redux-actions';

const defaultState = {
    isFetching: false,
    data: {}
};

const question = handleActions({
        [ActionTypes.RequestQuestion]: (state, action) => (
            Object.assign(
                {},
                state,
                {
                    isFetching: true,
                    error: null
                }
            )
        ),

        [ActionTypes.RecieveQuestion]: (state, action) => (
            Object.assign(
                {},
                state,
                {
                    isFetching: false,
                    data: action.error ? null : action.payload,
                    error: action.error ? action.payload : null
                }
            )
        )
    },
    defaultState
);

export default question;