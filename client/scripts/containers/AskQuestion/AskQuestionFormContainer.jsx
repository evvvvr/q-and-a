import AskQuestionForm from '../../components/AskQuestionForm';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureComponent from 'react-pure-render/component';
import QuestionToSubmitErrorShape from '../../propTypes/QuestionToSubmitErrorShape';
import QuestionToSubmitShape from '../../propTypes/QuestionToSubmitShape';
import React from 'react';
import { changeQuestionUsername, changeQuestionText, submitQuestion, cleanQuestionToSubmit } from '../../actions/questionToSubmit';
import { connect } from 'react-redux';

const propTypes = {
    errors  : ImmutablePropTypes.contains(QuestionToSubmitErrorShape).isRequired,
    data    : ImmutablePropTypes.contains(QuestionToSubmitShape).isRequired
};

class AskQuestionFormContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleTextChange     = this.handleTextChange.bind(this);
        this.handleSubmit         = this.handleSubmit.bind(this);
    }

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
                onUsernameChange={this.handleUsernameChange}
                onTextChange={this.handleTextChange}
                onSubmit={this.handleSubmit}
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