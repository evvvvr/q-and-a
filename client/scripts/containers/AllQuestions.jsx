import Questions from './Questions';
import React from 'react';

class AllQuestions extends React.Component {
    selectAllQuestions(state) {
        return state.allQuestions;
    }

    render() {
        return ( 
            <Questions
                title="All Questions"
                mapStateToQuestions={this.selectAllQuestions}
            />
        );
    }
}

export default AllQuestions;