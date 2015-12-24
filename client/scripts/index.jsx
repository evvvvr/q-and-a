import '../styles/main.css';
import 'purecss';
import AllQuestions from './components/AllQuestions';
import AnsweredQuestions from './components/AnsweredQuestions';
import API from './API';
import App from './containers/App';
import appReducer from './reducers/appReducer';
import AskQuestion from './components/AskQuestion';
import Question from './components/Question';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import UnansweredQuestions from './components/UnansweredQuestions';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createHistory } from 'history';
import { fetchAllQuestions } from './actions/allQuestions';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';

API.init({
    hostURL: 'http://localhost:8080/api',
    timeout: 5000
});

const reducer = combineReducers(Object.assign({}, appReducer, {
    routing: routeReducer
}));

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware) (createStore);
const store = createStoreWithMiddleware(reducer);

const history = createHistory();

syncReduxAndRouter(history, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={AllQuestions} />
                <Route path="answered" component={AnsweredQuestions} />
                <Route path="unanswered" component={UnansweredQuestions} />
                <Route path="ask" component={AskQuestion} />
                <Route path="questions/:id" component={Question} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('q-and-a-app')
);