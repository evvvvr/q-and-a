import React from 'react';
import formatDateTime from '../../util/date-time-formatters';

export default class QuestionListItem extends React.Component {
    handleClick() {
        this.props
            .onQuestionSelected({questionId: this.props.questionId});
    }

    render() {
        return (
            <li className="appItem">
                <a
                    href="#"
                    className="appItem-detailsLink"
                    onClick={this.handleClick.bind(this)}>
                    {this.props.text}
                </a>
                <p className="appItemMeta">
                    {formatDateTime(this.props.dateTimeAsked)} by {this.props.user}
                </p>
            </li>
        );
    }
}