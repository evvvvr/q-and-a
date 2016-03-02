import ActionTypes from '../actions/ActionTypes'
import API from '../API/API'
import { recieveAllQuestions } from '../actions/allQuestions' 
import { take, call, put } from 'redux-saga/effects'

function* fetchAllQuestions() {
    while (true) {
        yield take(ActionTypes.RequestAllQuestions);

        const allQuestions = yield call(API.fetchAllQuestions);

        yield (put(recieveAllQuestions(allQuestions)));
    }
}

export default fetchAllQuestions;