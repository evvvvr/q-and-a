import '../styles/main.css';
import 'purecss';
import React from 'react';
import ReactDOM from 'react-dom';
import QuestionsAndAnswersApp from './QuestionsAndAnswersApp';
import MenuItems from './MenuItems';

ReactDOM.render(
	<QuestionsAndAnswersApp initialSelectedMenuItem={MenuItems.Questions} />,
	document.getElementById('q-and-a-app')
);