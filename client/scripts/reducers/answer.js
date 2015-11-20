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
                    answerId: action.answerId,
                    data: {}
                }
            );

        case ActionTypes.AnswerChanged:
            return Object.assign(
                {},
                state,
                {
                    data: action.answer
                }
            );

        case ActionTypes.AnswerUserNameValidationEnded:
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
                    ) 
                }
            );

        case ActionTypes.AnswerTextValidationEnded:
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
                    answerId: action.answerId,
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
                    answerId: null,
                    data: {}
                }
            );

        default:
            return state;
    }
}