import AnswerTextInput from './AnswerTextInput';
import AnswerUserInput from './AnswerUserInput';
import React from 'react';

export default class AnswerForm extends React.Component {
    handleAnswerUserChange(event) {
        this.props.onAnswerChange({
            user: event.user.trim(),
            text: this.refs.text.getValue()
        });
    }

    handleAnswerTextChange(event) {
        this.props.onAnswerChange({
            user: this.refs.user.getValue().trim(),
            text: event.text
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onAnswerSubmit({
            user: this.refs.user.getValue().trim(),
            text: this.refs.text.getValue()
        });
    }

    render() {
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
                        onChange={this.handleAnswerUserChange.bind(this)}
                    />
                    <AnswerTextInput
                        ref="text"
                        value={this.props.text}
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