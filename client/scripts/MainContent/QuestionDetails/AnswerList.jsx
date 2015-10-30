import React from 'react';
import formatDateTime from '../../util/date-time-formatters';

export default class AnswerList extends React.Component {
    render() {
        const answerNodes = this.props.answers.map((answer) => (
                <li key={answer.id} className="appItem">
                    {answer.text}
                    <p className="appItemMeta">
                        {formatDateTime(answer.dateTimeAnswered)} by {answer.user}
                    </p>
                </li>
            )
        );

        const answersNumeral = this.props.answers.length > 1
            ? 'Answers' : 'Answer';

        return (
            <div>
                <h4>
                    {this.props.answers.length} {answersNumeral}
                </h4>
                <ul className="appItemList">
                    {answerNodes}
                </ul>
            </div>
        );
    }
}