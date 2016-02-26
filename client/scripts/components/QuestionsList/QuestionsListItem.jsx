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
                itemScope
                itemType="http://schema.org/Question"
            >
                <Link
                    to={questionLink}
                    className="appItemsList-item-detailsLink"
                >
                    <span itemProp="text">{text}</span>
                </Link>
                <p className="appItemsList-item-meta">
                    <time
                        dateTime={formatDateTime(dateTimeAsked)}
                        itemProp="dateCreated"
                    >
                        {formatDateTimeForHuman(dateTimeAsked)}
                    </time> by <span
                        itemProp="author"
                        itemScope
                        itemType="http://schema.org/Person"
                    >
                        <span itemProp="name">{user}</span>
                    </span>
                </p>
            </li>
        );
    }
}

QuestionsListItem.propTypes = propTypes;

export default QuestionsListItem