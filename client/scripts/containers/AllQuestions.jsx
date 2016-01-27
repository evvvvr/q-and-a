import PureComponent from 'react-pure-render/component'
import Questions from './Questions'
import React from 'react'

class AllQuestions extends PureComponent {
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

export default AllQuestions