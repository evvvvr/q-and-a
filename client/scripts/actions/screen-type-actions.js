import ActionTypes from './ActionTypes';

export function showScreen(screenType) {
    return {
        type: ActionTypes.ShowScreen,
        screenType
    };
}