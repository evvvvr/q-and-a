import AnswerTextInput from './AnswerTextInput';
import AnswerUserInput from './AnswerUserInput';
import React from 'react';

export default class AnswerForm extends React.Component {
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
                        value={this.props.answerUser}
                        onChange={this.props.onAnswerUserChange}
                    />
                    <AnswerTextInput
                        ref="text"
                        value={this.props.answerText}
                        onChange={this.props.onAnswerTextChange}
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