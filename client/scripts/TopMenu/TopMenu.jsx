import React from 'react';
import TopMenuItem from './TopMenuItem';
import TopMenuButton from './TopMenuButton';

export const TopMenuItems = {
    Questions: Symbol(),
    Answered: Symbol(),
    Unanswered: Symbol(),
    AskQuestion: Symbol()
};

export default class TopMenu extends React.Component {
    handleMenuItemSelected(menuItem) {
        this.props.onMenuItemSelected(menuItem);
    }

	render() {
		return (
            <div
				id='topMenu'
				className='pure-menu pure-menu-horizontal'
			>
				<ul className='pure-menu-list'>
        			<TopMenuItem
                        text="Questions"
                        type={TopMenuItems.Questions}
                        isSelected={this.props.selectedMenuItem === TopMenuItems.Questions}
                        onMenuItemSelected={this.handleMenuItemSelected.bind(this)}
                    />
                    <TopMenuItem
                        text="Answered"
                        type={TopMenuItems.Answered}
                        isSelected={this.props.selectedMenuItem === TopMenuItems.Answered}
                        onMenuItemSelected={this.handleMenuItemSelected.bind(this)}
                    />
                    <TopMenuItem
                        text="Unanswered"
                        type={TopMenuItems.Unanswered}
                        isSelected={this.props.selectedMenuItem === TopMenuItems.Unanswered}
                        onMenuItemSelected={this.handleMenuItemSelected.bind(this)}
                    />
                </ul>
                <TopMenuButton
                    text="Ask Question"
                    type={TopMenuItems.AskQuestion}
                    onMenuItemSelected={this.handleMenuItemSelected.bind(this)}
                />
			</div>
        );
	}
}