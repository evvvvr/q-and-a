import ActionTypes from '../actions/ActionTypes';

export default function questionToSubmit(state, action) {
    switch (action.type) {
        case ActionTypes.QuestionValidationFailed:
            return Object.assign(
                {},
                state,
                {
                    errors: action.validationErrors,
                    data: action.question
                }
            );

        case ActionTypes.ShowAskForm:
            return Object.assign(
                {},
                state,
                {
                    errors: [],
                    data: {}
                }
            );

        case ActionTypes.SubmittingQuestion:
            return Object.assign(
                {},
                state,
                {
                    isSubmitting: true,
                    errors: [],
                    data: action.question
                }
            );

        case ActionTypes.QuestionSubmitted:
            return Object.assign(
                {},
                state,
                {
                    isSubmitting: false,
                    errors: [],
                    data: {}
                }
            );

        default:
            return state;
    }
}