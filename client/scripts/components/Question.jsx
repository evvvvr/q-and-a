import React from 'react';

class Question extends React.Component {
    render() {
        const { params } = this.props;

        return (
            <div>
                <h3>Question #{params.id}</h3>
            </div>
        );
    }
}

export default Question;