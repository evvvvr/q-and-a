import Questions from './Questions';
import React from 'react';

class AnsweredQuestions extends React.Component {
    render() {
        return ( 
            <Questions
                title="Answered Questions"
                mapStateToQuestions={(state) => state.answeredQuestions}
            />
        );
    }
}

export default AnsweredQuestions;