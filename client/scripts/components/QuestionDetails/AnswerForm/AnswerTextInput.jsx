import classNames from 'classnames';
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
        const className = classNames({
            'pure-input-2-3 textarea-text': true,
            'invalidElement': this.props.error
        });

        let errorMessage;

        if (this.props.error) {
            errorMessage = <div className="errorMessage">{this.props.error}</div>;
        }

        return (
            <div>
                {errorMessage}
                <textarea
                    className={className}
                    placeholder="Your Answer"
                    value={this.props.value}
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        );
    }
}