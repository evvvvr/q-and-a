import classNames from 'classnames';
import React, { PropTypes } from 'react';

const propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

const defaultProps = {
    onChange: () => {}
};

class TextAreaInput extends React.Component {
    handleBlur(event) {
        this.props.onBlur({
            value: event.target.value
        });
    }

    handleChange(event) {
        this.props.onChange({
            value: event.target.value
        });
    }

    getValue() {
        return this.props.value ? this.props.value : '';
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
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onBlur={this.handleBlur.bind(this)}
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        );
    }
}

TextAreaInput.propTypes = propTypes;
TextAreaInput.defaultProps = defaultProps;

export default TextAreaInput;