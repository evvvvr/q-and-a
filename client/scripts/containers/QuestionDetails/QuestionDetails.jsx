import AnswerForm from './AnswerForm';
import AnswerList from '../../components/QuestionDetails/AnswerList/AnswerList';
import Question from '../../components/QuestionDetails/Question';
import React from 'react';
import Store from '../../Store';

class QuestionDetails extends React.Component {
    render () {
        const containerState = Store.getState().question;

        if (containerState.isFetching || !containerState.data.text) {
            return <div className="questionDetails"></div>;
        } else {
            return (
                <div className="questionDetails">
                    <Question {...containerState.data} />
                    <AnswerList answers={containerState.data.answers} />
                    <AnswerForm questionId={containerState.data.id} />
                </div>
            ); 
        }
    }
}

export default QuestionDetails;