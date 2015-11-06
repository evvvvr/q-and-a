import React from 'react';

export default class AskQuestionForm extends React.Component {
    handleSubmit(event) {
        event.preventDefault();

        this.props.onQuestionSubmit({
            user: this.refs.userName.value,
            text: this.refs.text.value
        });
    }

    render() {
        return (
            <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                    <legend>Ask Your Question</legend>
                    <input
                        className="pure-input-2-3"
                        type="text"
                        placeholder="Your name"
                        ref="userName"
                    />
                    <textarea
                        className="pure-input-2-3 textarea-text"
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