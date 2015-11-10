import QuestionList from './QuestionList/QuestionList';
import React from 'react';

export default class Questions extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.header}</h3>
                <QuestionList
                    questions={this.props.questions}
                    onQuestionSelected={this.props.onQuestionSelected}
                />
            </div>
        );
    }
}