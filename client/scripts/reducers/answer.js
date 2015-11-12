import ActionTypes from '../actions/ActionTypes';

export default function answer(state, action) {
    switch (action.type) {
        case ActionTypes.SelectQuestion:
            return Object.assign(
                {},
                state,
                {
                    isSubmitting: false,
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
                    data: action.answer
                }
            );

        case ActionTypes.SubmittingAnswer:
            return Object.assign(
                {},
                state,
                {
                    isSubmitting: true,
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