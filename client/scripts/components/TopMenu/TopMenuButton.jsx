import React, { PropTypes } from 'react';

const propTypes = {
    text: PropTypes.string.isRequired,
    onMenuItemSelected: PropTypes.func
};

const defaultProps = {
    onMenuItemSelected: () => {}
};

class TopMenuButton extends React.Component {
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

TopMenuButton.propTypes = propTypes;
TopMenuButton.defaultProps = defaultProps;

export default TopMenuButton;