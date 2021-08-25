import {combineReducers, createStore} from 'redux'
import {todolistsReducer} from './reducers/todolists-reducer/todolists-reducer'
import {tasksReducer} from './reducers/tasks-reducer/tasks-reducer'
import {loadState, saveState} from '../utils/local-storage-utils'

export type StateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers(
    {
        todolists: todolistsReducer,
        tasks: tasksReducer
    }
)

export const store = createStore(rootReducer, loadState())

store.subscribe(() => {
    saveState(store.getState())
})