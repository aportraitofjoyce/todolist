import {AppDispatch} from '../../store'
import {AppStatusType, setAppStatus} from '../app-reducer/app-reducer'
import {todolistsAPI, TodolistsResponseType} from '../../../api/todolists-api'
import {ServerStatuses} from '../../../types/server-response-types'
import {networkErrorsHandler, serverErrorsHandler} from '../../../utils/error-utils'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getTasks} from '../tasks-reducer/tasks-reducer'

export type TodolistType = TodolistsResponseType & {
    filter: FilterValuesType
    entityStatus: AppStatusType
}
export type FilterValuesType = 'All' | 'Active' | 'Completed'

const initialState: TodolistType[] = []

const slice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        removeTodolist: (state, action: PayloadAction<{ todolistID: string }>) => {
            return state.filter(tdl => tdl.id !== action.payload.todolistID)
        },
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistsResponseType }>) => {
            return [{...action.payload.todolist, filter: 'All', entityStatus: 'idle'}, ...state]
        },
        changeTodolistFilter: (state, action: PayloadAction<{ filter: FilterValuesType, todolistID: string }>) => {
            return state.map(tdl => tdl.id === action.payload.todolistID
                ? {...tdl, filter: action.payload.filter} : tdl)
        },
        changeTodolistTitle: (state, action: PayloadAction<{ todolistID: string, title: string }>) => {
            return state.map(tdl => tdl.id === action.payload.todolistID
                ? {...tdl, title: action.payload.title} : tdl)
        },
        setTodolists: (state, action: PayloadAction<{ todolists: TodolistsResponseType[] }>) => {
            return action.payload.todolists.map(tdl => ({...tdl, filter: 'All', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ todolistID: string, status: AppStatusType }>) => {
            return state.map(tdl => tdl.id === action.payload.todolistID
                ? {...tdl, entityStatus: action.payload.status} : tdl)
        },
    }
})

export const todolistsReducer = slice.reducer

export const {
    removeTodolist,
    addTodolist,
    changeTodolistFilter,
    changeTodolistTitle,
    setTodolists,
    changeTodolistEntityStatus
} = slice.actions

// TODO: Need to set tasks before right after todolist, because now they could be fetched before todolists render
export const getTodolists = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatus({status: 'loading'}))
        const response = await todolistsAPI.requestTodolists()
        dispatch(setTodolists({todolists: response}))
        dispatch(setAppStatus({status: 'succeeded'}))
        //response.forEach(tdl => dispatch(getTasks(tdl.id)))
    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}

export const deleteTodolist = (todolistID: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatus({status: 'loading'}))
        dispatch(changeTodolistEntityStatus({todolistID, status: 'loading'}))
        const response = await todolistsAPI.deleteTodolist(todolistID)

        if (response.resultCode === ServerStatuses.Success) {
            dispatch(removeTodolist({todolistID}))
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(changeTodolistEntityStatus({todolistID, status: 'succeeded'}))
        } else {
            dispatch(changeTodolistEntityStatus({todolistID, status: 'failed'}))
            serverErrorsHandler(response, dispatch)
        }

    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}

export const createTodolist = (title: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatus({status: 'loading'}))
        const response = await todolistsAPI.createTodolist(title)

        if (response.resultCode === ServerStatuses.Success) {
            dispatch(addTodolist({todolist: response.data.item}))
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            serverErrorsHandler(response, dispatch)
        }

    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}

export const updateTodolistTitle = (todolistID: string, title: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatus({status: 'loading'}))
        const response = await todolistsAPI.updateTodolist(todolistID, title)

        if (response.resultCode === ServerStatuses.Success) {
            dispatch(changeTodolistTitle({todolistID, title}))
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            serverErrorsHandler(response, dispatch)
        }

    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}