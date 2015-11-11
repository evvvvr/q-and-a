import ActionTypes from '../actions/ActionTypes';

export default function questionToSubmit(state, action) {
    switch (action.type) {
        case ActionTypes.SubmittingQuestion:
            return Object.assign(
                {},
                state,
                {
                    isSubmitting: true,
                    data: {
                        user: action.user,
                        text: action.text
                    }
                }
            );

        case ActionTypes.QuestionSubmitted:
            return Object.assign(
                {},
                state,
                {
                    isSubmitting: false,
                    data: {}
                }
            );

        default:
            return state;
    }
}