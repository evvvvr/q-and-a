import ImmutablePropTypes from 'react-immutable-proptypes';
import PureComponent from 'react-pure-render/component';
import QuestionShape from '../propTypes/QuestionShape';
import QuestionsList from '../components/QuestionsList/QuestionsList';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
    title               : PropTypes.string.isRequired,
    mapStateToQuestions : PropTypes.func.isRequired,
    items               : ImmutablePropTypes.listOf(ImmutablePropTypes.contains(QuestionShape))
};

class Questions extends PureComponent {
    render() {
        const { title, items } = this.props;

        return (
            <div>
                <h3>{title}</h3>
                <QuestionsList questions={items} />
            </div>
        );
    }
}

Questions.propTypes = propTypes;

function mapStateToProps(state, ownProps) {
    const questions = ownProps.mapStateToQuestions(state);

    return {
        items: questions.get('items')
    };
}

export default connect(mapStateToProps) (Questions);