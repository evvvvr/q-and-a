import ActionTypes from './ActionTypes'
import API from '../API/API'
import { createAction } from 'redux-actions'

export const requestQuestion = createAction(
    ActionTypes.RequestQuestion,
    questionId => questionId
);

export const recieveQuestion = createAction(
    ActionTypes.RecieveQuestion,
    questionOrError => questionOrError
);