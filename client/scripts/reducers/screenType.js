import ActionTypes from '../actions/ActionTypes';
import ScreenTypes from '../ScreenTypes';

const defaultState = ScreenTypes.Questions;

export default function screenType(state = defaultState, action) {
    switch (action.type) {
        case ActionTypes.ShowScreen:
            return action.screenType;

        case ActionTypes.SelectQuestion:
            return ScreenTypes.Question;

        default:
            return state;
    }
}