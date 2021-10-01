import { ThunkAction } from 'redux-thunk'
import {rootReducer} from '../store/reducers/root-reducer'
import {TasksActionsType} from '../store/actions/tasks-actions'
import {TodolistsActionsType} from '../store/actions/todolists-actions'
import {AppActionsType} from '../store/actions/app-actions'

// State
export type StateType = ReturnType<typeof rootReducer>

// Actions
export type ActionsType = TasksActionsType | TodolistsActionsType | AppActionsType

// Thunk
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, StateType, unknown, ActionsType>