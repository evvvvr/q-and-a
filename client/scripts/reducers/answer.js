import ActionTypes from '../ActionTypes';

export default function answer(state, action) {
    switch (action.type) {
        case ActionTypes.ChangeAnswerText:
            return {
                ...state,
               text: action.text
            };

        case ActionTypes.ChangeAnswerUser:
            return {
                ...state,
               user: action.user
            };

        case ActionTypes.SubmitAnswer:
            return {
                user: '',
                text: ''
            };

        default:
            return state;
    } 
}