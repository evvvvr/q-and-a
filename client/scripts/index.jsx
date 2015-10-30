import '../styles/main.css';
import 'purecss';
import React from 'react';
import ReactDOM from 'react-dom';
import QuestionsAndAnswersApp from './QuestionsAndAnswersApp';
import ScreenType from './screen-type';

ReactDOM.render(
    <QuestionsAndAnswersApp initialScreen={ScreenType.Questions} />,
    document.getElementById('q-and-a-app')
);