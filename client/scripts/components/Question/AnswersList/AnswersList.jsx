import AnswersListItem from './AnswersListItem';
import React, { PropTypes } from 'react';
import { compareItemsChronologically } from '../../../util/date-time-util';

const propTypes = {
    answers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class AnswersList extends React.Component {
    render() {
        const { answers } = this.props;

        let content;

        const answerNodes = answers
            .sort((a, b) => compareItemsChronologically(
                a.dateTimeAnswered,
                b.dateTimeAnswered
            ))
            .map((answer) => {
                const { id, ...answerProps } = answer;

                return <AnswersListItem key={id} answerId={id} {...answerProps} />;
            });

        if (this.props.answers.length) {
            const answersNumeral = answers.length > 1
                ? 'Answers' : 'Answer';

            content = (
                <div>
                    <h4>
                        {answers.length} {answersNumeral}
                    </h4>
                    <ul className="appItemList">
                        {answerNodes}
                    </ul>
                </div>
            );
        } else {
            content = (<div>There's no answers</div>);
        }

        return content;
    }
};

AnswersList.propTypes = propTypes;

export default AnswersList;