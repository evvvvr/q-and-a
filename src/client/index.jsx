// Following two lines is for CSS loading in correct order,
// so don't re-order them
import 'normalize.css'
import './styles/main.css'

import API from './API/API'
import appReducer from './reducers/appReducer'
import createHashHistory from 'history/lib/createHashHistory'
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

const reducer = combineReducers(Object.assign({}, appReducer, {
    routing: routeReducer
}));

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware) (createStore);
const store = createStoreWithMiddleware(reducer);

const history = createHashHistory();

syncReduxAndRouter(history, store);

ReactDOM.render(
    <Provider store={store}>
        {router(history, store)}
    </Provider>,
    document.getElementById('q-and-a-app')
);