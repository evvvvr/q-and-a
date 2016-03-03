import createSagaMiddleware from 'redux-saga'
import fetchAllQuestions from './sagas/fetchAllQuestions'
import fetchAnsweredQuestions from './sagas/fetchAnsweredQuestions'
import fetchQuestion from './sagas/fetchQuestion'
import fetchUnansweredQuestions from './sagas/fetchUnansweredQuestions'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const sagaMiddleware = createSagaMiddleware(
    fetchAllQuestions,
    fetchAnsweredQuestions,
    fetchUnansweredQuestions,
    fetchQuestion
);

const createStoreWithMiddleware = applyMiddleware(
    sagaMiddleware,
    thunkMiddleware
) (createStore);

export default createStoreWithMiddleware;