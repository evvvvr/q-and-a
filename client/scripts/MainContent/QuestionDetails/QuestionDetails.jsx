import AnswerForm from './AnswerForm';
import AnswerList from './AnswerList';
import React from 'react';
import { formatDateTime } from '../../util/date-time-util';

export default class QuestionDetails extends React.Component {
    onAnswerSubmit(eventArgs) {
        this.props.onAnswerSubmit({
            questionId: this.props.id,
            answer: eventArgs
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
                <AnswerForm onAnswerSubmit={this.onAnswerSubmit.bind(this)} />
            </div>
        );
    }
}