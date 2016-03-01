import AnswerShape from '../../../propTypes/AnswerShape'
import PureComponent from 'react-pure-render/component'
import React  from 'react'
import { formatDateTime, formatDateTimeForHuman } from '../../../util/date-time-util'

const propTypes = AnswerShape;

class AnswersListItem extends PureComponent {
    render() {
        const { id, text, dateTimeAnswered, user } = this.props;

        return (
            <li key={id} className="appItemsList-item">
                <div className="appItemFullText">
                    {text}
                </div>
                <p className="appItemMeta">
                    <time
                        dateTime={formatDateTime(dateTimeAnswered)}
                    >
                        {formatDateTimeForHuman(dateTimeAnswered)}
                    </time> by {user}
                </p>
            </li>
        );
    }
}

AnswersListItem.propTypes = propTypes;

export default AnswersListItem