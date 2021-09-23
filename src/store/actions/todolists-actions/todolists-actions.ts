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

export const addTodolist = (todolist: TodolistsResponseType) => ({
    type: TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST, payload: {todolist}
}) as const

export const changeTodolistFilter = (filter: FilterValuesType, TODOLIST_ID: string) => ({
    type: TODOLISTS_ACTIONS_TYPES.CHANGE_TODOLIST_FILTER, payload: {filter, TODOLIST_ID}
}) as const

export const changeTodolistTitle = (TODOLIST_ID: string, title: string) => ({
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

export const deleteTodolist = (TODOLIST_ID: string): ThunkType => async dispatch => {
    await todolistsAPI.deleteTodolist(TODOLIST_ID)
    dispatch(removeTodolist(TODOLIST_ID))
}

export const createTodolist = (title: string): ThunkType => async dispatch => {
    const response = await todolistsAPI.createTodolist(title)
    dispatch(addTodolist(response.data.data.item))
}

export const updateTodolistTitle = (TODOLIST_ID: string, title: string): ThunkType => async dispatch => {
    await todolistsAPI.updateTodolist(TODOLIST_ID, title)
    dispatch(changeTodolistTitle(TODOLIST_ID, title))
}

