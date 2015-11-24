import ActionTypes from '../actions/ActionTypes';

export default function answer(state, action) {
    switch (action.type) {
        case ActionTypes.SelectQuestion:
            return Object.assign(
                {},
                state,
                {
                    isSubmitting: false,
                    errors: {},
                    data: {}
                }
            );

        case ActionTypes.AnswerUsernameChanged:
            return Object.assign(
                {},
                state,
                {
                    errors: Object.assign(
                        {},
                        state.errors,
                        {
                            user: action.errors,
                        }
                    ),
                    data: Object.assign(
                        {},
                        state.data,
                        {
                            user: action.user,
                        }
                    )
                }
            );

        case ActionTypes.AnswerTextChanged:
            return Object.assign(
                {},
                state,
                {
                    errors: Object.assign(
                        {},
                        state.errors,
                        {
                            text: action.errors,
                        }
                    ),
                    data: Object.assign(
                        {},
                        state.data,
                        {
                            text: action.text,
                        }
                    )
                }
            );

        case ActionTypes.AnswerValidationFailed:
            return Object.assign(
                {},
                state,
                {
                    errors: action.validationErrors
                }
            );

        case ActionTypes.SubmittingAnswer:
            return Object.assign(
                {},
                state,
                {
                    isSubmitting: true,
                    errors: {},
                    data: action.answer
                }
            );

        case ActionTypes.AnswerSubmitted:
            return Object.assign(
                {},
                state,
                {
                    isSubmitting: false,
                    errors: {},
                    data: {}
                }
            );

        default:
            return state;
    }
}