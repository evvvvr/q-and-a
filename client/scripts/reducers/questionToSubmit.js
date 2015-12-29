import ActionTypes from '../actions/ActionTypes';
import { handleActions } from 'redux-actions';
import { unpackErrorsFromList, unpackErrorsFromMap } from '../validation/ValidationError';

const defaultState = {
    isSubmitting: false,
    errors: {},
    data: {}
};

const questionToSubmit = handleActions({
        [ActionTypes.QuestionUsernameChanged]: (state, action) => (
            Object.assign(
                {},
                state,
                {
                    errors: Object.assign(
                        {},
                        state.errors,
                        {
                            user: action.error
                                ? unpackErrorsFromList(action.payload)
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

        [ActionTypes.QuestionTextChanged]: (state, action) => (
            Object.assign(
                {},
                state,
                {
                    errors: Object.assign(
                        {},
                        state.errors,
                        {
                            text: action.error
                                ? unpackErrorsFromList(action.payload)
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

        [ActionTypes.SubmittingQuestion]: (state, action) => (
            Object.assign(
                {},
                state,
                {
                    isSubmitting: true,
                    errors: {},
                    data: action.payload
                }
            )
        ),

        [ActionTypes.QuestionSubmitted]: (state, action) => (
            Object.assign(
                {},
                state,
                {
                    isSubmitting: false,
                    errors: action.error ? unpackErrorsFromMap(action.payload) : {},
                    data: action.error ? action.payload.value : {}
                }
            )
        ),

        [ActionTypes.CleanQuestionToSubmit]: (state, action) => (
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

export default questionToSubmit;