import AnswerForm from '../../components/Question/AnswerForm';
import React, { PropTypes } from 'react';
import { changeAnswerUsername, changeAnswerText, submitAnswer } from '../../actions/answer';
import { connect } from 'react-redux';

const propTypes = {
    questionId: PropTypes.number.isRequired,
    username: PropTypes.string,
    text: PropTypes.string,
    errors: PropTypes.object
};

class AnswerFormContainer extends React.Component {
    handleUsernameChange(eventArgs) {
        const { dispatch } = this.props;

        dispatch(changeAnswerUsername(eventArgs.username));
    }

    handleTextChange(eventArgs) {
        const { dispatch } = this.props;

        dispatch(changeAnswerText(eventArgs.text));
    }

    handleSubmit(eventArgs) {
        const { dispatch, questionId } = this.props;

        dispatch(submitAnswer(
            questionId,
            eventArgs.answer
        ));
    }

    render() {
        const { username, text, errors } = this.props;

        return (
            <AnswerForm
                username={username}
                text={text}
                errors={errors}
                onUsernameChange={this.handleUsernameChange.bind(this)}
                onTextChange={this.handleTextChange.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
            />
        );
    }
};

AnswerFormContainer.propTypes = propTypes;

function select(state) {
    return {
        questionId: state.question.data.id,
        username: state.answer.data.user,
        text: state.answer.data.text,
        errors: state.answer.errors
    };
}

export default connect(select) (AnswerFormContainer);