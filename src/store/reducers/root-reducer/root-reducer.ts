import {combineReducers} from 'redux'
import {todolistsReducer} from '../todolists-reducer/todolists-reducer'
import {tasksReducer} from '../tasks-reducer/tasks-reducer'

export const rootReducer = combineReducers(
    {
        todolists: todolistsReducer,
        tasks: tasksReducer
    }
)