import AnswerShape from './AnswerShape'
import { PropTypes } from 'react'

const QuestionDetailsShape = {
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    dateTimeAsked: PropTypes.string.isRequired
};

export default QuestionDetailsShape