import '../styles/main.css';
import 'purecss';
import API from './API';
import QuestionsAndAnswersApp from './containers/QuestionsAndAnswersApp';
import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers/reducer';
import ScreenTypes from './ScreenTypes';
import Store from './Store';

API.init('http://localhost:8080/api');

const initialState = {
    screenType: ScreenTypes.Questions,
    questions: [],
    question: {},
    answer: {
        user: '',
        text: ''
    }
};

Store.init(initialState, reducer);

ReactDOM.render(
    <QuestionsAndAnswersApp />,
    document.getElementById('q-and-a-app')
);