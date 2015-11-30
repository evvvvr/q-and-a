import React, { PropTypes } from 'react';
import TextAreaInput from '../common/TextAreaInput';
import TextInput from '../common/TextInput';

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

class AnswerForm extends React.Component {
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
        const errors = this.props.errors;
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
                        ref="username"
                        placeholder="Your Name"
                        value={this.props.username}
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
                        value="Post Your Answer"
                    />
                </fieldset>
            </form>
        );
    }
};

AnswerForm.propTypes = propTypes;
AnswerForm.defaultProps = defaultProps;

export default AnswerForm;