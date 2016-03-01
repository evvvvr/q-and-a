import AppItemMeta from '../AppItemMeta'
import PureComponent from 'react-pure-render/component'
import QuestionShape from '../../propTypes/QuestionShape'
import React from 'react'
import { Link } from 'react-router'

const propTypes = QuestionShape; 

class QuestionsListItem extends PureComponent {
    render() {
        const { id, text, dateTimeAsked, user } = this.props;
        const questionLink                      = '/questions/' + id; 

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
                <AppItemMeta dateTime={dateTimeAsked} user={user} />
            </li>
        );
    }
}

QuestionsListItem.propTypes = propTypes;

export default QuestionsListItem