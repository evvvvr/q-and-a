import AnswerTextInput from './AnswerTextInput';
import AnswerUserInput from './AnswerUserInput';
import React from 'react';
import { ErrorTypes } from '../../../validation/errors';

export default class AnswerForm extends React.Component {
    handleAnswerUserChange(event) {
        this.props.onAnswerChange({
            answer: {
                user: event.user.trim(),
                text: this.refs.text.getValue()
            }
        });
    }

    handleAnswerTextChange(event) {
        this.props.onAnswerChange({
            answer: {
                user: this.refs.user.getValue().trim(),
                text: event.text
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onAnswerSubmit({
            answer: {
                user: this.refs.user.getValue().trim(),
                text: this.refs.text.getValue()
            }
        });
    }

    render() {
        let textError, userError;

        if (this.props.errors) {
            this.props.errors.forEach(error => {
                switch (error.type) {
                    case ErrorTypes.UserIsEmpty:
                    case ErrorTypes.UserIsTooLong:
                        userError = error.message;
                        break;

                    case ErrorTypes.TextIsEmpty:
                    case ErrorTypes.TextIsTooLong:
                        textError = error.message;
                        break;
                }
            });
        }

        return (
            <form
                className="pure-form pure-form-stacked"
                onSubmit={this.handleSubmit.bind(this)}
            >
                <fieldset>
                    <legend>Your Answer</legend>
                    <AnswerUserInput
                        ref="user"
                        value={this.props.user}
                        error={userError}
                        onChange={this.handleAnswerUserChange.bind(this)}
                    />
                    <AnswerTextInput
                        ref="text"
                        value={this.props.text}
                        error={textError}
                        onChange={this.handleAnswerTextChange.bind(this)}
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