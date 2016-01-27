import PureComponent from 'react-pure-render/component';
import QuestionsListItem from './QuestionsListItem';
import React, { PropTypes } from 'react';
import { compareItemsChronologically } from '../../util/date-time-util';

const propTypes = {
    questions: PropTypes.object.isRequired,
};

class QuestionsList extends PureComponent {
    render() {
        const questionNodes = this.props.questions
            .sort((a, b) => compareItemsChronologically(
                a.get('dateTimeAsked'),
                b.get('dateTimeAsked')
            ))
            .map((question) => {
                const id            = question.get('id');
                const text          = question.get('text');
                const dateTimeAsked = question.get('dateTimeAsked'); 
                const user          = question.get('user');

                return (
                    <QuestionsListItem
                        key={id}
                        questionId={id}
                        text={text}
                        dateTimeAsked={dateTimeAsked}
                        user={user}
                    />
                );
            });

        return <ul className="appItemList">{questionNodes}</ul>;
    }  
}

QuestionsList.propTypes = propTypes;

export default QuestionsList;