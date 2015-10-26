import React from 'react';
import formatDateTime from '../util/date-time-formatters';

export default class QuestionItem extends React.Component {
    render() {
        return (
            <li className="appItem">
                <a href="#" className="appItem-detailsLink">{this.props.text}</a>
                <p className="appItem-meta">
                    {formatDateTime(this.props.dateTimeAsked)} by {this.props.user}
                </p>
            </li>
        );
    }
}