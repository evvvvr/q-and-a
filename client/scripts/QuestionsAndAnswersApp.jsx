import React from 'react';
import TopMenu from './TopMenu';
import MenuItems from './MenuItems';

export default class QuestionsAndAnswersApp extends React.Component {
	render() {
		return (
			<div>
				<TopMenu
					initialSelectedMenuItem={this.props.initialSelectedMenuItem}
				/>
				<section id='mainContent'>Hello, World!</section>
			</div>
		);
	}
};