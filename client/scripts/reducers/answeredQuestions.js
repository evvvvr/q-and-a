import ActionTypes from '../actions/ActionTypes';
import { handleActions } from 'redux-actions';

const defaultState = {
    isFetching: false,
    items: []
};

const answeredQuestions = handleActions({
        [ActionTypes.RequestAnsweredQuestions]: (state, action) => (
            Object.assign(
                {},
                state,
                {
                    isFetching: true
                }
            )
        ),

        [ActionTypes.RecieveAnsweredQuestions]: (state, action) => ( 
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

export default answeredQuestions;