import {addTodolist, removeTodolist, setTodolists} from './todolists-actions'
import {tasksAPI, TasksResponseType, UpdatedTaskType} from '../../api/tasks-api'
import {ThunkType} from '../../types/common-types'
import {setAppStatus} from './app-actions'
import {AppStatusType} from '../../types/app-types'
import {networkErrorsHandler, serverErrorsHandler} from '../../utils/error-utils'
import {ServerStatuses, TaskStatuses} from '../../types/server-response-types'

export enum TASKS_ACTIONS_TYPES {
    REMOVE_TASK = 'REMOVE_TASK',
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    SORT_TASKS_BY_NAME = 'SORT_TASKS_BY_NAME',
    SET_TASKS = 'SET_TASKS',
    CHANGE_TASK_ENTITY_STATUS = 'CHANGE_TASK_ENTITY_STATUS'
}

export type TasksActionsType =
    ReturnType<typeof removeTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof changeTaskStatus>
    | ReturnType<typeof changeTaskTitle>
    | ReturnType<typeof sortTasksByName>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof removeTodolist>
    | ReturnType<typeof setTodolists>
    | ReturnType<typeof setTasks>
    | ReturnType<typeof changeTaskEntityStatus>


// Actions
export const removeTask = (taskID: string, todolistID: string) => ({
    type: TASKS_ACTIONS_TYPES.REMOVE_TASK, payload: {taskID, todolistID}
}) as const

export const addTask = (task: TasksResponseType) => ({
    type: TASKS_ACTIONS_TYPES.ADD_TASK, payload: {task}
}) as const

export const changeTaskStatus = (todolistID: string, taskID: string, status: TaskStatuses) => ({
    type: TASKS_ACTIONS_TYPES.CHANGE_TASK_STATUS, payload: {todolistID, taskID, status}
}) as const

export const changeTaskTitle = (todolistID: string, taskID: string, title: string) => ({
    type: TASKS_ACTIONS_TYPES.CHANGE_TASK_TITLE, payload: {todolistID, taskID, title}
}) as const

export const sortTasksByName = (todolistID: string) => ({
    type: TASKS_ACTIONS_TYPES.SORT_TASKS_BY_NAME, payload: {todolistID}
}) as const

export const setTasks = (tasks: TasksResponseType[], todolistID: string) => ({
    type: TASKS_ACTIONS_TYPES.SET_TASKS, payload: {tasks, todolistID}
}) as const

export const changeTaskEntityStatus = (todolistID: string, taskID: string, entityStatus: AppStatusType) => ({
    type: TASKS_ACTIONS_TYPES.CHANGE_TASK_ENTITY_STATUS, payload: {todolistID, taskID, entityStatus}
}) as const


// Thunks
export const getTasks = (todolistID: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await tasksAPI.requestTasks(todolistID)

        dispatch(setTasks(response.items, todolistID))
        dispatch(setAppStatus('succeeded'))

    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}

export const deleteTask = (taskID: string, todolistID: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        dispatch(changeTaskEntityStatus(todolistID, taskID, 'loading'))
        const response = await tasksAPI.deleteTask(taskID, todolistID)

        if (response.resultCode === ServerStatuses.Success) {
            dispatch(removeTask(taskID, todolistID))
            dispatch(setAppStatus('succeeded'))
            dispatch(changeTaskEntityStatus(todolistID, taskID, 'succeeded'))
        } else {
            dispatch(changeTaskEntityStatus(todolistID, taskID, 'failed'))
            serverErrorsHandler(response, dispatch)
        }

    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}

export const createTask = (todolistID: string, title: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await tasksAPI.createTask(todolistID, title)

        if (response.resultCode === ServerStatuses.Success) {
            dispatch(addTask(response.data.item))
            dispatch(setAppStatus('succeeded'))
        } else {
            serverErrorsHandler(response, dispatch)
        }

    } catch {
        networkErrorsHandler('Network Error', dispatch)
    }
}

export const updateTaskTitle = (todolistID: string, taskID: string, title: string): ThunkType =>
    async (dispatch, getState) => {
        try {
            dispatch(setAppStatus('loading'))
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
                    dispatch(changeTaskTitle(todolistID, taskID, title))
                    dispatch(setAppStatus('succeeded'))
                } else {
                    serverErrorsHandler(response, dispatch)
                }
            }

        } catch {
            networkErrorsHandler('Network Error', dispatch)
        }
    }

export const updateTaskStatus = (todolistID: string, taskID: string, status: TaskStatuses): ThunkType =>
    async (dispatch, getState) => {
        try {
            dispatch(setAppStatus('loading'))
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
                    dispatch(changeTaskStatus(todolistID, taskID, status))
                    dispatch(setAppStatus('succeeded'))
                } else {
                    serverErrorsHandler(response, dispatch)
                }
            }

        } catch {
            networkErrorsHandler('Network Error', dispatch)
        }
    }