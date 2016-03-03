import createSagaMiddleware from 'redux-saga'
import fetchAllQuestions from './sagas/fetchAllQuestions'
import fetchAnsweredQuestions from './sagas/fetchAnsweredQuestions'
import fetchUnansweredQuestions from './sagas/fetchUnansweredQuestions'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const sagaMiddleware = createSagaMiddleware(
    fetchAllQuestions,
    fetchAnsweredQuestions,
    fetchUnansweredQuestions
);

const createStoreWithMiddleware = applyMiddleware(
    sagaMiddleware,
    thunkMiddleware
) (createStore);

export default createStoreWithMiddleware;