import AnswerListItem from './AnswerListItem';
import React, { PropTypes } from 'react';
import { compareItemsChronologically } from '../../../util/date-time-util';

const propTypes = {
    answers: PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

class AnswerList extends React.Component {
    render() {
        let content;

        const answerNodes = this.props.answers
            .sort((a, b) => compareItemsChronologically(
                a.dateTimeAnswered,
                b.dateTimeAnswered
            ))
            .map((answer) => {
                const { id, ...answerProps } = answer;

                return <AnswerListItem key={id} answerId={id} {...answerProps} />;
            });

        if (this.props.answers.length) {
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

AnswerList.propTypes = propTypes;

export default AnswerList;