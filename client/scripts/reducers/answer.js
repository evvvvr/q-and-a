import ActionTypes from '../actions/ActionTypes';

export default function answer(state, action) {
    switch (action.type) {
        case ActionTypes.SelectQuestion:
            return Object.assign(
                {},
                state,
                {
                    isSubmitting: false,
                    errors: [],
                    questionId: action.questionId,
                    data: {
                        user: '',
                        text: ''
                    }
                }
            );

        case ActionTypes.AnswerChanged:
            return Object.assign(
                {},
                state,
                {
                    errors: [],
                    data: action.answer
                }
            );

        case ActionTypes.AnswerValidationFailed:
            return Object.assign(
                {},
                state,
                {
                    errors: action.validationErrors,
                    data: action.answer
                }
            );

        case ActionTypes.SubmittingAnswer:
            return Object.assign(
                {},
                state,
                {
                    isSubmitting: true,
                    errors: [],
                    questionId: action.questionId,
                    data: action.answer
                }
            );

        case ActionTypes.AnswerSubmitted:
            return Object.assign(
                {},
                state,
                {
                    isSubmitting: false,
                    errors: [],
                    questionId: null,
                    data: {
                        user: '',
                        text: ''
                    }
                }
            );

        default:
            return state;
    }
}