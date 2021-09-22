import {v1} from 'uuid'
import {FilterValuesType} from '../../../components/Todolist/TodolistsContainer'

export enum TODOLISTS_ACTIONS_TYPES {
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
}

export type TodolistsActionsType =
    ReturnType<typeof removeTodolist>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof changeTodolistFilter>
    | ReturnType<typeof changeTodolistTitle>

export const removeTodolist = (TODOLIST_ID: string) => (
    {type: TODOLISTS_ACTIONS_TYPES.REMOVE_TODOLIST, TODOLIST_ID}
) as const

export const addTodolist = (title: string) => (
    {type: TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST, title, NEW_TODOLIST_ID: v1()}
) as const

export const changeTodolistFilter = (filter: FilterValuesType, TODOLIST_ID: string) => (
    {type: TODOLISTS_ACTIONS_TYPES.CHANGE_TODOLIST_FILTER, filter, TODOLIST_ID}
) as const

export const changeTodolistTitle = (title: string, TODOLIST_ID: string) => (
    {type: TODOLISTS_ACTIONS_TYPES.CHANGE_TODOLIST_TITLE, title, TODOLIST_ID}
) as const