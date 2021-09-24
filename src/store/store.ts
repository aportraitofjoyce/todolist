import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {rootReducer} from './reducers/root-reducer'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// @ts-ignore
window.store = store

/*
export const store = createStore(rootReducer, loadState())

store.subscribe(() => {
    saveState(store.getState())
})*/
