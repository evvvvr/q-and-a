import AnswerFormContainer from './AnswerFormContainer';
import AnswersList from '../../components/Question/AnswersList/AnswersList';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureComponent from 'react-pure-render/component';
import QuestionDetails from '../../components/Question/QuestionDetails';
import QuestionDetailsShape from '../../propTypes/QuestionDetailsShape';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
    isFetching  : PropTypes.bool.isRequired,
    data        : ImmutablePropTypes.contains(QuestionDetailsShape),
    error       : PropTypes.object
};

class Question extends PureComponent {
    render () {
        const { isFetching, data, error } = this.props;

        if (isFetching) {
            return <div className="questionDetails"></div>;
        } else if (error) {
            if (error.get('status') === 404) {
                return <div>Sorry, question not found</div>;
            } else {
                return <div>Sorry, something went wrong</div>; 
            }
        } else {
            const username      = this.props.data.get('user');
            const text          = this.props.data.get('text');
            const dateTimeAsked = this.props.data.get('dateTimeAsked');
            const answers       = data.get('answers');

            return (
                <div className="questionDetails">
                    <QuestionDetails
                        user={username}
                        text={text}
                        dateTimeAsked={dateTimeAsked}
                    />
                    <AnswersList answers={answers} />
                    <AnswerFormContainer />
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