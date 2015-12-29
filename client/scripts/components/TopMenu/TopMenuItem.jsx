import classNames from 'classnames'; 
import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const propTypes = {
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isSelected: PropTypes.bool
};

class TopMenuItem extends React.Component {
    render() {
        const { link, text, isSelected } = this.props;

        const itemClass = classNames({
            'pure-menu-item': true,
            'pure-menu-selected': this.props.isSelected
        });

        const linkElement = link === '/'
            ? <IndexLink to="/" className="pure-menu-link">{text}</IndexLink>
            : <Link to={link} className="pure-menu-link">{text}</Link>;
 
        return (
            <li className={itemClass}>
                {linkElement}   
            </li>
        );
    }
}

TopMenuItem.propTypes = propTypes;

export default TopMenuItem;