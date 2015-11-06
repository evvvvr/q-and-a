import React from 'react';

export default class AnswerForm extends React.Component {
    handleSubmit(event) {
        event.preventDefault();

        this.props.onAnswerSubmit({
            user: this.refs.userName.value,
            text: this.refs.text.value  
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
                    <input
                        className="pure-input-2-3"
                        type="text"
                        placeholder="Your name"
                        ref="userName"
                    />
                    <textarea
                        className="pure-input-2-3 textarea-text"
                        placeholder="Your Answer"
                        ref="text"
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