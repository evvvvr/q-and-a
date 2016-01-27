import classNames from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureComponent from 'react-pure-render/component';
import QuestionToSubmitErrorShape from '../propTypes/QuestionToSubmitErrorShape';
import React, { PropTypes } from 'react';
import TextAreaInput from './common/TextAreaInput';
import TextInput from './common/TextInput';
import { ErrorTypes } from '../validation/errors';

const propTypes = {
    username            : PropTypes.string,
    text                : PropTypes.string,
    errors              : ImmutablePropTypes.contains(QuestionToSubmitErrorShape).isRequired,
    onUsernameChange    : PropTypes.func,
    onTextChange        : PropTypes.func,
    onSubmit            : PropTypes.func
};

const defaultProps = {
    onUsernameChange: () => { },
    onTextChange: () => {},
    onSubmit: () => {}  
};

class AskQuestionForm extends PureComponent {
    constructor(props) {
        super(props);

        this.handleSubmit         = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleTextChange     = this.handleTextChange.bind(this);
    }

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
        const errors   = this.props.errors;
        const username = this.props.username;
        const text     = this.props.text;

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
            <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Ask Your Question</legend>
                    <TextInput
                        ref="username"
                        placeholder="Your Name"
                        value={username}
                        error={usernameErrorMessage}
                        onChange={this.handleUsernameChange}
                    />
                    <TextAreaInput
                        ref="text"
                        placeholder="Your Answer"
                        value={text}
                        error={textErrorMessage}
                        onChange={this.handleTextChange}
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