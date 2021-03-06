import {tasksAPI, TaskResponse, UpdatedTask} from '../../../api/tasks-api'
import {setAppIsLoading} from '../app-reducer/app-reducer'
import {ServerStatuses, TaskStatuses} from '../../../types/server-response-types'
import {networkErrorsHandler, serverErrorsHandler} from '../../../utils/error-utils'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {addTodolist, removeTodolist, setTodolists} from '../todolists-reducer/todolists-reducer'
import {RootState} from '../../store'

export type Tasks = {
    [key: string]: TaskResponse[]
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks',
    async (arg: { todolistID: string }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppIsLoading({status: true}))
            const response = await tasksAPI.getTasks(arg.todolistID)
            return {tasks: response.items, todolistID: arg.todolistID}
        } catch (e) {
            networkErrorsHandler(e, thunkAPI.dispatch)
        } finally {
            thunkAPI.dispatch(setAppIsLoading({status: false}))
        }
    })

export const deleteTask = createAsyncThunk('tasks/deleteTask',
    async (arg: { taskID: string, todolistID: string }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppIsLoading({status: true}))
            const response = await tasksAPI.deleteTask(arg.taskID, arg.todolistID)
            if (response.resultCode === ServerStatuses.Success) {
                return {taskID: arg.taskID, todolistID: arg.todolistID}
            } else {
                serverErrorsHandler(response, thunkAPI.dispatch)
            }
        } catch (e) {
            networkErrorsHandler(e, thunkAPI.dispatch)
        } finally {
            thunkAPI.dispatch(setAppIsLoading({status: false}))
        }
    })

export const createTask = createAsyncThunk('tasks/createTask',
    async (arg: { todolistID: string, title: string }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppIsLoading({status: true}))
            const response = await tasksAPI.createTask(arg.todolistID, arg.title)
            if (response.resultCode === ServerStatuses.Success) {
                return {task: response.data.item}
            } else {
                serverErrorsHandler(response, thunkAPI.dispatch)
            }
        } catch (e) {
            networkErrorsHandler(e, thunkAPI.dispatch)
        } finally {
            thunkAPI.dispatch(setAppIsLoading({status: false}))
        }
    })

export const updateTaskTitle = createAsyncThunk('tasks/updateTaskTitle',
    async (arg: { todolistID: string, taskID: string, title: string }, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState
            thunkAPI.dispatch(setAppIsLoading({status: true}))
            const task = state.tasks[arg.todolistID].find(task => task.id === arg.taskID)

            if (task) {
                const updatedTask: UpdatedTask = {
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
        } catch (e) {
            networkErrorsHandler(e, thunkAPI.dispatch)
        } finally {
            thunkAPI.dispatch(setAppIsLoading({status: false}))
        }
    })

export const updateTaskStatus = createAsyncThunk('tasks/updateTaskStatus',
    async (arg: { todolistID: string, taskID: string, status: TaskStatuses }, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState
            thunkAPI.dispatch(setAppIsLoading({status: true}))
            const task = state.tasks[arg.todolistID].find(task => task.id === arg.taskID)

            if (task) {
                const updatedTask: UpdatedTask = {
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
        } catch (e) {
            networkErrorsHandler(e, thunkAPI.dispatch)
        } finally {
            thunkAPI.dispatch(setAppIsLoading({status: false}))
        }
    })

const slice = createSlice({
    name: 'tasks',
    initialState: {} as Tasks,
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
            const tasks = state[action.payload!.todolistID]
            const index = tasks.findIndex(t => t.id === action.payload!.taskID)
            tasks[index] = {...tasks[index], status: action.payload!.status}
        })

        .addCase(updateTaskTitle.fulfilled, (state, action) => {
            const tasks = state[action.payload!.todolistID]
            const index = tasks.findIndex(t => t.id === action.payload!.taskID)
            tasks[index] = {...tasks[index], title: action.payload!.title}
        })
})

export const tasksReducer = slice.reducer