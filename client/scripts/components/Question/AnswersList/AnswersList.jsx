import AnswerShape from '../../../propTypes/AnswerShape';
import AnswersListItem from './AnswersListItem';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureComponent from 'react-pure-render/component';
import React  from 'react';
import { compareItemsChronologically } from '../../../util/date-time-util';

const propTypes = {
    answers : ImmutablePropTypes
                .listOf(ImmutablePropTypes.contains(AnswerShape))
                .isRequired
};

class AnswersList extends PureComponent {
    render() {
        const answers = this.props.answers;
        let content;

        const answerNodes = answers
            .sort((a, b) => compareItemsChronologically(
                a.get('dateTimeAnswered'),
                b.get('dateTimeAnswered')
            ))
            .map((answer) => {
                const id               = answer.get('id');
                const text             = answer.get('text');
                const dateTimeAnswered = answer.get('dateTimeAnswered');
                const user             = answer.get('user');

                return (
                    <AnswersListItem
                        key={id}
                        id={id}
                        text={text}
                        dateTimeAnswered={dateTimeAnswered}
                        user={user}
                    />
                );
            });

        if (answers.size) {
            const answersNumeral = answers.size > 1
                ? 'Answers' : 'Answer';

            content = (
                <div>
                    <h4>
                        {answers.size} {answersNumeral}
                    </h4>
                    <ul className="appItemList">
                        {answerNodes}
                    </ul>
                </div>
            );
        } else {
            content = <div />;
        }

        return content;
    }
}

AnswersList.propTypes = propTypes;

export default AnswersList;