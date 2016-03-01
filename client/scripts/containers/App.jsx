import PureComponent from 'react-pure-render/component'
import React, { PropTypes } from 'react'
import TopMenu from '../components/TopMenu/TopMenu'
import { connect } from 'react-redux'

const propTypes = {
    path: PropTypes.string.isRequired
};

class App extends PureComponent {
    render() {
        const { path } = this.props;

        return (
            <div className="app">
                <header className="app-header">
                    <TopMenu currentPath={path} />
                </header>
                <main className="app-main">
                    {this.props.children}
                </main>
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