import AskQuestionForm from '../../components/AskQuestionForm';
import React, { PropTypes } from 'react';
import { changeQuestionUsername, changeQuestionText, submitQuestion, cleanQuestionToSubmit } from '../../actions/questionToSubmit';
import { connect } from 'react-redux';

const propTypes = {
    username: PropTypes.string,
    text: PropTypes.string,
    errors: PropTypes.object
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
        const { username, text, errors } = this.props;

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
};

AskQuestionFormContainer.propTypes = propTypes;

function select(state) {
    return {
        username: state.questionToSubmit.data.user,
        text: state.questionToSubmit.data.text,
        errors: state.questionToSubmit.errors
    };
}

export default connect(select) (AskQuestionFormContainer);