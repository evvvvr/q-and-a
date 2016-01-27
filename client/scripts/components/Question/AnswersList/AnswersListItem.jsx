import AnswerShape from '../../../propTypes/AnswerShape';
import PureComponent from 'react-pure-render/component';
import React  from 'react';
import { formatDateTime } from '../../../util/date-time-util';

const propTypes = AnswerShape;

class AnswersListItem extends PureComponent {
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