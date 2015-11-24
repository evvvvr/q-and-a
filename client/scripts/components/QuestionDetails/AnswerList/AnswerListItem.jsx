import React, { PropTypes } from 'react';
import { formatDateTime } from '../../../util/date-time-util';

const propTypes = {
    answerId: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    dateTimeAnswered: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
};

class AnswerListItem extends React.Component {
    render() {
        return (
            <li key={this.props.answerId} className="appItem">
                {this.props.text}
                <p className="appItemMeta">
                    {formatDateTime(this.props.dateTimeAnswered)} by {this.props.user}
                </p>
            </li>
        );
    }
}

AnswerListItem.propTypes = propTypes;

export default AnswerListItem;