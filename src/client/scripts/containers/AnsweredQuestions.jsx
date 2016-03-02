import PureComponent from 'react-pure-render/component'
import Questions from './Questions'
import React from 'react'

class AnsweredQuestions extends PureComponent {
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

export default AnsweredQuestions