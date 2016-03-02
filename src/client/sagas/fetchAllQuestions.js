import ActionTypes from '../actions/ActionTypes'
import { take } from 'redux-saga/effects'

function* fetchAllQuestions() {
    console.log('inside fetchAllQuestions saga');

    while (true) {
        let a = yield take(ActionTypes.RequestAllQuestions);

        console.log('It\'s alive!');
    }
}

export default fetchAllQuestions;