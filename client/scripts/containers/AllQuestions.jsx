import Questions from './Questions';
import React from 'react';

class AllQuestions extends React.Component {
    render() {
        return ( 
            <Questions
                title="All Questions"
                mapStateToQuestions={(state) => state.allQuestions}
            />
        );
    }
}

export default AllQuestions;