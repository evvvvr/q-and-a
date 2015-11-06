import React from 'react';
import { compareItemsChronologically, formatDateTime } from '../../util/date-time-util';

export default class AnswerList extends React.Component {
    render() {
        let content;

        if (this.props.answers.length) {
            const answerNodes = this.props.answers
                    .sort((a, b) => compareItemsChronologically(
                        a.dateTimeAnswered,
                        b.dateTimeAnswered
                    ))
                    .map((answer) => (
                        <li key={answer.id} className="appItem">
                            {answer.text}
                            <p className="appItemMeta">
                                {formatDateTime(answer.dateTimeAnswered)} by {answer.user}
                            </p>
                        </li>
                    ));

            const answersNumeral = this.props.answers.length > 1
                ? 'Answers' : 'Answer';

            content = (
                <div>
                    <h4>
                        {this.props.answers.length} {answersNumeral}
                    </h4>
                    <ul className="appItemList">
                        {answerNodes}
                    </ul>
                </div>
            );
        } else {
            content = (<div></div>);
        }

        return content;
    }
}