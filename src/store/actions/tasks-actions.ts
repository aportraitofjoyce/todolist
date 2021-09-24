import {addTodolist, removeTodolist, setTodolists} from './todolists-actions'
import {TaskPriorities, tasksAPI, TasksResponseType, TaskStatuses, UpdatedTaskType} from '../../api/tasks-api'
import {ThunkType} from '../../types/common-types'

export enum TASKS_ACTIONS_TYPES {
    REMOVE_TASK = 'REMOVE_TASK',
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    SORT_TASKS_BY_NAME = 'SORT_TASKS_BY_NAME',
    SET_TASKS = 'SET_TASKS'
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

// Actions
export const removeTask = (taskID: string, TODOLIST_ID: string) => ({
    type: TASKS_ACTIONS_TYPES.REMOVE_TASK, payload: {taskID, TODOLIST_ID}
}) as const

export const addTask = (task: TasksResponseType) => ({
    type: TASKS_ACTIONS_TYPES.ADD_TASK, payload: {task}
}) as const

export const changeTaskStatus = (TODOLIST_ID: string, taskID: string, status: TaskStatuses) => ({
    type: TASKS_ACTIONS_TYPES.CHANGE_TASK_STATUS, payload: {TODOLIST_ID, taskID, status}
}) as const

export const changeTaskTitle = (TODOLIST_ID: string, taskID: string, title: string) => ({
    type: TASKS_ACTIONS_TYPES.CHANGE_TASK_TITLE, payload: {TODOLIST_ID, taskID, title}
}) as const

export const sortTasksByName = (TODOLIST_ID: string) => ({
    type: TASKS_ACTIONS_TYPES.SORT_TASKS_BY_NAME, payload: {TODOLIST_ID}
}) as const

export const setTasks = (tasks: TasksResponseType[], TODOLIST_ID: string) => ({
    type: TASKS_ACTIONS_TYPES.SET_TASKS, payload: {tasks, TODOLIST_ID}
}) as const

// Thunks
export const getTasks = (TODOLIST_ID: string): ThunkType => async dispatch => {
    const response = await tasksAPI.requestTasks(TODOLIST_ID)
    dispatch(setTasks(response.data.items, TODOLIST_ID))
}

export const deleteTask = (taskID: string, TODOLIST_ID: string): ThunkType => async dispatch => {
    await tasksAPI.deleteTask(taskID, TODOLIST_ID)
    dispatch(removeTask(taskID, TODOLIST_ID))
}

export const createTask = (TODOLIST_ID: string, title: string): ThunkType => async dispatch => {
    const response = await tasksAPI.createTask(TODOLIST_ID, title)
    dispatch(addTask(response.data.data.item))
}

// TODO: Need to compose Update Task titles and statuses
export const updateTaskTitle = (TODOLIST_ID: string, taskID: string, title: string): ThunkType =>
    async (dispatch, getState) => {
        const task = getState().tasks[TODOLIST_ID].find(task => task.id === taskID)
        if (task) {
            const updatedTask: UpdatedTaskType = {
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                title,
            }

            await tasksAPI.updateTask(TODOLIST_ID, taskID, updatedTask)
            dispatch(changeTaskTitle(TODOLIST_ID, taskID, title))
        }
    }

export const updateTaskStatus = (TODOLIST_ID: string, taskID: string, status: TaskStatuses): ThunkType =>
    async (dispatch, getState) => {
        const task = getState().tasks[TODOLIST_ID].find(task => task.id === taskID)
        if (task) {
            const updatedTask: UpdatedTaskType = {
                description: task.description,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status
            }
            await tasksAPI.updateTask(TODOLIST_ID, taskID, updatedTask)
            dispatch(changeTaskStatus(TODOLIST_ID, taskID, status))
        }
    }

/*
export const updateTask = (TODOLIST_ID: string, taskID: string): ThunkType =>
    async (dispatch, getState) => {
        const task = getState().tasks[TODOLIST_ID].find(task => task.id === taskID)
        if (task) {
            await tasksAPI.updateTask(TODOLIST_ID, taskID, task)
        }
    }*/
