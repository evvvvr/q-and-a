import ActionTypes from '../actions/ActionTypes';
import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const defaultState = Immutable.fromJS({
    isFetching: false,
    items: []
});

const allQuestions = handleActions({
        [ActionTypes.RequestAllQuestions]:
            (state, action) => state.set('isFetching', true),

        [ActionTypes.RecieveAllQuestions]:
            (state, action) => state.withMutations(state => {
                state.set('isFetching', false)
                    .set('items', Immutable.fromJS(action.payload));
            })
    },
    defaultState
);

export default allQuestions;