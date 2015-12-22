import '../styles/main.css';
import 'purecss';
import API from './API';
import appReducer from './reducers/appReducer';
import QuestionsAndAnswersApp from './containers/QuestionsAndAnswersApp';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

API.init({
    hostURL: 'http://localhost:8080/api',
    timeout: 5000
});

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware) (createStore);
const store = createStoreWithMiddleware(appReducer);

ReactDOM.render(
    <Provider store={store}>
        <QuestionsAndAnswersApp />
    </Provider>,
    document.getElementById('q-and-a-app')
);