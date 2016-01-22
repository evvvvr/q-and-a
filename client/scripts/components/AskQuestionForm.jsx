import classNames from 'classnames';
import React, { PropTypes } from 'react';
import TextAreaInput from './common/TextAreaInput';
import TextInput from './common/TextInput';
import { ErrorTypes } from '../validation/errors';

const propTypes = {
    username: PropTypes.string,
    text: PropTypes.string,
    errors: PropTypes.object,
    onUsernameChange: PropTypes.func,
    onTextChange: PropTypes.func,
    onSubmit: PropTypes.func
};

const defaultProps = {
    onUsernameChange: () => { },
    onTextChange: () => {},
    onSubmit: () => {}  
};

class AskQuestionForm extends React.Component {
    handleUsernameChange(event) {
        this.props.onUsernameChange({
            username: event.value.trim()
        });
    }

    handleTextChange(event) {
        this.props.onTextChange({
            text: event.value.trim()
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit({
            question: {
                user: this.refs.username.getValue().trim(),
                text: this.refs.text.getValue().trim()
            }
        });
    }

    render() {
        const errors = this.props.errors;
        let textErrorMessage, usernameErrorMessage;

        if (errors) {
            const usernameErrors = errors.get('user');

            if (usernameErrors) {
                usernameErrorMessage = usernameErrors
                    .map(e => e.get('message'))
                    .reduce(
                        (prev, current) => prev + ' ' + current,
                        ''
                    );
            }

            const textErrors = errors.get('text');

            if (textErrors) {
                textErrorMessage = textErrors
                    .map(e => e.get('message'))
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
                        ref="username"
                        placeholder="Your Name"
                        value={this.props.username}
                        error={usernameErrorMessage}
                        onChange={this.handleUsernameChange.bind(this)}
                    />
                    <TextAreaInput
                        ref="text"
                        placeholder="Your Answer"
                        value={this.props.text}
                        error={textErrorMessage}
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

AskQuestionForm.propTypes = propTypes;
AskQuestionForm.defaultProps = defaultProps;

export default AskQuestionForm;