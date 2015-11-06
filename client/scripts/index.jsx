import '../styles/main.css';
import 'purecss';
import API from './API';
import React from 'react';
import ReactDOM from 'react-dom';
import QuestionsAndAnswersApp from './QuestionsAndAnswersApp';

API.init('http://localhost:8080/api');

ReactDOM.render(
    <QuestionsAndAnswersApp />,
    document.getElementById('q-and-a-app')
);