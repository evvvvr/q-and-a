import PureComponent from 'react-pure-render/component'
import Questions from './Questions'
import React, { PropTypes } from 'react'

class UnansweredQuestions extends PureComponent {
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

export default UnansweredQuestions