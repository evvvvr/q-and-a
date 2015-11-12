const stateChangedCallbacks = new Set();

function isFunction(value) {
    let getType = {};

    return value && getType.toString.call(value) === '[object Function]';
}

const Store = {
    init(initState, reducer) {
        this.appState = initState;
        this.reducer = reducer;

        console.info('Initial app state is %O', this.appState);
    },

    getState() {
        return this.appState;
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
            this.appState = this.reducer(this.appState, action);

            console.info('App state has been changed to %O', this.appState);

            stateChangedCallbacks.forEach(c => c(this.appState));
        }
    }
};

export default Store;