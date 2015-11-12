const stateChangedCallbacks = new Set();
let appState, reducer;

function isFunction(value) {
    let getType = {};

    return value && getType.toString.call(value) === '[object Function]';
}

const Store = {
    init(initState, reducerParam) {
        appState = initState;
        reducer = reducerParam;

        console.info('Initial app state is %O', appState);
    },

    getState() {
        return appState;
    },

    subscribe(onStateChangedCallback) {
        if (stateChangedCallbacks.has(onStateChangedCallback)) {
            throw 'You have already added this state changed callback';
        }

        stateChangedCallbacks.add(onStateChangedCallback);
    },

    dispatch(action) {
        if (isFunction(action)) {
            action(this.dispatch.bind(this), this.getState.bind(this));
        } else {
            appState = reducer(appState, action);

            console.info('App state has been changed to %O', appState);

            stateChangedCallbacks.forEach(c => c(appState));
        }
    }
};

export default Store;