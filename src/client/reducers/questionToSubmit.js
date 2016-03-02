import ActionTypes from '../actions/ActionTypes'
import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import { unpackErrors } from '../validation/ValidationError'

const defaultState = Immutable.fromJS({
    isSubmitting: false,
    data: {},
    errors: {}
});

const questionToSubmit = handleActions({
        [ActionTypes.QuestionUsernameChanged]:
            (state, action) => state.withMutations((state) =>
                state.setIn(
                        ['errors', 'user'],
                        action.error ? Immutable.fromJS(unpackErrors(action.payload)) : null)
                    .setIn(
                        ['data', 'user'],
                        action.error ? action.payload.value : action.payload
                    )
            ),

        [ActionTypes.QuestionTextChanged]:
            (state, action) => state.withMutations((state) =>
                state.setIn(
                        ['errors', 'text'],
                        action.error ? Immutable.fromJS(unpackErrors(action.payload)) : null)
                    .setIn(
                        ['data', 'text'],
                        action.error ? action.payload.value : action.payload
                    )
            ),

        [ActionTypes.SubmittingQuestion]:
            (state, action) => state.withMutations((state) => 
                state.set('isSubmitting', true)
                    .set('errors', Immutable.fromJS({}))
                    .set('data', Immutable.fromJS(action.payload))
            ),

        [ActionTypes.QuestionSubmitted]:
            (state, action) => state.withMutations((state) =>
                state.set('isSubmitting', false)
                    .set('errors', action.error ? Immutable.fromJS(unpackErrors(action.payload)) : Immutable.fromJS({}))
                    .set(
                        'data',
                        action.error ? Immutable.fromJS(action.payload.value) : Immutable.fromJS({})
                    )
            ),

        [ActionTypes.CleanQuestionToSubmit]:
            (state, action) => state.withMutations((state) =>
                state.set('isSubmitting', false)
                    .set('errors', Immutable.fromJS({}))
                    .set('data', Immutable.fromJS({}))
            )
    },
    defaultState
);

export default questionToSubmit