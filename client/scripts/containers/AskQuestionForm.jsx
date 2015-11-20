import classNames from 'classnames';
import React from 'react';
import Store from '../Store';
import TextAreaInput from '../components/common/TextAreaInput';
import TextInput from '../components/common/TextInput';
import { ErrorTypes } from '../validation/errors';
import { changeQuestionUsername, changeQuestionText, submitQuestion } from '../actions/question-to-submit-actions';

class AskQuestionForm extends React.Component {
    handleUsernameChange(eventArgs) {
        Store.dispatch(changeQuestionUsername(eventArgs.value.trim()));
    }

    handleTextChange(eventArgs) {
        Store.dispatch(changeQuestionText(eventArgs.value.trim()));
    }

    handleSubmit(event) {
        event.preventDefault();

        Store.dispatch(submitQuestion({
            user: this.refs.userName.getValue().trim(),
            text: this.refs.text.getValue().trim()                
        }));
    }

    render() {
        const containerState = Store.getState().questionToSubmit;
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
            <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                    <legend>Ask Your Question</legend>
                    <TextInput
                        ref="userName"
                        placeholder="Your Name"
                        value={containerState.data.user}
                        error={userNameError}
                        onChange={this.handleUsernameChange.bind(this)}
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
                        value="Post Your Question"
                    />
                </fieldset>
            </form>
        );
    }
}

export default AskQuestionForm;