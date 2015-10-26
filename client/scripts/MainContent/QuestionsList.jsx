import React from 'react';
import QuestionItem from './QuestionItem';

export default class QuestionsList extends React.Component {
    render() {
        const questionNodes = this.props.questions.map((question) => {
            return (
                <QuestionItem
                    key={question.id}
                    text={question.text}
                    dateTimeAsked={question.dateTimeAsked}
                    user={question.user}
                />
            );
        });

        return <ul className="listOfAppItems">{questionNodes}</ul>;
    }  
}