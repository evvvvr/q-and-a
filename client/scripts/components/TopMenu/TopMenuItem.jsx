import React, { PropTypes } from 'react';
import classNames from 'classnames'; 

const propTypes = {
    text: PropTypes.string.isRequired,
    onMenuItemSelected: PropTypes.func
};

const defaultProps = {
    onMenuItemSelected: () => {}
};

class TopMenuItem extends React.Component {
    handleClick() {
        this.props.onMenuItemSelected({
            menuItemValue: this.props.value
        });     
    }

    render() {
        const ItemClass = classNames({
            'pure-menu-item': true,
            'pure-menu-selected': this.props.isSelected
        });

        return (
            <li className={ItemClass}>
                <a
                    href="#"
                    className="pure-menu-link"
                    onClick={this.handleClick.bind(this)}
                >
                    {this.props.text}
                </a>
            </li>
        );
    }
};

TopMenuItem.propTypes = propTypes;
TopMenuItem.defaultProps = defaultProps;

export default TopMenuItem;