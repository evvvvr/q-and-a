import AskQuestionForm from '../components/AskQuestionForm';
import React from 'react';
import Store from '../Store';
import { changeQuestionUsername, changeQuestionText, submitQuestion } from '../actions/question-to-submit-actions';

class AskQuestionFormContainer extends React.Component {
    handleUsernameChange(eventArgs) {
        Store.dispatch(changeQuestionUsername(eventArgs.username));
    }

    handleTextChange(eventArgs) {
        Store.dispatch(changeQuestionText(eventArgs.text));
    }

    handleSubmit(eventArgs) {
        Store.dispatch(submitQuestion(eventArgs.question));
    }

    render() {
        const containerState = Store.getState().questionToSubmit;

        return (
            <AskQuestionForm
                username={containerState.data.user}
                text={containerState.data.text}
                errors={containerState.errors}
                onUsernameChange={this.handleUsernameChange.bind(this)}
                onTextChange={this.handleTextChange.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
            />
        );
    }
};

export default AskQuestionFormContainer;