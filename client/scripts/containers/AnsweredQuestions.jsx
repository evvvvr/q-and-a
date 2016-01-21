import Questions from './Questions';
import React from 'react';

class AnsweredQuestions extends React.Component {
    selectAnsweredQuestions(state) {
        return state.answeredQuestions;
    }

    render() {
        return ( 
            <Questions
                title="Answered Questions"
                mapStateToQuestions={this.selectAnsweredQuestions}
            />
        );
    }
}

export default AnsweredQuestions;