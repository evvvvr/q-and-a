import ActionTypes from '../actions/ActionTypes';
import Immutable from 'immutable';
import { fromJSToImmutableGreedy }  from '../util/fromJSToImmutableGreedy'; 
import { handleActions } from 'redux-actions';

const defaultState = Immutable.fromJS({
    isFetching: false,
    data: null,
    error: null
});

const question = handleActions({
        [ActionTypes.RequestQuestion]:
            (state, action) => state.withMutations((state) =>
                state.set('isFetching', true)
                    .set('error', null)
            ),

        [ActionTypes.RecieveQuestion]:
            (state, action) => state.withMutations((state) =>
                state.set('isFetching', false)
                    .set('data', action.error ? null : Immutable.fromJS(action.payload))
                    .set('error', action.error ? fromJSToImmutableGreedy(action.payload) : null)
            )
    },
    defaultState
);

export default question;