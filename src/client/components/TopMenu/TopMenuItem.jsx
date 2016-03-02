import classNames from 'classnames'
import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'

const propTypes = {
    link: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isSelected: PropTypes.bool
};

class TopMenuItem extends PureComponent {
    render() {
        const { link, text, isSelected } = this.props;
        
        const itemClass = classNames({
            'navList-item': true,
            'navList-item_is-selected': this.props.isSelected
        });

        const linkElement = link === '/'
            ? <IndexLink to="/">{text}</IndexLink>
            : <Link to={link}>{text}</Link>;
 
        return (
            <li className={itemClass}>
                {linkElement}   
            </li>
        );
    }
}

TopMenuItem.propTypes = propTypes;

export default TopMenuItem