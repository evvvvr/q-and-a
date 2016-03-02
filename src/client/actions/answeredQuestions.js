import ActionTypes from './ActionTypes'
import { createAction } from 'redux-actions'

export const requestAnsweredQuestions = createAction(ActionTypes.RequestAnsweredQuestions);

export const recieveAnsweredQuestions = createAction(
    ActionTypes.RecieveAnsweredQuestions,
    questions => questions
);