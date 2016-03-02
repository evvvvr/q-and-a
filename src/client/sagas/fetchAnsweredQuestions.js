import ActionTypes from '../actions/ActionTypes'
import API from '../API/API'
import { recieveAnsweredQuestions } from '../actions/answeredQuestions' 
import { take, call, put } from 'redux-saga/effects'

function* fetchAnsweredQuestions() {
    while (true) {
        yield take(ActionTypes.RequestAnsweredQuestions);

        const answeredQuestions = yield call(API.fetchAnsweredQuestions);

        yield(put(recieveAnsweredQuestions(answeredQuestions)));
    }
}

export default fetchAnsweredQuestions;