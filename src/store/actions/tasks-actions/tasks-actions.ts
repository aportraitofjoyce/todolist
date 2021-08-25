import {addTodolistAC, removeTodolistAC} from '../todolists-actions/todolists-actions'

export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
export const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
export const SORT_TASKS_BY_NAME = 'SORT_TASKS_BY_NAME'

export const removeTaskAC = (taskID: string, TODOLIST_ID: string) => (
    {type: REMOVE_TASK, taskID, TODOLIST_ID}
) as const
export const addTaskAC = (title: string, TODOLIST_ID: string) => (
    {type: ADD_TASK, title, TODOLIST_ID}
) as const
export const changeTaskStatusAC = (taskID: string, isDone: boolean, TODOLIST_ID: string) => (
    {type: CHANGE_TASK_STATUS, taskID, isDone, TODOLIST_ID}
) as const
export const changeTaskTitleAC = (taskID: string, title: string, TODOLIST_ID: string) => (
    {type: CHANGE_TASK_TITLE, taskID, title, TODOLIST_ID}
) as const
export const sortTasksByNameAC = (TODOLIST_ID: string) => (
    {type: SORT_TASKS_BY_NAME, TODOLIST_ID}
) as const

export type TasksActionsType =
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof changeTaskTitleAC> |
    ReturnType<typeof sortTasksByNameAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof removeTodolistAC>