import Questions from './Questions';
import React, { PropTypes } from 'react';

class UnansweredQuestions extends React.Component {
    selectUnansweredQuestions(state) {
        return state.unansweredQuestions;
    }

    render() {
        return ( 
            <Questions
                title="Unanswered Questions"
                mapStateToQuestions={this.selectUnansweredQuestions}
            />
        );
    }
}

export default UnansweredQuestions;