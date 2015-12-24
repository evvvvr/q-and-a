import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const propTypes = {
    isFetching: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired
};

class AllQuestions extends React.Component {
    render() {
        const { isFetching } = this.props;
        console.log('Fetching is ' + isFetching);

        return (
            <div>
                <h3>All Questions</h3>
                <Link to="/questions/1">kuka</Link>
            </div>
        );
    }
}

AllQuestions.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        isFetching: state.allQuestions.isFetching,
        items: state.allQuestions.items
    };
}

export default connect(mapStateToProps) (AllQuestions);