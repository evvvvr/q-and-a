import QuestionListItem from './QuestionListItem';
import React, { PropTypes } from 'react';
import { compareItemsChronologically } from '../../util/date-time-util';

const propTypes = {
    questions: PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onQuestionSelected: PropTypes.func
};

class QuestionList extends React.Component {
    render() {
        const questionNodes = this.props.questions
            .sort((a, b) => compareItemsChronologically(
                a.dateTimeAsked,
                b.dateTimeAsked
            ))
            .map((question) => (
                <QuestionListItem
                    key={question.id}
                    questionId={question.id}
                    user={question.user}
                    text={question.text}
                    dateTimeAsked={question.dateTimeAsked}
                    onQuestionSelected={this.props.onQuestionSelected}
                />
            ));

        return <ul className="appItemList">{questionNodes}</ul>;
    }  
}

QuestionList.propTypes = propTypes;

export default QuestionList;