import AnswerForm from './AnswerForm/AnswerForm';
import AnswerList from './AnswerList';
import React from 'react';
import { formatDateTime } from '../../util/date-time-util';

export default class QuestionDetails extends React.Component {
    onAnswerSubmit(eventArgs) {
        this.props.onAnswerSubmit({
            questionId: this.props.id,
            user: eventArgs.user,
            text: eventArgs.text
        });
    }

    render () {
        return (
            <div className="questionDetails">
                <div className="questionDetails-question">
                    {this.props.text}
                    <p className="appItemMeta">
                        {formatDateTime(this.props.dateTimeAsked)} by {this.props.user}
                    </p>
                </div>
                <AnswerList answers={this.props.answers} />
                <AnswerForm
                    answerUser={this.props.answerUser}
                    answerText={this.props.answerText}
                    onAnswerUserChange={this.props.onAnswerUserChange}
                    onAnswerTextChange={this.props.onAnswerTextChange}
                    onAnswerSubmit={this.onAnswerSubmit.bind(this)} />
            </div>
        );
    }
}