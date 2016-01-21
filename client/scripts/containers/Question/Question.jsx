import AnswerFormContainer from './AnswerFormContainer';
import AnswersList from '../../components/Question/AnswersList/AnswersList';
import QuestionDetails from '../../components/Question/QuestionDetails';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    data: PropTypes.object,
    error: PropTypes.object
};

class Question extends React.Component {
    render () {
        const { isFetching, data, error } = this.props;

        if (isFetching) {
            return <div className="questionDetails"></div>;
        } else if (error) {
            if (error.status === 404) {
                return <div>Sorry, question not found</div>;
            } else {
                return <div>Sorry, something went wrong</div>; 
            }
        } else {
            return (
                <div className="questionDetails">
                    <QuestionDetails
                        user={data.get('user')}
                        text={data.get('text')}
                        dateTimeAsked={data.get('dateTimeAsked')}
                    />
                    <AnswersList answers={data.get('answers')} />
{/*                    <AnswerFormContainer />*/}
                </div>
            ); 
        }
    }
}

Question.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        isFetching: state.question.get('isFetching'),
        data: state.question.get('data'),
        error: state.question.get('error')
    };
}

export default connect(mapStateToProps) (Question);