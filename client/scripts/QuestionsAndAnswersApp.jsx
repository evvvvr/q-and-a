import React from 'react';
import TopMenu from './TopMenu';

export default class QuestionsAndAnswersApp extends React.Component {
	render() {
		return (
			<div>
				<TopMenu />
				<section id='mainContent'>Hello, World!</section>
			</div>
		);
	}
};