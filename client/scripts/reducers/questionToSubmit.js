import ActionTypes from '../actions/ActionTypes';

export default function questionToSubmit(state, action) {
    switch (action.type) {
        case ActionTypes.QuestionChanged:
            return Object.assign(
                {},
                state,
                {
                    data: action.question
                }
            );

        case ActionTypes.QuestionUserNameValidationEnded:
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

        case ActionTypes.QuestionTextValidationEnded:
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

        case ActionTypes.QuestionValidationFailed:
            return Object.assign(
                {},
                state,
                {
                    errors: action.errors,
                }
            );

        case ActionTypes.ShowAskForm:
            return Object.assign(
                {},
                state,
                {
                    errors: {},
                    data: {}
                }
            );

        case ActionTypes.SubmittingQuestion:
            return Object.assign(
                {},
                state,
                {
                    isSubmitting: true,
                    errors: {},
                    data: action.question
                }
            );

        case ActionTypes.QuestionSubmitted:
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