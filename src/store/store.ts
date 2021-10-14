import {combineReducers} from 'redux'
import thunk, {ThunkAction} from 'redux-thunk'
import {todolistsReducer} from './reducers/todolists-reducer/todolists-reducer'
import { tasksReducer} from './reducers/tasks-reducer/tasks-reducer'
import {appReducer} from './reducers/app-reducer/app-reducer'
import {authReducer} from './reducers/auth-reducer/auth-reducer'
import {configureStore} from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type StateType = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
//export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, StateType, unknown, ActionsType>
