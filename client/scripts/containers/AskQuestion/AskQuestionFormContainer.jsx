import AskQuestionForm from '../../components/AskQuestionForm';
import React, { PropTypes } from 'react';
import { changeQuestionUsername, changeQuestionText, submitQuestion, cleanQuestionToSubmit } from '../../actions/questionToSubmit';
import { connect } from 'react-redux';

const propTypes = {
    errors: PropTypes.object,
    data: PropTypes.object
};

class AskQuestionFormContainer extends React.Component {
    componentWillUnmount() {
        const { dispatch } = this.props;

        dispatch(cleanQuestionToSubmit());
    }

    handleUsernameChange(eventArgs) {
        const { dispatch } = this.props;

        dispatch(changeQuestionUsername(eventArgs.username));
    }

    handleTextChange(eventArgs) {
        const { dispatch } = this.props;

        dispatch(changeQuestionText(eventArgs.text));
    }

    handleSubmit(eventArgs) {
        const { dispatch } = this.props;

        dispatch(submitQuestion(eventArgs.question));
    }

    render() {
        const errors   = this.props.errors;
        const username = this.props.data.get('user');
        const text     = this.props.data.get('text');

        return (
            <AskQuestionForm
                username={username}
                text={text}
                errors={errors}
                onUsernameChange={this.handleUsernameChange.bind(this)}
                onTextChange={this.handleTextChange.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
            />
        );
    }
}

AskQuestionFormContainer.propTypes = propTypes;

function select(state) {
    return {
        errors: state.questionToSubmit.get('errors'),
        data: state.questionToSubmit.get('data')
    };
}

export default connect(select) (AskQuestionFormContainer);