import {FilterValuesType} from '../../types/todolists-types'
import {todolistsAPI, TodolistsResponseType} from '../../api/todolists-api'
import {ThunkType} from '../../types/common-types'
import {setAppStatus} from './app-actions'
import {AppStatusType} from '../../types/app-types'
import {networkErrorsHandler, serverErrorsHandler} from '../../utils/error-utils'
import {ServerStatuses} from '../../types/server-response-types'

export enum TODOLISTS_ACTIONS_TYPES {
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
    SET_TODOLISTS = 'SET_TODOLISTS',
    CHANGE_TODOLIST_ENTITY_STATUS = 'CHANGE_TODOLIST_ENTITY_STATUS'
}

export type TodolistsActionsType =
    ReturnType<typeof removeTodolist>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof changeTodolistFilter>
    | ReturnType<typeof changeTodolistTitle>
    | ReturnType<typeof setTodolists>
    | ReturnType<typeof changeTodolistEntityStatus>


// Actions
export const removeTodolist = (todolistID: string) => ({
    type: TODOLISTS_ACTIONS_TYPES.REMOVE_TODOLIST, payload: {todolistID}
}) as const

export const addTodolist = (todolist: TodolistsResponseType) => ({
    type: TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST, payload: {todolist}
}) as const

export const changeTodolistFilter = (filter: FilterValuesType, todolistID: string) => ({
    type: TODOLISTS_ACTIONS_TYPES.CHANGE_TODOLIST_FILTER, payload: {filter, todolistID}
}) as const

export const changeTodolistTitle = (todolistID: string, title: string) => ({
    type: TODOLISTS_ACTIONS_TYPES.CHANGE_TODOLIST_TITLE, payload: {title, todolistID}
}) as const

export const setTodolists = (todolists: TodolistsResponseType[]) => ({
    type: TODOLISTS_ACTIONS_TYPES.SET_TODOLISTS, payload: {todolists}
}) as const

export const changeTodolistEntityStatus = (todolistID: string, status: AppStatusType) => ({
    type: TODOLISTS_ACTIONS_TYPES.CHANGE_TODOLIST_ENTITY_STATUS, payload: {todolistID, status}
}) as const


// Thunks
export const getTodolists = (): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await todolistsAPI.requestTodolists()

        dispatch(setTodolists(response))
        dispatch(setAppStatus('succeeded'))

    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}

export const deleteTodolist = (todolistID: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        dispatch(changeTodolistEntityStatus(todolistID, 'loading'))
        const response = await todolistsAPI.deleteTodolist(todolistID)

        if (response.resultCode === ServerStatuses.Success) {
            dispatch(removeTodolist(todolistID))
            dispatch(setAppStatus('succeeded'))
            dispatch(changeTodolistEntityStatus(todolistID, 'succeeded'))
        } else {
            dispatch(changeTodolistEntityStatus(todolistID, 'failed'))
            serverErrorsHandler(response, dispatch)
        }

    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}

export const createTodolist = (title: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await todolistsAPI.createTodolist(title)

        if (response.resultCode === ServerStatuses.Success) {
            dispatch(addTodolist(response.data.item))
            dispatch(setAppStatus('succeeded'))
        } else {
            serverErrorsHandler(response, dispatch)
        }

    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}

export const updateTodolistTitle = (todolistID: string, title: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await todolistsAPI.updateTodolist(todolistID, title)

        if (response.resultCode === ServerStatuses.Success) {
            dispatch(changeTodolistTitle(todolistID, title))
            dispatch(setAppStatus('succeeded'))
        } else {
            serverErrorsHandler(response, dispatch)
        }

    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}