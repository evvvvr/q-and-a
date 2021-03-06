import AnswerForm from '../../components/Question/AnswerForm'
import AnswerToSubmitErrorShape from '../../propTypes/AnswerToSubmitErrorShape'
import AnswerToSubmitShape from '../../propTypes/AnswerToSubmitShape'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'
import { changeAnswerUsername, changeAnswerText, submitAnswer, cleanAnswer } from '../../actions/answer'
import { connect } from 'react-redux'

const propTypes = {
    questionId: PropTypes.number.isRequired,
    errors: ImmutablePropTypes.contains(AnswerToSubmitErrorShape).isRequired,
    data: ImmutablePropTypes.contains(AnswerToSubmitShape).isRequired
};

class AnswerFormContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleTextChange     = this.handleTextChange.bind(this);
        this.handleSubmit         = this.handleSubmit.bind(this);
    }

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
                onUsernameChange={this.handleUsernameChange}
                onTextChange={this.handleTextChange}
                onSubmit={this.handleSubmit}
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