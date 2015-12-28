import AnswerFormContainer from './AnswerFormContainer';
import AnswersList from '../components/QuestionDetails/AnswersList/AnswersList';
import QuestionDetails from '../components/QuestionDetails/QuestionDetails';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    data: PropTypes.object,
};

class Question extends React.Component {
    render () {
        const { isFetching, data } = this.props;

        // If fetching question data or just selected question details 
        // screen w/o data and not loading it
        if (isFetching || !data.text) {
            return <div className="questionDetails"></div>;
        } else {
            return (
                <div className="questionDetails">
                    <QuestionDetails
                        {...data}
                    />
                    <AnswersList answers={data.answers} />
                </div>
            ); 
        }
    }
};

Question.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        isFetching: state.question.isFetching,
        data: state.question.data
    };
}

export default connect(mapStateToProps) (Question);