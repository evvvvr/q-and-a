const stateChangedCallbacks = new Set();

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
        this.appState = this.reducer(this.appState, action);

        console.info('App state has been changed to %O', this.appState);

        stateChangedCallbacks.forEach(c => c(this.appState));
    }
};

export default Store;