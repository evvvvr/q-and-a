import React from 'react';
import ScreenType from '../screen-type';
import TopMenuItem from './TopMenuItem';
import TopMenuButton from './TopMenuButton';

export default class TopMenu extends React.Component {
    handleMenuItemSelected(eventArgs) {
        this.props.onMenuItemSelected(eventArgs);
    }

    render() {
        return (
            <div
                id="topMenu"
                className="pure-menu pure-menu-horizontal"
            >
                <ul className="pure-menu-list">
                    <TopMenuItem
                        text="Questions"
                        value={ScreenType.Questions}
                        isSelected={this.props.selectedMenuItem === ScreenType.Questions}
                        onMenuItemSelected={this.handleMenuItemSelected.bind(this)}
                    />
                    <TopMenuItem
                        text="Answered"
                        value={ScreenType.Answered}
                        isSelected={this.props.selectedMenuItem === ScreenType.Answered}
                        onMenuItemSelected={this.handleMenuItemSelected.bind(this)}
                    />
                    <TopMenuItem
                        text="Unanswered"
                        value={ScreenType.Unanswered}
                        isSelected={this.props.selectedMenuItem === ScreenType.Unanswered}
                        onMenuItemSelected={this.handleMenuItemSelected.bind(this)}
                    />
                </ul>
                <TopMenuButton
                    text="Ask Question"
                    value={ScreenType.AskQuestion}
                    onMenuItemSelected={this.handleMenuItemSelected.bind(this)}
                />
            </div>
        );
    }
}