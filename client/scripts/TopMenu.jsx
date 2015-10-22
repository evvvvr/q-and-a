import React from 'react';

export default class TopMenu extends React.Component {
	render() {
		return <div
					id='topMenu'
					className='pure-menu pure-menu-horizontal'
				>
					<ul className="pure-menu-list">
            			<li data-type="all" className="pure-menu-item">
            				<a href="#" className="pure-menu-link">
            					Questions
            				</a>
            			</li>
            			<li data-type="answered" className="pure-menu-item">
            				<a href="#answered" className="pure-menu-link">
            					Answered
            				</a>
            			</li>
            			<li data-type="unanswered" className="pure-menu-item">
            				<a href="#unanswered" className="pure-menu-link">
            					Unanswered
            				</a>
            			</li>
        			</ul>
        			<a className="pure-button pure-button-primary" href="#ask">
        				Ask Question
        			</a>
				</div>;
	}
}