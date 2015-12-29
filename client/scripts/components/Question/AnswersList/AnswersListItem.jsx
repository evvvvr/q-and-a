import React, { PropTypes } from 'react';
import { formatDateTime } from '../../../util/date-time-util';

const propTypes = {
    answerId: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    dateTimeAnswered: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
};

class AnswersListItem extends React.Component {
    render() {
        const { id, text, dateTimeAnswered, user } = this.props;

        return (
            <li key={id} className="appItem">
                {text}
                <p className="appItemMeta">
                    {formatDateTime(dateTimeAnswered)} by {user}
                </p>
            </li>
        );
    }
}

AnswersListItem.propTypes = propTypes;

export default AnswersListItem;