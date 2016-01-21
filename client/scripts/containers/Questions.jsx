import QuestionsList from '../components/QuestionsList/QuestionsList';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
    title: PropTypes.string.isRequired,
    mapStateToQuestions: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired
};

class Questions extends React.Component {
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