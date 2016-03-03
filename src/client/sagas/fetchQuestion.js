import ActionTypes from '../actions/ActionTypes'
import API from '../API/API'
import { recieveQuestion } from '../actions/question' 
import { take, call, put } from 'redux-saga/effects'

export default function* fetchQuestion () {
    while (true) {
        const requestQuestionAction = yield take(ActionTypes.RequestQuestion);

        let fetchResult;

        try {
            fetchResult = yield call(
                API.fetchQuestion,
                requestQuestionAction.payload
            );
        } catch (error) {
            fetchResult = error;
        }

        yield (put(recieveQuestion(fetchResult)));
    }
}