import {createStore} from 'redux'
import {rootReducer} from './reducers/root-reducer/root-reducer'

export const store = createStore(rootReducer)

/*
export const store = createStore(rootReducer, loadState())

store.subscribe(() => {
    saveState(store.getState())
})*/
