import QuestionsList from '../components/QuestionsList/QuestionsList';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
    title: PropTypes.string.isRequired,
    mapStateToQuestions: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired
};

class Questions extends React.Component {
    render() {
        const { title, isFetching, items } = this.props;

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
        isFetching: questions.isFetching,
        items: questions.items
    };
}

export default connect(mapStateToProps) (Questions);