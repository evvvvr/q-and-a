import React from 'react';
import TopMenu, { TopMenuItems } from './TopMenu/TopMenu';
import QuestionsView from './MainContent/QuestionsView';
import AnsweredView from './MainContent/AnsweredView';
import UnansweredView from './MainContent/UnansweredView';
import AskQuestionView from './MainContent/AskQuestionView';

const MenuItemToViewRender = new Map();
MenuItemToViewRender.set(TopMenuItems.Questions, () => { return <QuestionsView />; });
MenuItemToViewRender.set(TopMenuItems.Answered, () => { return <AnsweredView />; });
MenuItemToViewRender.set(TopMenuItems.Unanswered, () => { return <UnansweredView />; });
MenuItemToViewRender.set(TopMenuItems.AskQuestion, () => { return <AskQuestionView />; });

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