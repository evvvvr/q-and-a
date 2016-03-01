import PureComponent from 'react-pure-render/component'
import QuestionDetailsShape from '../../propTypes/QuestionDetailsShape'
import React from 'react'
import { formatDateTimeForHuman } from '../../util/date-time-util'

const propTypes = QuestionDetailsShape;

class QuestionDetails extends PureComponent {
    render() {
        const { user, text, dateTimeAsked } = this.props;

        return (
            <div>
                <div class="appItemFullText">
                    {text}
                </div>
                <p className="appItemMeta">
                    {formatDateTimeForHuman(dateTimeAsked)} by {user}
                </p>
            </div>
        );
    }
}

QuestionDetails.propTypes = propTypes;

export default QuestionDetails