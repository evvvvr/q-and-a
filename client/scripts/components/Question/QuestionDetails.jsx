import PureComponent from 'react-pure-render/component'
import QuestionDetailsShape from '../../propTypes/QuestionDetailsShape'
import React from 'react'
import { formatDateTime } from '../../util/date-time-util'

const propTypes = QuestionDetailsShape;

class QuestionDetails extends PureComponent {
    render() {
        const { user, text, dateTimeAsked } = this.props;

        return (
            <div className="questionDetails-question">
                {text}
                <p className="appItemMeta">
                    {formatDateTime(dateTimeAsked)} by {user}
                </p>
            </div>
        );
    }
}

QuestionDetails.propTypes = propTypes;

export default QuestionDetails