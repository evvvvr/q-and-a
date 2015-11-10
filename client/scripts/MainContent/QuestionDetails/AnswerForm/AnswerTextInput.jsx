import React from 'react';

export default class AnswerTextInput extends React.Component {
    handleChange(event) {
        this.props.onChange({
            text: event.target.value
        });
    }

    getValue() {
        return this.props.value;
    }

    render() {
        return (
            <textarea
                className="pure-input-2-3 textarea-text"
                placeholder="Your Answer"
                value={this.props.value}
                onChange={this.handleChange.bind(this)}
            />
        );
    }
}