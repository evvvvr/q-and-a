import AppItemMeta from '../AppItemMeta'
import PureComponent from 'react-pure-render/component'
import QuestionDetailsShape from '../../propTypes/QuestionDetailsShape'
import React from 'react'

const propTypes = QuestionDetailsShape;

class QuestionDetails extends PureComponent {
    render() {
        const { user, text, dateTimeAsked } = this.props;

        return (
            <div>
                <div className="appItemFullText">
                    {text}
                </div>
                <AppItemMeta dateTime={dateTimeAsked} user={user} />
            </div>
        );
    }
}

QuestionDetails.propTypes = propTypes;

export default QuestionDetails