import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'
import TopMenuItem from './TopMenuItem'

const propTypes = {
    currentPath: PropTypes.string.isRequired
};

class TopMenu extends PureComponent {
    render() {
        const { currentPath } = this.props;

        return (
            <nav>
                <ul className="navList">
                    <TopMenuItem
                        text="Questions"
                        link="/"
                        isSelected={currentPath === '/'}
                    />
                    <TopMenuItem
                        text="Answered"
                        link="answered"
                        isSelected={currentPath === '/answered'}
                    />
                    <TopMenuItem
                        text="Unanswered"
                        link="unanswered"
                        isSelected={currentPath === '/unanswered'}
                    />
                    <TopMenuItem
                        text="Ask Question"
                        link="ask"
                        isSelected={currentPath === '/ask'}
                    />
                </ul>
            </nav>
        );
    }
}

TopMenu.propTypes = propTypes;

export default TopMenu