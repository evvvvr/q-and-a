import ActionTypes from '../actions/ActionTypes';

const defaultState = {
    isSubmitting: false,
    errors: {},
    data: {}
};

export default function questionToSubmit(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.ShowScreen:
            //TODO: better clean 'questionToSubmit' only when 'Ask Question' screen was closed
            return Object.assign(
                {},
                state,
                {
                    errors: {},
                    data: {}
                }
            );

        case ActionTypes.QuestionUsernameChanged:
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

        case ActionTypes.QuestionTextChanged:
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

        case ActionTypes.QuestionValidationFailed:
            return Object.assign(
                {},
                state,
                {
                    errors: action.errors,
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