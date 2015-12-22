import AnswerFormContainer from './AnswerFormContainer';
import AnswerList from '../../components/QuestionDetails/AnswerList/AnswerList';
import Question from '../../components/QuestionDetails/Question';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
    id: PropTypes.number.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    username: PropTypes.string,
    text: PropTypes.string,
    dateTimeAsked: PropTypes.string,
    answers: PropTypes.arrayOf(React.PropTypes.object) 
};

class QuestionDetails extends React.Component {
    render () {
        const { isFetching, id, username, text, dateTimeAsked, answers } = this.props;

        // If fetching question data or just selected question details 
        // screen w/o data and not loading it
        if (isFetching || !text) {
            return <div className="questionDetails"></div>;
        } else {
            return (
                <div className="questionDetails">
                    <Question
                        username={username}
                        text={text}
                        dateTimeAsked={dateTimeAsked}
                    />
                    <AnswerList answers={answers} />
                    <AnswerFormContainer />
                </div>
            ); 
        }
    }
};

QuestionDetails.propTypes = propTypes;

function select(state) {
    return {
        id: state.question.data.id,
        isFetching: state.question.isFetching,
        username: state.question.data.user,
        text: state.question.data.text,
        dateTimeAsked: state.question.data.dateTimeAsked,
        answers: state.question.data.answers 
    };
}

export default connect(select) (QuestionDetails);