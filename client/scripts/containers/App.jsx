import PureComponent from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import TopMenu from '../components/TopMenu/TopMenu';
import { connect } from 'react-redux';

const propTypes = {
    path: PropTypes.string.isRequired
};

class App extends PureComponent {
    render() {
        const { path } = this.props;

        return (
            <div>
                <TopMenu currentPath={path} />
                <div className="pure-g">
                    <div className="content pure-u-1 pure-u-md-3-4">
                        <section id="mainContent">{this.props.children}</section>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        path: state.routing.path 
    }
}

export default connect(mapStateToProps) (App);