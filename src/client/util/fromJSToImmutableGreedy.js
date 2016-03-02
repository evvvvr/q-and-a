import Immutable from 'immutable'

export function fromJSToImmutableGreedy(js) {
    return typeof js !== 'object' || js === null ? js :
        Array.isArray(js) ? 
            Immutable.Seq(js).map(fromJSToImmutableGreedy).toList() :
            Immutable.Seq(js).map(fromJSToImmutableGreedy).toMap();
}