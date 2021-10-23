import {tasksAPI, TasksResponseType, UpdatedTaskType} from '../../../api/tasks-api'
import {setAppIsLoading} from '../app-reducer/app-reducer'
import {ServerStatuses, TaskStatuses} from '../../../types/server-response-types'
import {networkErrorsHandler, serverErrorsHandler} from '../../../utils/error-utils'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {addTodolist, removeTodolist, setTodolists} from '../todolists-reducer/todolists-reducer'
import {RootState} from '../../store'

export type TasksType = {
    [key: string]: TasksResponseType[]
}

const initialState: TasksType = {}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (arg: { todolistID: string }, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppIsLoading({status: true}))
        const response = await tasksAPI.requestTasks(arg.todolistID)
        return {tasks: response.items, todolistID: arg.todolistID}
    } catch {
        networkErrorsHandler('Network Error', thunkAPI.dispatch)
    }
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (arg: { taskID: string, todolistID: string }, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppIsLoading({status: true}))
        const response = await tasksAPI.deleteTask(arg.taskID, arg.todolistID)
        if (response.resultCode === ServerStatuses.Success) {
            return {taskID: arg.taskID, todolistID: arg.todolistID}
        } else {
            serverErrorsHandler(response, thunkAPI.dispatch)
        }
    } catch {
        networkErrorsHandler('Network Error', thunkAPI.dispatch)
    }
})

export const createTask = createAsyncThunk('tasks/createTask', async (arg: { todolistID: string, title: string }, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppIsLoading({status: true}))
        const response = await tasksAPI.createTask(arg.todolistID, arg.title)
        if (response.resultCode === ServerStatuses.Success) {
            return {task: response.data.item}
        } else {
            serverErrorsHandler(response, thunkAPI.dispatch)
        }
    } catch {
        networkErrorsHandler('Network Error', thunkAPI.dispatch)
    }
})

export const updateTaskTitle = createAsyncThunk('tasks/updateTaskTitle', async (arg: { todolistID: string, taskID: string, title: string }, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState
        thunkAPI.dispatch(setAppIsLoading({status: true}))
        const task = state.tasks[arg.todolistID].find(task => task.id === arg.taskID)

        if (task) {
            const updatedTask: UpdatedTaskType = {
                status: task.status,
                title: arg.title,
            }

            const response = await tasksAPI.updateTask(arg.todolistID, arg.taskID, updatedTask)

            if (response.resultCode === ServerStatuses.Success) {
                return {todolistID: arg.todolistID, taskID: arg.taskID, title: arg.title}
            } else {
                serverErrorsHandler(response, thunkAPI.dispatch)
            }
        }

    } catch {
        networkErrorsHandler('Network Error', thunkAPI.dispatch)
    }
})

export const updateTaskStatus = createAsyncThunk('tasks/updateTaskStatus', async (arg: { todolistID: string, taskID: string, status: TaskStatuses }, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState
        thunkAPI.dispatch(setAppIsLoading({status: true}))
        const task = state.tasks[arg.todolistID].find(task => task.id === arg.taskID)

        if (task) {
            const updatedTask: UpdatedTaskType = {
                title: task.title,
                status: arg.status
            }

            const response = await tasksAPI.updateTask(arg.todolistID, arg.taskID, updatedTask)

            if (response.resultCode === ServerStatuses.Success) {
                return {todolistID: arg.todolistID, taskID: arg.taskID, status: arg.status}
            } else {
                serverErrorsHandler(response, thunkAPI.dispatch)
            }
        }
    } catch {
        networkErrorsHandler('Network Error', thunkAPI.dispatch)
    }
})

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},

    extraReducers: builder => builder
        .addCase(setTodolists, (state, action) => {
            action.payload.todolists.forEach(tdl => state[tdl.id] = [])
        })

        .addCase(addTodolist, (state, action) => {
            state[action.payload.todolist.id] = []
        })

        .addCase(removeTodolist, (state, action) => {
            delete state[action.payload.todolistID]
        })

        .addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload!.todolistID] = action.payload!.tasks
        })

        .addCase(deleteTask.fulfilled, (state, action) => {
            const index = state[action.payload!.todolistID].findIndex(t => t.id === action.payload!.taskID)
            state[action.payload!.todolistID].splice(index, 1)
        })

        .addCase(createTask.fulfilled, (state, action) => {
            state[action.payload!.task.todoListId].unshift(action.payload!.task)
        })

        .addCase(updateTaskStatus.fulfilled, (state, action) => {
            return {
                ...state,
                [action.payload!.todolistID]: state[action.payload!.todolistID]
                    .map(t => (t.id === action.payload!.taskID ? {...t, status: action.payload!.status} : t))
            }
        })

        .addCase(updateTaskTitle.fulfilled, (state, action) => {
            return {
                ...state,
                [action.payload!.todolistID]: state[action.payload!.todolistID]
                    .map(t => (t.id === action.payload!.taskID ? {...t, title: action.payload!.title} : t))
            }
        })
})

export const tasksReducer = slice.reducer
