import React from 'react';

export default class TopMenuButton extends React.Component {
    handleClick() {
        this.props
            .onMenuItemSelected({
                menuItemValue: this.props.value
            });
    }
    
    render() {
        return (
            <a
                className="pure-button pure-button-primary"
                href="#"
                onClick={this.handleClick.bind(this)}
            >
                {this.props.text}
            </a>
        );
    }
}