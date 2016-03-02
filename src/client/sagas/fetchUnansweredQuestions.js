import ActionTypes from '../actions/ActionTypes'
import API from '../API/API'
import { recieveUnansweredQuestions } from '../actions/unansweredQuestions' 
import { take, call, put } from 'redux-saga/effects'

function* fetchUnansweredQuestions() {
    while (true) {
        yield take(ActionTypes.RequestUnansweredQuestions);

        const unansweredQuestions = yield call(API.fetchUnansweredQuestions);

        yield (put(recieveUnansweredQuestions(unansweredQuestions)));
    }
}

export default fetchUnansweredQuestions;