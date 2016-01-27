import { PropTypes } from 'react'

const AnswerShape = {
    id                  : PropTypes.number.isRequired,
    user                : PropTypes.string.isRequired,
    text                : PropTypes.string.isRequired,
    dateTimeAnswered    : PropTypes.string.isRequired
};

export default AnswerShape