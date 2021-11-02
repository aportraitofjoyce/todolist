import {setAppIsLoading} from '../app-reducer/app-reducer'
import {todolistsAPI, TodolistsResponse} from '../../../api/todolists-api'
import {ServerStatuses} from '../../../types/server-response-types'
import {networkErrorsHandler, serverErrorsHandler} from '../../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

export type TodolistType = TodolistsResponse & {
    filter: FilterValues
}

export type FilterValues = 'All' | 'Active' | 'Completed'

export const fetchTodolists = createAsyncThunk('todolists/fetchTodolists', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppIsLoading({status: true}))
        const response = await todolistsAPI.getTodolists()
        thunkAPI.dispatch(setTodolists({todolists: response}))
    } catch (e) {
        networkErrorsHandler(e, thunkAPI.dispatch)
    } finally {
        thunkAPI.dispatch(setAppIsLoading({status: false}))
    }
})

export const deleteTodolist = createAsyncThunk('todolists/deleteTodolist', async (arg: { todolistID: string }, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppIsLoading({status: true}))
        const response = await todolistsAPI.deleteTodolist(arg.todolistID)

        if (response.resultCode === ServerStatuses.Success) {
            thunkAPI.dispatch(removeTodolist({todolistID: arg.todolistID}))
        } else {
            serverErrorsHandler(response, thunkAPI.dispatch)
        }
    } catch (e) {
        networkErrorsHandler(e, thunkAPI.dispatch)
    } finally {
        thunkAPI.dispatch(setAppIsLoading({status: false}))
    }
})

export const createTodolist = createAsyncThunk('todolists/createTodolist', async (arg: { title: string }, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppIsLoading({status: true}))
        const response = await todolistsAPI.createTodolist(arg.title)

        if (response.resultCode === ServerStatuses.Success) {
            thunkAPI.dispatch(addTodolist({todolist: response.data.item}))
        } else {
            serverErrorsHandler(response, thunkAPI.dispatch)
        }
    } catch (e) {
        networkErrorsHandler(e, thunkAPI.dispatch)
    } finally {
        thunkAPI.dispatch(setAppIsLoading({status: false}))
    }
})

export const updateTodolistTitle = createAsyncThunk('todolists/updateTodolistTitle', async (arg: { todolistID: string, title: string }, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppIsLoading({status: true}))
        const response = await todolistsAPI.updateTodolist(arg.todolistID, arg.title)

        if (response.resultCode === ServerStatuses.Success) {
            thunkAPI.dispatch(changeTodolistTitle({todolistID: arg.todolistID, title: arg.title}))
        } else {
            serverErrorsHandler(response, thunkAPI.dispatch)
        }
    } catch (e) {
        networkErrorsHandler(e, thunkAPI.dispatch)
    } finally {
        thunkAPI.dispatch(setAppIsLoading({status: false}))
    }
})

const slice = createSlice({
    name: 'todolist',
    initialState: [] as TodolistType[],
    reducers: {
        removeTodolist: (state, action: PayloadAction<{ todolistID: string }>) => {
            const index = state.findIndex(tdl => tdl.id === action.payload.todolistID)
            state.splice(index, 1)
        },
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistsResponse }>) => {
            state.unshift({...action.payload.todolist, filter: 'All'})
        },
        changeTodolistFilter: (state, action: PayloadAction<{ filter: FilterValues, todolistID: string }>) => {
            const index = state.findIndex(tdl => tdl.id === action.payload.todolistID)
            state[index].filter = action.payload.filter
        },
        changeTodolistTitle: (state, action: PayloadAction<{ todolistID: string, title: string }>) => {
            const index = state.findIndex(tdl => tdl.id === action.payload.todolistID)
            state[index].title = action.payload.title
        },
        setTodolists: (state, action: PayloadAction<{ todolists: TodolistsResponse[] }>) => {
            state = action.payload.todolists.map(tdl => ({...tdl, filter: 'All'}))
            return state
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