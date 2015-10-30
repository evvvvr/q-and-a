import React from 'react';

export default class AnswerForm extends React.Component {
    render() {
        return (
            <form className="pure-form pure-form-stacked">
                <fieldset>
                    <legend>Your Answer</legend>
                    <input
                        className="pure-input-2-3"
                        type="text"
                        name="userName"
                        placeholder="Your name"
                    />
                    <textarea
                        className="pure-input-2-3 textarea-text"
                        name="answerText"
                        placeholder="Your Answer"
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