import QuestionsListItem from './QuestionsListItem';
import React, { PropTypes } from 'react';
import { compareItemsChronologically } from '../../util/date-time-util';

const propTypes = {
    questions: PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

class QuestionsList extends React.Component {
    render() {
        const questionNodes = this.props.questions
            .sort((a, b) => compareItemsChronologically(
                a.dateTimeAsked,
                b.dateTimeAsked
            ))
            .map((question) => {
                const { id, text, dateTimeAsked, user } = question;

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