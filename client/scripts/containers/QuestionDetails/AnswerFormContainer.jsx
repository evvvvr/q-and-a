import AnswerForm from '../../components/QuestionDetails/AnswerForm';
import React, { PropTypes } from 'react';
import Store from '../../Store';
import { changeAnswerUsername, changeAnswerText, submitAnswer } from '../../actions/answer-actions';

const propTypes = {
    questionId: PropTypes.number.isRequired
};

class AnswerFormContainer extends React.Component {
    handleUsernameChange(eventArgs) {
        Store.dispatch(changeAnswerUsername(eventArgs.username));
    }

    handleTextChange(eventArgs) {
        Store.dispatch(changeAnswerText(eventArgs.text));
    }

    handleSubmit(eventArgs) {
        Store.dispatch(submitAnswer(
            this.props.questionId,
            eventArgs.answer
        ));
    }

    render() {
        const containerState = Store.getState().answer;

        return (
            <AnswerForm
                username={containerState.data.user}
                text={containerState.data.text}
                errors={containerState.errors}
                onUsernameChange={this.handleUsernameChange.bind(this)}
                onTextChange={this.handleTextChange.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
            />
        );
    }
};

AnswerForm.propTypes = propTypes;

export default AnswerFormContainer;