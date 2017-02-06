import appReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


// Middleware function
const mwF = store => next => action => {
    
    let _result

    console.groupCollapsed(`action ${action.type}`)
    console.log('before next', JSON.stringify(store.getState()))    
    _result = next(action)
    console.log('after next', JSON.stringify(store.getState()))
    console.groupEnd()

    return _result
}

// We add middleware and reducers
export default (initialState={}) => createStore(appReducer, initialState, applyMiddleware(thunk, mwF))


