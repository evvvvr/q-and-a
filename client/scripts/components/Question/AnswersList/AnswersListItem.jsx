import AnswerShape from '../../../propTypes/AnswerShape'
import AppItemMeta from '../../AppItemMeta'
import PureComponent from 'react-pure-render/component'
import React from 'react'

const propTypes = AnswerShape;

class AnswersListItem extends PureComponent {
    render() {
        const { id, text, dateTimeAnswered, user } = this.props;

        return (
            <li key={id} className="appItemsList-item">
                <div className="appItemFullText">
                    {text}
                </div>
                <AppItemMeta dateTime={dateTimeAnswered} user={user} />
            </li>
        );
    }
}

AnswersListItem.propTypes = propTypes;

export default AnswersListItem