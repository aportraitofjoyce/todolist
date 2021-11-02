import {setAppIsLoading} from '../app-reducer/app-reducer'
import {todolistsAPI, TodolistsResponse} from '../../../api/todolists-api'
import {ServerStatuses} from '../../../types/server-response-types'
import {networkErrorsHandler, serverErrorsHandler} from '../../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodolistType = TodolistsResponse & {
    filter: FilterValuesType
}

export const fetchTodolists = createAsyncThunk('todolists/fetchTodolists', async (arg, {dispatch}) => {
    try {
        dispatch(setAppIsLoading({status: true}))
        const response = await todolistsAPI.getTodolists()
        dispatch(setTodolists({todolists: response}))
    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
})

export const deleteTodolist = createAsyncThunk('todolists/deleteTodolist', async (arg: { todolistID: string }, {dispatch}) => {
    try {
        dispatch(setAppIsLoading({status: true}))
        const response = await todolistsAPI.deleteTodolist(arg.todolistID)

        if (response.resultCode === ServerStatuses.Success) {
            dispatch(removeTodolist({todolistID: arg.todolistID}))
        } else {
            serverErrorsHandler(response, dispatch)
        }
    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
})

export const createTodolist = createAsyncThunk('todolists/createTodolist', async (arg: { title: string }, {dispatch}) => {
    try {
        dispatch(setAppIsLoading({status: true}))
        const response = await todolistsAPI.createTodolist(arg.title)

        if (response.resultCode === ServerStatuses.Success) {
            dispatch(addTodolist({todolist: response.data.item}))
        } else {
            serverErrorsHandler(response, dispatch)
        }
    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
})

export const updateTodolistTitle = createAsyncThunk('todolists/updateTodolistTitle', async (arg: { todolistID: string, title: string }, {dispatch}) => {
    try {
        dispatch(setAppIsLoading({status: true}))
        const response = await todolistsAPI.updateTodolist(arg.todolistID, arg.title)

        if (response.resultCode === ServerStatuses.Success) {
            dispatch(changeTodolistTitle({todolistID: arg.todolistID, title: arg.title}))
        } else {
            serverErrorsHandler(response, dispatch)
        }

    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
})

const slice = createSlice({
    name: 'todolist',
    initialState: [] as TodolistType[],
    reducers: {
        removeTodolist: (state, action: PayloadAction<{ todolistID: string }>) => {
            return state.filter(tdl => tdl.id !== action.payload.todolistID)
        },
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistsResponse }>) => {
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
        setTodolists: (state, action: PayloadAction<{ todolists: TodolistsResponse[] }>) => {
            return action.payload.todolists.map(tdl => ({...tdl, filter: 'All', entityStatus: 'idle'}))
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
} = slice.actions