import ActionTypes from '../actions/ActionTypes';

export default function answer(state, action) {
    switch (action.type) {
        case ActionTypes.SelectQuestion:
            return Object.assign(
                {},
                state,
                {
                    isSubmitting: false,
                    data: {
                        questionId: null,
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
                    data: {
                        user: action.user,
                        text: action.text
                    }
                }
            );

        case ActionTypes.SubmittingAnswer:
            return Object.assign(
                {},
                state,
                {
                    isSubmitting: true,
                    data: {
                        questionId: action.questionId,
                        user: action.user,
                        text: action.text
                    }
                }
            );

        case ActionTypes.AnswerSubmitted:
            return Object.assign(
                {},
                state,
                {
                    isSubmitting: false,
                    data: {
                        questionId: null,
                        user: '',
                        text: ''
                    }
                }
            );

        default:
            return state;
    }
}