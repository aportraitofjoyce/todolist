import {v1} from 'uuid'
import {FilterValuesType} from '../../../components/Todolist/TodolistContainer'

export const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
export const ADD_TODOLIST = 'ADD_TODOLIST'
export const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'
export const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'

export const removeTodolistAC = (TODOLIST_ID: string) => (
    {type: REMOVE_TODOLIST, TODOLIST_ID}
) as const

export const addTodolistAC = (title: string) => (
    {type: ADD_TODOLIST, title, NEW_TODOLIST_ID: v1()}
) as const

export const changeTodolistFilterAC = (filter: FilterValuesType, TODOLIST_ID: string) => (
    {type: CHANGE_TODOLIST_FILTER, filter, TODOLIST_ID}
) as const

export const changeTodolistTitleAC = (title: string, TODOLIST_ID: string) => (
    {type: CHANGE_TODOLIST_TITLE, title, TODOLIST_ID}
) as const

export type TodolistsActionsType =
    ReturnType<typeof removeTodolistAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof changeTodolistFilterAC> |
    ReturnType<typeof changeTodolistTitleAC>