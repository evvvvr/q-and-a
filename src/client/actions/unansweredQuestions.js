import ActionTypes from './ActionTypes'
import { createAction } from 'redux-actions'

export const requestUnansweredQuestions = createAction(ActionTypes.RequestUnansweredQuestions);

export const recieveUnansweredQuestions = createAction(
    ActionTypes.RecieveUnansweredQuestions,
    questions => questions
);