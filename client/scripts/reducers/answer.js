import ActionTypes from '../actions/ActionTypes';
import { handleActions } from 'redux-actions';
import { unpackErrors } from '../validation/ValidationError';

const defaultState = {
    isSubmitting: false,
    errors: {},
    data: {}
};

const answer = handleActions({
        [ActionTypes.AnswerUsernameChanged]: (state, action) => (
            Object.assign(
                {},
                state,
                {
                    errors: Object.assign(
                        {},
                        state.errors,
                        {
                            user: action.error
                                ? unpackErrors(action.payload)
                                : null
                        }
                    ),
                    data: Object.assign(
                        {},
                        state.data,
                        {
                            user: action.error ? action.payload.value : action.payload
                        }
                    )
                }
            )
        ),

        [ActionTypes.AnswerTextChanged]: (state, action) => (
            Object.assign(
                {},
                state,
                {
                    errors: Object.assign(
                        {},
                        state.errors,
                        {
                            text: action.error
                                ? unpackErrors(action.payload)
                                : null
                        }
                    ),
                    data: Object.assign(
                        {},
                        state.data,
                        {
                            text: action.error ? action.payload.value : action.payload
                        }
                    )
                }
            )
        ),

        [ActionTypes.SubmittingAnswer]: (state, action) => (
            Object.assign(
                {},
                state,
                {
                    isSubmitting: true,
                    errors: {},
                    data: action.payload.answer
                }
            )
        ),

        [ActionTypes.AnswerSubmitted]: (state, action) => (
            Object.assign(
                {},
                state,
                {
                    isSubmitting: false,
                    errors: action.error ? unpackErrors(action.payload) : {},
                    data: action.error ? action.payload.value : {}
                }
            )
        ),

        [ActionTypes.CleanAnswer]: (state, action) => (
            Object.assign(
                {},
                state,
                {
                    isSubmitting: false,
                    errors: {},
                    data: {}
                }
            )
        )
    },
    defaultState
);

export default answer;