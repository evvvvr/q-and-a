import React, { PropTypes } from 'react';
import { formatDateTime } from '../../util/date-time-util';

const propTypes = {
    text: PropTypes.string.isRequired,
    dateTimeAsked: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
};

class Question extends React.Component {
    render() {
        return (
            <div className="questionDetails-question">
                {this.props.text}
                <p className="appItemMeta">
                    {formatDateTime(this.props.dateTimeAsked)} by {this.props.user}
                </p>
            </div>
        );
    }
}

Question.propTypes = propTypes;

export default Question;