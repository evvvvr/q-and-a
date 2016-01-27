import PureComponent from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { formatDateTime } from '../../util/date-time-util';

const propTypes = {
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    dateTimeAsked: PropTypes.string.isRequired,
};

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

export default QuestionDetails;