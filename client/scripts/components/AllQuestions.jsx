import React from 'react';
import { Link } from 'react-router';

class AllQuestions extends React.Component {
    render() {
        return (
            <div>
                <h3>All Questions</h3>
                <Link to="/questions/1">kuka</Link>
            </div>
        );
    }
}

export default AllQuestions;