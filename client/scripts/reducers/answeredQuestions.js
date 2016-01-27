import ActionTypes from '../actions/ActionTypes'
import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

const defaultState = Immutable.fromJS({
    isFetching: false,
    items: []
});

const answeredQuestions = handleActions({
        [ActionTypes.RequestAnsweredQuestions]:
            (state, action) => state.set('isFetching', true),

        [ActionTypes.RecieveAnsweredQuestions]:
            (state, action) => state.withMutations((state) =>
                state.set('isFetching', false)
                    .set('items', Immutable.fromJS(action.payload))
            )
    },
    defaultState
);

export default answeredQuestions