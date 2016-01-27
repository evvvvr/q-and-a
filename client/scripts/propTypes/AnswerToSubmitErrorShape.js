import ImmutablePropTypes from 'react-immutable-proptypes'
import ValidationErrorShape from './ValidationErrorShape'
import { PropTypes } from 'react'

const AnswerToSubmitErrorShape = {
    user: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains(ValidationErrorShape)
        ),
    text: ImmutablePropTypes.listOf(
            ImmutablePropTypes.contains(ValidationErrorShape)
        )
};

export default AnswerToSubmitErrorShape