import {addTodolist, removeTodolist} from '../todolists-actions/todolists-actions'

export enum TASKS_ACTIONS_TYPES {
    REMOVE_TASK = 'REMOVE_TASK',
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    SORT_TASKS_BY_NAME = 'SORT_TASKS_BY_NAME',
}

export type TasksActionsType =
    ReturnType<typeof removeTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof changeTaskStatus>
    | ReturnType<typeof changeTaskTitle>
    | ReturnType<typeof sortTasksByName>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof removeTodolist>

export const removeTask = (taskID: string, TODOLIST_ID: string) => (
    {type: TASKS_ACTIONS_TYPES.REMOVE_TASK, taskID, TODOLIST_ID}
) as const
export const addTask = (title: string, TODOLIST_ID: string) => (
    {type: TASKS_ACTIONS_TYPES.ADD_TASK, title, TODOLIST_ID}
) as const
export const changeTaskStatus = (taskID: string, isDone: boolean, TODOLIST_ID: string) => (
    {type: TASKS_ACTIONS_TYPES.CHANGE_TASK_STATUS, taskID, isDone, TODOLIST_ID}
) as const
export const changeTaskTitle = (taskID: string, title: string, TODOLIST_ID: string) => (
    {type: TASKS_ACTIONS_TYPES.CHANGE_TASK_TITLE, taskID, title, TODOLIST_ID}
) as const
export const sortTasksByName = (TODOLIST_ID: string) => (
    {type: TASKS_ACTIONS_TYPES.SORT_TASKS_BY_NAME, TODOLIST_ID}
) as const