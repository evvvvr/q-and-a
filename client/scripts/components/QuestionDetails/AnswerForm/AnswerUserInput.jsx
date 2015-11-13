import classNames from 'classnames';
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
        const className = classNames({
            'pure-input-2-3': true,
            'invalidElement': this.props.error
        });

        let errorMessage;

        if (this.props.error) {
            errorMessage = <div className="errorMessage">{this.props.error}</div>;
        }

        return (
            <div>
                {errorMessage}
                <input
                    className={className}
                    type="text"
                    placeholder="Your name"
                    value={this.props.value}
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        );
    }
}