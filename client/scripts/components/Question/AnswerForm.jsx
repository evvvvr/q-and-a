import AnswerToSubmitErrorShape from '../../propTypes/AnswerToSubmitErrorShape'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'
import TextAreaInput from '../common/TextAreaInput'
import TextInput from '../common/TextInput'
import { getErrorsMessageFromErrorField } from '../../validation/ValidationError'

const propTypes = {
    username: PropTypes.string,
    text: PropTypes.string,
    errors: ImmutablePropTypes.contains(AnswerToSubmitErrorShape).isRequired,
    onUsernameChange: PropTypes.func,
    onTextChange: PropTypes.func,
    onSubmit: PropTypes.func
};

const defaultProps = {
    onUsernameChange: () => { },
    onTextChange: () => {},
    onSubmit: () => {}  
};

class AnswerForm extends PureComponent {
    constructor(props) {
        super(props);

        this.handleSubmit         = this.handleSubmit.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleTextChange     = this.handleTextChange.bind(this);
    }

    handleUserNameChange(event) {
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
            answer: {
                user: this.refs.username.getValue().trim(),
                text: this.refs.text.getValue().trim()
            }
        });
    }

    render() {
        const errors   = this.props.errors;
        const username = this.props.username;
        const text     = this.props.text;

        const usernameErrorMessage = getErrorsMessageFromErrorField(errors, 'user');
        const textErrorMessage     = getErrorsMessageFromErrorField(errors, 'text');

        return (
            <form
                onSubmit={this.handleSubmit}
            >
                <fieldset>
                    <legend>Your Answer</legend>
                    <TextInput
                        ref="username"
                        placeholder="Your Name"
                        value={username}
                        error={usernameErrorMessage}
                        onChange={this.handleUserNameChange}
                    />
                    <TextAreaInput
                        ref="text"
                        placeholder="Your Answer"
                        value={text}
                        error={textErrorMessage}
                        onChange={this.handleTextChange}
                    />
                    <input
                        type="submit"
                        value="Post Your Answer"
                    />
                </fieldset>
            </form>
        );
    }
}

AnswerForm.propTypes = propTypes;
AnswerForm.defaultProps = defaultProps;

export default AnswerForm