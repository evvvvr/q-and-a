import classNames from 'classnames';
import React from 'react';
import TextAreaInput from './common/TextAreaInput';
import TextInput from './common/TextInput';
import { ErrorTypes } from '../validation/errors';

export default class AskQuestionForm extends React.Component {
    handleUserNameChange(eventArgs) {
        this.props.onQuestionChange({
            question: {
                user: eventArgs.value.trim(),
                text: this.refs.text.getValue()
            }
        });
    }

    handleTextChange(eventArgs) {
        this.props.onQuestionChange({
            question: {
                user: this.refs.userName.getValue().trim(),
                text: eventArgs.value.trim()
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onQuestionSubmit({
            question: {
                user: this.refs.userName.getValue().trim(),
                text: this.refs.text.getValue().trim()                
            }
        });
    }

    render() {
        let textError, userNameError;

        if (this.props.errors) {
            this.props.errors.forEach(error => {
                switch (error.type) {
                    case ErrorTypes.UserIsEmpty:
                    case ErrorTypes.UserIsTooLong:
                        userNameError = error.message;
                        break;

                    case ErrorTypes.TextIsEmpty:
                    case ErrorTypes.TextIsTooLong:
                        textError = error.message;
                        break;
                }
            });
        }

        return (
            <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                    <legend>Ask Your Question</legend>
                    <TextInput
                        ref="userName"
                        placeholder="Your Name"
                        value={this.props.user}
                        error={userNameError}
                        onChange={this.handleUserNameChange.bind(this)}
                    />
                    <TextAreaInput
                        ref="text"
                        placeholder="Your Answer"
                        value={this.props.text}
                        error={textError}
                        onChange={this.handleTextChange.bind(this)}
                    />
                    <input
                        className="pure-button pure-button-primary"
                        type="submit"
                        value="Post Your Question"
                    />
                </fieldset>
            </form>
        );
    }
}