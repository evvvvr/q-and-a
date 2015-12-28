import '../styles/main.css';
import 'purecss';
import API from './API';
import appReducer from './reducers/appReducer';
import React from 'react';
import ReactDOM from 'react-dom';
import router from './router';
import thunkMiddleware from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createHistory } from 'history';
import { Provider } from 'react-redux';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';

API.init({
    hostURL: 'http://localhost:8080/api',
    timeout: 5000
});

const reducer = combineReducers(Object.assign({}, appReducer, {
    routing: routeReducer
}));

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware) (createStore);
const store = createStoreWithMiddleware(reducer);

const history = createHistory();

syncReduxAndRouter(history, store);

ReactDOM.render(
    <Provider store={store}>
        {router(history, store)}
    </Provider>,
    document.getElementById('q-and-a-app')
);