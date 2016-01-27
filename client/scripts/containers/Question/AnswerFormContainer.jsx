import AnswerForm from '../../components/Question/AnswerForm';
import React, { PropTypes } from 'react';
import { changeAnswerUsername, changeAnswerText, submitAnswer, cleanAnswer } from '../../actions/answer';
import { connect } from 'react-redux';

const propTypes = {
    questionId: PropTypes.number.isRequired,
    errors: PropTypes.object,
    data: PropTypes.object
};

class AnswerFormContainer extends React.Component {
    componentWillUnmount() {
        const { dispatch } = this.props;

        dispatch(cleanAnswer());        
    }

    handleUsernameChange(eventArgs) {
        const { dispatch } = this.props;

        dispatch(changeAnswerUsername(eventArgs.username));
    }

    handleTextChange(eventArgs) {
        const { dispatch } = this.props;

        dispatch(changeAnswerText(eventArgs.text));
    }

    handleSubmit(eventArgs) {
        const { dispatch, questionId } = this.props;

        dispatch(submitAnswer(
            questionId,
            eventArgs.answer
        ));
    }

    render() {
        const errors   = this.props.errors;
        const username = this.props.data.get('user');
        const text     = this.props.data.get('text');

        return (
            <AnswerForm
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

AnswerFormContainer.propTypes = propTypes;

function select(state) {
    return {
        questionId: state.question.getIn(['data', 'id']),
        errors: state.answer.get('errors'),
        data: state.answer.get('data')
    };
}

export default connect(select) (AnswerFormContainer);