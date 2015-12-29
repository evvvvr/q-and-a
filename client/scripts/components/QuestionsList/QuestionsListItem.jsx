import React, { PropTypes } from 'react';
import { formatDateTime } from '../../util/date-time-util';
import { Link } from 'react-router';

const propTypes = {
    questionId: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    dateTimeAsked: PropTypes.string.isRequired
};

class QuestionsListItem extends React.Component {
    render() {
        const { questionId, text, dateTimeAsked, user } = this.props;
        const questionLink = '/questions/' + questionId; 

        return (
            <li className="appItem">
                <Link to={questionLink} className="appItem-detailsLink">
                    {text}
                </Link>
                <p className="appItemMeta">
                    {formatDateTime(dateTimeAsked)} by {user}
                </p>
            </li>
        );
    }
}

QuestionsListItem.propTypes = propTypes;

export default QuestionsListItem;