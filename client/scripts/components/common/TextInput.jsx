import classNames from 'classnames';
import React, { PropTypes } from 'react';

const propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    error: PropTypes.string
};

const defaultProps = {
    onBlur: () => {},
    onChange: () => {}
};

class TextInput extends React.Component {
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
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                />
            </div>
        );
    }
}

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default TextInput;