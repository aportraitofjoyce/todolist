import {TasksStateType, TaskType} from '../App'
import {v1} from 'uuid'
import {ADD_TODOLIST, addTodolistAC, REMOVE_TODOLIST, removeTodolistAC} from './todolists-reducer'

export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
export const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
export const SORT_TASKS_BY_NAME = 'SORT_TASKS_BY_NAME'

export type ActionsType =
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof changeTaskTitleAC> |
    ReturnType<typeof sortTasksByNameAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof removeTodolistAC>

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK: {
            const stateCopy = {...state}
            stateCopy[action.TODOLIST_ID] = stateCopy[action.TODOLIST_ID].filter(t => t.id !== action.taskID)
            return stateCopy
        }

        case ADD_TASK: {
            const stateCopy = {...state}
            const newTask = {id: v1(), title: action.title, isDone: false}
            stateCopy[action.TODOLIST_ID] = [newTask, ...stateCopy[action.TODOLIST_ID]]
            return stateCopy
        }

        case CHANGE_TASK_STATUS: {
            const stateCopy = {...state}
            stateCopy[action.TODOLIST_ID] = stateCopy[action.TODOLIST_ID].map(t => (t.id === action.taskID
                ? {...t, isDone: action.isDone} : t))
            return stateCopy
        }

        case CHANGE_TASK_TITLE: {
            const stateCopy = {...state}
            stateCopy[action.TODOLIST_ID] = stateCopy[action.TODOLIST_ID].map(t => (t.id === action.taskID
                ? {...t, title: action.title} : t))
            return stateCopy
        }

        case SORT_TASKS_BY_NAME: {
            const newTasks = state[action.TODOLIST_ID].sort((a: TaskType, b: TaskType) => a['title'] > b['title'] ? 1 : -1)
            return {...state, newTasks}
        }

        case ADD_TODOLIST: {
            const stateCopy = {...state}
            stateCopy[action.NEW_TODOLIST_ID] = []
            return {...stateCopy}
        }

        case REMOVE_TODOLIST: {
            const stateCopy = {...state}
            delete stateCopy[action.TODOLIST_ID]
            return stateCopy
        }

        default:
            return state
    }
}

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

