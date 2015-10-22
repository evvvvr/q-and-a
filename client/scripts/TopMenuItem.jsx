import React from 'react';
import classNames from 'classnames'; 

export default class TopMenuItem extends React.Component {
	handleClick() {
		this.props.onMenuItemSelected(this.props.type);		
	}

	render() {
		const ItemClass = classNames({
			'pure-menu-item': true,
			'pure-menu-selected': this.props.isSelected
		});

		return (
			<li className={ItemClass}>
				<a
					href='#'
					className='pure-menu-link'
					onClick={this.handleClick.bind(this)}
				>
					{this.props.text}
				</a>
			</li>
		);
	}
}