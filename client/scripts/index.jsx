import '../styles/main.css';
import 'purecss';
import React from 'react';
import ReactDOM from 'react-dom';
import QuestionsAndAnswersApp from './QuestionsAndAnswersApp';
import { TopMenuItems } from './TopMenu/TopMenu';

ReactDOM.render(
	<QuestionsAndAnswersApp initialSelectedMenuItem={TopMenuItems.Questions} />,
	document.getElementById('q-and-a-app')
);