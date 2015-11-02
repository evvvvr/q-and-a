import React from 'react';

export default class AskQuestionForm extends React.Component {
    render() {
        return (
            <form className="pure-form pure-form-stacked">
                <fieldset>
                    <legend>Ask Your Question</legend>
                    <input
                        className="pure-input-2-3"
                        type="text"
                        name="userName"
                        placeholder="Your name"
                    />
                    <textarea
                        className="pure-input-2-3 textarea-text"
                        name="answerText"
                        placeholder="Your Question"
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