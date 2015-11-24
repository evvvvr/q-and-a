import QuestionListItem from './QuestionListItem';
import React, { PropTypes } from 'react';
import { compareItemsChronologically } from '../../util/date-time-util';

const propTypes = {
    questions: PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onQuestionSelected: PropTypes.func
};

class QuestionList extends React.Component {
    render() {
        const questionNodes = this.props.questions
            .sort((a, b) => compareItemsChronologically(
                a.dateTimeAsked,
                b.dateTimeAsked
            ))
            .map((question) => {
                const { id, ...questionProps } = question;

                return ( 
                    <QuestionListItem
                        key={id}
                        questionId={id}
                        {...questionProps}
                        onQuestionSelected={this.props.onQuestionSelected}
                    />
                );
            });

        return <ul className="appItemList">{questionNodes}</ul>;
    }  
}

QuestionList.propTypes = propTypes;

export default QuestionList;