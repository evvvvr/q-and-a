import '../styles/main.css';
import 'purecss';
import API from './API';
import QuestionsAndAnswersApp from './containers/QuestionsAndAnswersApp';
import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers/reducer';
import ScreenTypes from './ScreenTypes';
import Store from './Store';

API.init({
    hostURL: 'http://localhost:8080/api',
    timeout: 5000
});

const initialState = {
    screenType: ScreenTypes.Questions,
    allQuestions: {
        isFetching: false,
        items: []
    },
    answeredQuestions: {
        isFetching: false,
        items: []
    },
    unansweredQuestions: {
        isFetching: false,
        items: []
    },
    question: {
        isFetching: false,
        data: {}
    },
    questionToSubmit: {
        isSubmitting: false,
        data: {}
    },
    answer: {
        isSubmitting: false,
        data: {
            questionId: null,
            user: '',
            text: ''
        }
    }
};

Store.init(initialState, reducer);

ReactDOM.render(
    <QuestionsAndAnswersApp />,
    document.getElementById('q-and-a-app')
);