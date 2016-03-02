// Need to be the first import to enable all ES2015 features
import 'babel-polyfill'

// Following two lines is for CSS loading in correct order,
// so don't re-order them
import 'normalize.css'
import './styles/main.css'

import API from './API/API'
import appReducer from './reducers/appReducer'
import createHashHistory from 'history/lib/createHashHistory'
import createSagaMiddleware from 'redux-saga'
import fetchAllQuestions from './sagas/fetchAllQuestions'
import fetchAnsweredQuestions from './sagas/fetchAnsweredQuestions'
import React from 'react'
import ReactDOM from 'react-dom'
import router from './router'
import thunkMiddleware from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'

API.init({
    hostURL: location.origin + '/api'
});

const sagaMiddleware = createSagaMiddleware(fetchAllQuestions, fetchAnsweredQuestions);

const createStoreWithMiddleware = applyMiddleware(
    sagaMiddleware, thunkMiddleware)(createStore);

const reducer = combineReducers(Object.assign({}, appReducer, {
    routing: routeReducer
}));

const store = createStoreWithMiddleware(reducer);

const history = createHashHistory();

syncReduxAndRouter(history, store);

ReactDOM.render(
    <Provider store={store}>
        {router(history, store)}
    </Provider>,
    document.getElementById('q-and-a-app')
);