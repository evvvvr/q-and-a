import { take, call, put } from 'redux-saga/effects'

export function createSagaToFetchItems(
    actionTypeToStartFetch,
    fetchFunction,
    recieveActionCreator
) {
    return function* () {
        while (true) {
            yield take(actionTypeToStartFetch);

            const items = yield call(fetchFunction);

            yield (put(recieveActionCreator(items)));
        }
    }
}