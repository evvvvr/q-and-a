import QuestionList from '../components/QuestionList/QuestionList';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectQuestion, fetchQuestion } from '../actions/question-actions';

const propTypes = {
    header: PropTypes.string,
    questions: PropTypes.arrayOf(React.PropTypes.object).isRequired
};

class Questions extends React.Component {
    handleQuestionSelected(eventArgs) {
        const { dispatch } = this.props;

        dispatch(selectQuestion(eventArgs.questionId));
        dispatch(fetchQuestion(eventArgs.questionId));
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

export default connect((state) => { return {} }) (Questions);