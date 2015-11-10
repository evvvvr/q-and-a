import React from 'react';
import ScreenTypes from '../../ScreenTypes';
import TopMenuButton from './TopMenuButton';
import TopMenuItem from './TopMenuItem';

export default class TopMenu extends React.Component {
    render() {
        return (
            <div
                id="topMenu"
                className="pure-menu pure-menu-horizontal"
            >
                <ul className="pure-menu-list">
                    <TopMenuItem
                        text="Questions"
                        value={ScreenTypes.Questions}
                        isSelected={this.props.selectedMenuItem === ScreenTypes.Questions}
                        onMenuItemSelected={this.props.onMenuItemSelected}
                    />
                    <TopMenuItem
                        text="Answered"
                        value={ScreenTypes.Answered}
                        isSelected={this.props.selectedMenuItem === ScreenTypes.Answered}
                        onMenuItemSelected={this.props.onMenuItemSelected}
                    />
                    <TopMenuItem
                        text="Unanswered"
                        value={ScreenTypes.Unanswered}
                        isSelected={this.props.selectedMenuItem === ScreenTypes.Unanswered}
                        onMenuItemSelected={this.props.onMenuItemSelected}
                    />
                </ul>
                <TopMenuButton
                    text="Ask Question"
                    value={ScreenTypes.AskQuestion}
                    onMenuItemSelected={this.props.onMenuItemSelected}
                />
            </div>
        );
    }
}