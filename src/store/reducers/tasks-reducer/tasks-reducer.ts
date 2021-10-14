import {tasksAPI, TasksResponseType, UpdatedTaskType} from '../../../api/tasks-api'
import {AppDispatch, RootState} from '../../store'
import {AppStatusType, setAppStatus} from '../app-reducer/app-reducer'
import {ServerStatuses, TaskStatuses} from '../../../types/server-response-types'
import {networkErrorsHandler, serverErrorsHandler} from '../../../utils/error-utils'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {addTodolist, removeTodolist, setTodolists} from '../todolists-reducer/todolists-reducer'

export type TasksType = {
    [key: string]: TasksResponseType[]
}
const initialState: TasksType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTask: (state, action: PayloadAction<{ taskID: string, todolistID: string }>) => {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .filter(t => t.id !== action.payload.taskID)
            }
        },
        addTask: (state, action: PayloadAction<{ task: TasksResponseType }>) => {
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        },
        changeTaskStatus: (state, action: PayloadAction<{ todolistID: string, taskID: string, status: TaskStatuses }>) => {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .map(t => (t.id === action.payload.taskID ? {...t, status: action.payload.status} : t))
            }
        },
        changeTaskTitle: (state, action: PayloadAction<{ todolistID: string, taskID: string, title: string }>) => {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .map(t => (t.id === action.payload.taskID ? {...t, title: action.payload.title} : t))
            }
        },
        sortTasksByName: (state, action: PayloadAction<{ todolistID: string }>) => {
            return {
                ...state,
                [action.payload.todolistID]: [...state[action.payload.todolistID]]
                    .sort((a: TasksResponseType, b: TasksResponseType) => a['title'] > b['title'] ? 1 : -1)
            }
        },
        setTasks: (state, action: PayloadAction<{ tasks: TasksResponseType[], todolistID: string }>) => {
            return {
                ...state,
                [action.payload.todolistID]: action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}))
            }
        },
        changeTaskEntityStatus: (state, action: PayloadAction<{ todolistID: string, taskID: string, entityStatus: AppStatusType }>) => {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .map(t => (t.id === action.payload.taskID ? {...t, entityStatus: action.payload.entityStatus} : t))
            }
        }
    },

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
})

export const tasksReducer = slice.reducer

export const {
    removeTask,
    addTask,
    changeTaskStatus,
    changeTaskTitle,
    sortTasksByName,
    setTasks,
    changeTaskEntityStatus
} = slice.actions

export const getTasks = (todolistID: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatus({status: 'loading'}))
        const response = await tasksAPI.requestTasks(todolistID)

        dispatch(setTasks({tasks: response.items, todolistID}))
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}

export const deleteTask = (taskID: string, todolistID: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatus({status: 'loading'}))
        dispatch(changeTaskEntityStatus({todolistID, taskID, entityStatus: 'loading'}))
        const response = await tasksAPI.deleteTask(taskID, todolistID)

        if (response.resultCode === ServerStatuses.Success) {
            dispatch(removeTask({taskID, todolistID}))
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(changeTaskEntityStatus({todolistID, taskID, entityStatus: 'succeeded'}))
        } else {
            dispatch(changeTaskEntityStatus({todolistID, taskID, entityStatus: 'failed'}))
            serverErrorsHandler(response, dispatch)
        }

    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}

export const createTask = (todolistID: string, title: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatus({status: 'loading'}))
        const response = await tasksAPI.createTask(todolistID, title)

        if (response.resultCode === ServerStatuses.Success) {
            dispatch(addTask({task: response.data.item}))
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            serverErrorsHandler(response, dispatch)
        }

    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}

export const updateTaskTitle = (todolistID: string, taskID: string, title: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        dispatch(setAppStatus({status: 'loading'}))
        const task = getState()
            .tasks[todolistID].find(task => task.id === taskID)

        if (task) {
            const updatedTask: UpdatedTaskType = {
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                title,
            }

            const response = await tasksAPI.updateTask(todolistID, taskID, updatedTask)

            if (response.resultCode === ServerStatuses.Success) {
                dispatch(changeTaskTitle({todolistID, taskID, title}))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                serverErrorsHandler(response, dispatch)
            }
        }

    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}

export const updateTaskStatus = (todolistID: string, taskID: string, status: TaskStatuses) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        dispatch(setAppStatus({status: 'loading'}))
        const task = getState().tasks[todolistID].find(task => task.id === taskID)

        if (task) {
            const updatedTask: UpdatedTaskType = {
                description: task.description,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status
            }
            const response = await tasksAPI.updateTask(todolistID, taskID, updatedTask)

            if (response.resultCode === ServerStatuses.Success) {
                dispatch(changeTaskStatus({todolistID, taskID, status}))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                serverErrorsHandler(response, dispatch)
            }
        }

    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}