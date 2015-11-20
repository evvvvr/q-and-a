import React from 'react';
import TextAreaInput from '../common/TextAreaInput';
import TextInput from '../common/TextInput';
import { ErrorTypes } from '../../validation/errors';

export default class AnswerForm extends React.Component {
    handleUserNameBlur(eventArgs) {
        this.props.onUserNameBlur({
            user: eventArgs.value.trim()
        });
    }

    handleUserNameChange(eventArgs) {
        this.props.onAnswerChange({
            answer: {
                user: eventArgs.value.trim(),
                text: this.refs.text.getValue()
            }
        });
    }

    handleTextBlur(eventArgs) {
        this.props.onTextBlur({
            text: eventArgs.value.trim()
        });
    }

    handleTextChange(eventArgs) {
        this.props.onAnswerChange({
            answer: {
                user: this.refs.userName.getValue().trim(),
                text: eventArgs.value.trim()
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onAnswerSubmit({
            answer: {
                user: this.refs.userName.getValue().trim(),
                text: this.refs.text.getValue().trim()
            }
        });
    }

    render() {
        let textError, userNameError;

        if (this.props.errors) {
            if (this.props.errors.user) {
                userNameError = this.props.errors.user
                    .map(e => e.message)
                    .reduce(
                        (prev, current) => prev + ' ' + current,
                        ''
                    );                                
            }

            if (this.props.errors.text) {
                textError = this.props.errors.text
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
                        value={this.props.user}
                        error={userNameError}
                        onBlur={this.handleUserNameBlur.bind(this)}
                        onChange={this.handleUserNameChange.bind(this)}
                    />
                    <TextAreaInput
                        ref="text"
                        placeholder="Your Answer"
                        value={this.props.text}
                        error={textError}
                        onBlur={this.handleTextBlur.bind(this)}
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