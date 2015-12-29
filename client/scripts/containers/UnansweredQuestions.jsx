import Questions from './Questions';
import React, { PropTypes } from 'react';

class UnansweredQuestions extends React.Component {
    render() {
        return ( 
            <Questions
                title="Unanswered Questions"
                mapStateToQuestions={(state) => state.unansweredQuestions}
            />
        );
    }
}

export default UnansweredQuestions;