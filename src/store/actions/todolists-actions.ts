import {FilterValuesType} from '../../types/todolists-types'
import {todolistsAPI, TodolistsResponseType} from '../../api/todolists-api'
import {ThunkType} from '../../types/common-types'
import {setAppError, setAppStatus} from './app-actions'

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


// Actions
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


// Thunks
export const getTodolists = (): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await todolistsAPI.requestTodolists()

        dispatch(setTodolists(response))
        dispatch(setAppStatus('succeeded'))

    } catch {
        dispatch(setAppStatus('failed'))
        dispatch(setAppError('Network Error'))
    }
}

export const deleteTodolist = (TODOLIST_ID: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await todolistsAPI.deleteTodolist(TODOLIST_ID)

        if (response.resultCode === 0) {
            dispatch(removeTodolist(TODOLIST_ID))
            dispatch(setAppStatus('succeeded'))
        } else {
            dispatch(setAppStatus('failed'))
            dispatch(setAppError(response.messages[0] || 'Unrecognized error'))
        }

    } catch {
        dispatch(setAppStatus('failed'))
        dispatch(setAppError('Network Error'))
    }
}

export const createTodolist = (title: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await todolistsAPI.createTodolist(title)

        if (response.resultCode === 0) {
            dispatch(addTodolist(response.data.item))
            dispatch(setAppStatus('succeeded'))
        } else {
            dispatch(setAppStatus('failed'))
            dispatch(setAppError(response.messages[0] || 'Unrecognized error'))
        }

    } catch {
        dispatch(setAppStatus('failed'))
        dispatch(setAppError('Network Error'))
    }
}

export const updateTodolistTitle = (TODOLIST_ID: string, title: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await todolistsAPI.updateTodolist(TODOLIST_ID, title)

        if (response.resultCode === 0) {
            dispatch(changeTodolistTitle(TODOLIST_ID, title))
            dispatch(setAppStatus('succeeded'))
        } else {
            dispatch(setAppError(response.messages[0] || 'Unrecognized error'))
            dispatch(setAppStatus('failed'))
        }

    } catch {
        dispatch(setAppStatus('failed'))
        dispatch(setAppError('Network Error'))
    }
}