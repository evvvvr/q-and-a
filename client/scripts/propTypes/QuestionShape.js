import { PropTypes } from 'react'

const QuestionShape = {
    id              : PropTypes.number.isRequired, 
    user            : PropTypes.string.isRequired,
    text            : PropTypes.string.isRequired,
    dateTimeAsked   : PropTypes.string.isRequired
};

export default QuestionShape