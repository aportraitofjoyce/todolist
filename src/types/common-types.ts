import { ThunkAction } from 'redux-thunk'
import {rootReducer} from '../store/reducers/root-reducer'
import {TasksActionsType} from '../store/actions/tasks-actions'
import {TodolistsActionsType} from '../store/actions/todolists-actions'
import {AppActionsType} from '../store/actions/app-actions'
import {store} from '../store/store'

// State
export type StateType = ReturnType<typeof rootReducer>

// Dispatch
export type AppDispatch = typeof store.dispatch

// Actions
export type ActionsType = TasksActionsType | TodolistsActionsType | AppActionsType

// Thunk
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, StateType, unknown, ActionsType>