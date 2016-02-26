import PureComponent from 'react-pure-render/component'
import QuestionShape from '../../propTypes/QuestionShape'
import React from 'react'
import { formatDateTime, formatDateTimeForHuman } from '../../util/date-time-util'
import { Link } from 'react-router'

const propTypes = QuestionShape; 

class QuestionsListItem extends PureComponent {
    render() {
        const { id, text, dateTimeAsked, user } = this.props;
        const questionLink                      = '/questions/' + id; 
        const dateTimeAskedFormatted            = formatDateTime(dateTimeAsked)

        return (
            <li
                className="appItemsList-item"
            >
                <Link
                    to={questionLink}
                    className="appItemsList-item-detailsLink"
                >
                    {text}
                </Link>
                <p className="appItemsList-item-meta">
                    <time
                        dateTime={formatDateTime(dateTimeAsked)}
                    >
                        {formatDateTimeForHuman(dateTimeAsked)}
                    </time> by {user}
                </p>
            </li>
        );
    }
}

QuestionsListItem.propTypes = propTypes;

export default QuestionsListItem