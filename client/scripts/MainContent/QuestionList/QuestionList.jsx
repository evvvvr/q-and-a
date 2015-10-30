import React from 'react';
import QuestionListItem from './QuestionListItem';

export default class QuestionList extends React.Component {
    handleQuestionSelected(eventArgs) {
        this.props.onQuestionSelected(eventArgs);
    }

    render() {
        const questionNodes = this.props.questions.map((question) => (
                <QuestionListItem
                    key={question.id}
                    questionId={question.id}
                    text={question.text}
                    dateTimeAsked={question.dateTimeAsked}
                    user={question.user}
                    onQuestionSelected={this.handleQuestionSelected.bind(this)}
                />
            )
        );

        return <ul className="appItemList">{questionNodes}</ul>;
    }  
}