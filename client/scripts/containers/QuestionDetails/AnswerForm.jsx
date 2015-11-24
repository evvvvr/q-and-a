import React, { PropTypes } from 'react';
import Store from '../../Store';
import TextAreaInput from '../../components/common/TextAreaInput';
import TextInput from '../../components/common/TextInput';
import { changeAnswerUsername, changeAnswerText, submitAnswer } from '../../actions/answer-actions';
import { ErrorTypes } from '../../validation/errors';

const propTypes = {
    questionId: PropTypes.number.isRequired
};

class AnswerForm extends React.Component {
    handleUserNameChange(eventArgs) {
        Store.dispatch(changeAnswerUsername(eventArgs.value.trim()));
    }

    handleTextChange(eventArgs) {
        Store.dispatch(changeAnswerText(eventArgs.value.trim()));
    }

    handleSubmit(event) {
        event.preventDefault();

        Store.dispatch(submitAnswer(
            this.props.questionId,
            {
                user: this.refs.userName.getValue().trim(),
                text: this.refs.text.getValue().trim()
            }
        ));
    }

    render() {
        const containerState = Store.getState().answer;
        const errors = containerState.errors;

        let textError, userNameError;

        if (errors) {
            if (errors.user) {
                userNameError = errors.user
                    .map(e => e.message)
                    .reduce(
                        (prev, current) => prev + ' ' + current,
                        ''
                    );                                
            }

            if (errors.text) {
                textError = errors.text
                    .map(e => e.message)
                    .reduce(
                        (prev, current) => prev + ' ' + current,
                        ''
                    );                                
            }
        }

        return (
            <form
                className="pure-form pure-form-stacked"
                onSubmit={this.handleSubmit.bind(this)}
            >
                <fieldset>
                    <legend>Your Answer</legend>
                    <TextInput
                        ref="userName"
                        placeholder="Your Name"
                        value={containerState.data.user}
                        error={userNameError}
                        onChange={this.handleUserNameChange.bind(this)}
                    />
                    <TextAreaInput
                        ref="text"
                        placeholder="Your Answer"
                        value={containerState.data.text}
                        error={textError}
                        onChange={this.handleTextChange.bind(this)}
                    />
                    <input
                        className="pure-button pure-button-primary"
                        type="submit"
                        value="Post Your Answer"
                    />
                </fieldset>
            </form>
        );
    }
}

AnswerForm.propTypes = propTypes;

export default AnswerForm;