import React from 'react';
import TopMenuItem from './TopMenuItem';
import TopMenuButton from './TopMenuButton';
import MenuItems from './MenuItems';

export default class TopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedMenuItem: props.initialSelectedMenuItem};
    }

    handleMenuItemSelected(menuItem) {
        this.setState({selectedMenuItem: menuItem});
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
                        type={MenuItems.Questions}
                        onMenuItemSelected={this.handleMenuItemSelected.bind(this)}
                        isSelected={this.state.selectedMenuItem === MenuItems.Questions} 
                    />
                    <TopMenuItem
                        text="Answered"
                        type={MenuItems.Answered}
                        onMenuItemSelected={this.handleMenuItemSelected.bind(this)}
                        isSelected={this.state.selectedMenuItem === MenuItems.Answered}
                    />
                    <TopMenuItem
                        text="Unanswered"
                        type={MenuItems.Unanswered}
                        onMenuItemSelected={this.handleMenuItemSelected.bind(this)}
                        isSelected={this.state.selectedMenuItem === MenuItems.Unanswered}
                    />
                </ul>
                <TopMenuButton
                    text="Ask Question"
                    type={MenuItems.AskQuestion}
                    onMenuItemSelected={this.handleMenuItemSelected.bind(this)}
                />
			</div>
        );
	}
}