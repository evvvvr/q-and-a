import PureComponent from 'react-pure-render/component';
import QuestionShape from '../../propTypes/QuestionShape';
import React from 'react';
import { formatDateTime } from '../../util/date-time-util';
import { Link } from 'react-router';

const propTypes = QuestionShape; 

class QuestionsListItem extends PureComponent {
    render() {
        const { id, text, dateTimeAsked, user } = this.props;
        const questionLink = '/questions/' + id; 

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