import {v1} from 'uuid'
import {FilterValuesType} from '../../../types/todolists-types'
import {todolistsAPI, TodolistsResponseType} from '../../../api/todolists-api'
import {ThunkType} from '../../../types/common-types'

export enum TODOLISTS_ACTIONS_TYPES {
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
    SET_TODOLISTS = 'SET_TODOLISTS'
}

export type TodolistsActionsType =
    ReturnType<typeof removeTodolist>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof changeTodolistFilter>
    | ReturnType<typeof changeTodolistTitle>
    | ReturnType<typeof setTodolists>

export const removeTodolist = (TODOLIST_ID: string) => ({
    type: TODOLISTS_ACTIONS_TYPES.REMOVE_TODOLIST, payload: {TODOLIST_ID}
}) as const

export const addTodolist = (title: string) => ({
    type: TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST, payload: {title, NEW_TODOLIST_ID: v1()}
}) as const

export const changeTodolistFilter = (filter: FilterValuesType, TODOLIST_ID: string) => ({
    type: TODOLISTS_ACTIONS_TYPES.CHANGE_TODOLIST_FILTER, payload: {filter, TODOLIST_ID}
}) as const

export const changeTodolistTitle = (title: string, TODOLIST_ID: string) => ({
    type: TODOLISTS_ACTIONS_TYPES.CHANGE_TODOLIST_TITLE, payload: {title, TODOLIST_ID}
}) as const

export const setTodolists = (todolists: TodolistsResponseType[]) => ({
    type: TODOLISTS_ACTIONS_TYPES.SET_TODOLISTS, payload: {todolists}
}) as const

// Thunk
export const getTodolists = (): ThunkType => async dispatch => {
    const response = await todolistsAPI.requestTodolists()
    dispatch(setTodolists(response.data))
}