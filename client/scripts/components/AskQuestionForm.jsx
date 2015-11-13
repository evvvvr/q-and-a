import classNames from 'classnames';
import React from 'react';
import { ErrorTypes } from '../validation/errors';

export default class AskQuestionForm extends React.Component {
    handleSubmit(event) {
        event.preventDefault();

        this.props.onQuestionSubmit({
            question: {
                user: this.refs.userName.value.trim(),
                text: this.refs.text.value                
            }
        });
    }

    render() {
        let isUserValid = true;
        let isTextValid = true;
        let userValidationMessage, textValidationMessage;

        if (this.props.errors) {
            this.props.errors.forEach(error => {
                switch (error.type) {
                    case ErrorTypes.UserIsEmpty:
                    case ErrorTypes.UserIsTooLong:
                        isUserValid = false;
                        userValidationMessage = (
                            <div className="errorMessage">{error.message}</div>
                        );
                        break;

                    case ErrorTypes.TextIsEmpty:
                    case ErrorTypes.TextIsTooLong:
                        isTextValid = false;
                        textValidationMessage = (
                            <div className="errorMessage">{error.message}</div>
                        );
                        break;
                }
            });
        }

        const userInputClassName = classNames({
            'pure-input-2-3': true,
            'invalidElement': !isUserValid
        });

        const textInputClassName = classNames({
            'pure-input-2-3 textarea-text': true,
            'invalidElement': !isTextValid
        });

        return (
            <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                    <legend>Ask Your Question</legend>
                    {userValidationMessage}
                    <input
                        className={userInputClassName}
                        type="text"
                        placeholder="Your name"
                        ref="userName"
                    />
                    {textValidationMessage}
                    <textarea
                        className={textInputClassName}
                        placeholder="Your Question"
                        ref="text"
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