import React, { PropTypes } from 'react';
import { formatDateTime } from '../../util/date-time-util';

const propTypes = {
    questionId: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    dateTimeAsked: PropTypes.string.isRequired,
    onQuestionSelected: PropTypes.func
};

const defaultProps = {
    onQuestionSelected: () => {}
};

class QuestionListItem extends React.Component {
    handleClick() {
        this.props.onQuestionSelected({
                questionId: this.props.questionId
        });
    }

    render() {
        return (
            <li className="appItem">
                <a
                    href="#"
                    className="appItem-detailsLink"
                    onClick={this.handleClick.bind(this)}>
                    {this.props.text}
                </a>
                <p className="appItemMeta">
                    {formatDateTime(this.props.dateTimeAsked)} by {this.props.user}
                </p>
            </li>
        );
    }
};

QuestionListItem.propTypes = propTypes;
QuestionListItem.defaultProps = defaultProps;

export default QuestionListItem;