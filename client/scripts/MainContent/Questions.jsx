import React from 'react';
import QuestionList from './QuestionList/QuestionList';

export default class Questions extends React.Component {
    handleQuestionSelected(eventArgs) {
        this.props.onQuestionSelected(eventArgs);
    }

    render() {
        return (
            <div>
                <h3>{this.props.header}</h3>
                <QuestionList
                    questions={this.props.questions}
                    onQuestionSelected={this.handleQuestionSelected.bind(this)}
                />
            </div>
        );
    }
}