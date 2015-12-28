import AllQuestions from './containers/AllQuestions';
import AnsweredQuestions from './containers/AnsweredQuestions';
import App from './containers/App';
import AskQuestion from './components/AskQuestion';
import Question from './containers/Question/Question';
import React from 'react';
import UnansweredQuestions from './containers/UnansweredQuestions';
import { fetchAllQuestions } from './actions/allQuestions';
import { fetchAnsweredQuestions } from './actions/answeredQuestions';
import { fetchQuestion } from './actions/question';
import { fetchUnansweredQuestions } from './actions/unansweredQuestions';
import { Router, Route, IndexRoute } from 'react-router';

const onEnterAllQuestions = (store) => {
    return () => store.dispatch(fetchAllQuestions());
};

const onEnterAnsweredQuestions = (store) => {
    return () => store.dispatch(fetchAnsweredQuestions());
};

const onEnterUnansweredQuestions = (store) => {
    return () => store.dispatch(fetchUnansweredQuestions());
};

const onEnterQuestion = (store) => {
    return (nextState) => store.dispatch(fetchQuestion(nextState.params.id));
};

export default function router(history, store) {
    return ( 
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute
                    component={AllQuestions}
                    onEnter={onEnterAllQuestions(store)}
                />
                <Route
                    path="answered"
                    component={AnsweredQuestions}
                    onEnter={onEnterAnsweredQuestions(store)}
                />
                <Route
                    path="unanswered"
                    component={UnansweredQuestions}
                    onEnter={onEnterUnansweredQuestions(store)}
                />
                <Route path="ask" component={AskQuestion} />
                <Route
                    path="questions/:id"
                    component={Question}
                    onEnter={onEnterQuestion(store)}
                />
            </Route>
        </Router>
    );
}