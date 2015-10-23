import React from 'react';
import TopMenu from './TopMenu';
import MenuItems from './MenuItems';
import QuestionsView from './QuestionsView';
import AnsweredView from './AnsweredView';
import UnansweredView from './UnansweredView';
import AskQuestionView from './AskQuestionView';

const MenuItemToViewRender = new Map();
MenuItemToViewRender.set(MenuItems.Questions, () => { return <QuestionsView />; });
MenuItemToViewRender.set(MenuItems.Answered, () => { return <AnsweredView />; });
MenuItemToViewRender.set(MenuItems.Unanswered, () => { return <UnansweredView />; });
MenuItemToViewRender.set(MenuItems.AskQuestion, () => { return <AskQuestionView />; });

export default class QuestionsAndAnswersApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedMenuItem: props.initialSelectedMenuItem};
    }

	handleMenuItemSelected(menuItem) {
		this.setState({selectedMenuItem: menuItem});
	}

	render() {
		const MainViewToRender = MenuItemToViewRender
			.get(this.state.selectedMenuItem)();

		return (
			<div>
				<TopMenu
					selectedMenuItem={this.state.selectedMenuItem}
					onMenuItemSelected={this.handleMenuItemSelected.bind(this)}
				/>
				<div className='pure-g'>
					<div className='content pure-u-1 pure-u-md-3-4'>
						<section id='mainContent'>{MainViewToRender}</section>
					</div>
				</div>
			</div>
		);
	}
};