import ActionTypes from './ActionTypes'
import API from '../API/API'
import { createAction } from 'redux-actions'

export const requestAllQuestions = createAction(ActionTypes.RequestAllQuestions);

export const recieveAllQuestions = createAction(
    ActionTypes.RecieveAllQuestions,
    questions => questions
);