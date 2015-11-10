import React from 'react';

export default class AnswerUserInput extends React.Component {
    handleChange(event) {
        this.props.onChange({
            user: event.target.value
        });
    }

    getValue() {
        return this.props.value;
    }

    render() {
        return (
            <input
                className="pure-input-2-3"
                type="text"
                placeholder="Your name"
                value={this.props.value}
                onChange={this.handleChange.bind(this)}
            />
        );
    }
}