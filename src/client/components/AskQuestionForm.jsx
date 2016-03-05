import classNames from 'classnames'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PureComponent from 'react-pure-render/component'
import QuestionToSubmitErrorShape from '../propTypes/QuestionToSubmitErrorShape'
import React, { PropTypes } from 'react'
import TextAreaInput from './common/TextAreaInput'
import TextInput from './common/TextInput'
import { ErrorTypes } from '../validation/errors'
import { getErrorsMessageFromErrorField } from '../validation/ValidationError'

const propTypes = {
    username: PropTypes.string,
    text: PropTypes.string,
    errors: ImmutablePropTypes.contains(QuestionToSubmitErrorShape).isRequired,
    onUsernameChange: PropTypes.func,
    onTextChange: PropTypes.func,
    onSubmit: PropTypes.func
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
            text: event.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit({
            question: {
                user: this.refs.username.getValue().trim(),
                text: this.refs.text.getValue()
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
                className="nameAndTextForm"
            >
                <fieldset>
                    <legend>Ask Your Question</legend>
                    <TextAreaInput
                        ref="text"
                        placeholder="Your Question"
                        value={text}
                        error={textErrorMessage}
                        onChange={this.handleTextChange}
                        className="nameAndTextForm-textInput nameAndTextForm-textTextAreaInput"
                    />
                    <TextInput
                        ref="username"
                        placeholder="Your Name"
                        value={username}
                        error={usernameErrorMessage}
                        onChange={this.handleUsernameChange}
                        className="nameAndTextForm-textInput"
                    />
                    <input
                        type="submit"
                        value="Post"
                        className="nameAndTextForm-postButton"
                    />
                </fieldset>
            </form>
        );
    }
}

AskQuestionForm.propTypes = propTypes;
AskQuestionForm.defaultProps = defaultProps;

export default AskQuestionForm