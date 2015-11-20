import QuestionList from '../components/QuestionList/QuestionList';
import React, { PropTypes } from 'react';
import Store from '../Store';
import { selectQuestion, fetchQuestion } from '../actions/question-actions';

const propTypes = {
    header: PropTypes.string,
    questions: PropTypes.arrayOf(React.PropTypes.object).isRequired
};

class Questions extends React.Component {
    handleQuestionSelected(eventArgs) {
        Store.dispatch(selectQuestion(eventArgs.questionId));
        Store.dispatch(fetchQuestion(eventArgs.questionId));
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

Questions.propTypes = propTypes;

export default Questions;