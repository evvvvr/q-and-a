import QuestionListItem from './QuestionListItem';
import React from 'react';
import { compareItemsChronologically } from '../../util/date-time-util';

export default class QuestionList extends React.Component {
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
                    text={question.text}
                    dateTimeAsked={question.dateTimeAsked}
                    user={question.user}
                    onQuestionSelected={this.props.onQuestionSelected}
                />
            ));

        return <ul className="appItemList">{questionNodes}</ul>;
    }  
}